import extractEvtData from './extractEvent'
import rp from 'request-promise'
import cheerio from 'cheerio'
import knex from '../../db'

const base = 'https://www.meetup.com'

const processor = async () => {

    const groups = await knex('groups')
    let total = 0

    for (var j in groups) {

        const group = groups[j]
        const events = []

        // scrape through pagination
        let reachedEnd = false, page = 1
        while ( !reachedEnd ){

            // scrape page
            const $ = await rp({
                uri: `${ base }/${ group.foreign_id }/events/past/?page=${ page }`,
                transform: function (body) {
                    return cheerio.load(body)
                }
            })

            // get event URLs
            const $evts = $('#events-list-module .event-item')
            $evts.each(function(){
                events.push($(this).find('a.event-title').attr('href'))
            })

            page++
            if ( !$evts.length ) reachedEnd = true
        }

        // scrape each event, add to db
        for (var i in events) {
            const eventURL = events[i]

            const $ = await rp({
                uri: eventURL,
                transform: function (body) {
                    return cheerio.load(body)
                }
            })

            // get data from event
            const eventData = extractEvtData($)

            // attempt to update existing event
            const updated = await knex('events')
                .where('foreign_id', eventData.foreign_id)
                .update(eventData)

            // doesn't exist, insert new
            if ( !updated ) await knex('events').insert(eventData)
        }

        total += events.length
    }

    /* eslint no-console: 0 */
    console.log(`Found and scraped ${ total } events.`)
    return total
}

// every 2 hours on the hour
export default {
    cron: '0 */2 * * *',
    // interval: 20 * 60 * 1000,
    processor
}
