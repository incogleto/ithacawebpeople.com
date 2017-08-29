import extractEvtData from './extractEvent'
import rp from 'request-promise'
import cheerio from 'cheerio'
import knex from 'shared/db'

const meetupURL = 'https://www.meetup.com/ithaca-web-people'

const processor = async () => {

    const events = []

    // scrape through pagination
    let reachedEnd = false, page = 1
    while ( !reachedEnd ){

        // scrape page
        const $ = await rp({
            uri: `${ meetupURL }/events/past/?page=${ page }`,
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

    /* eslint no-console: 0 */
    console.log(`Found and scraped ${ events.length } events.`)
    return events.length
}

// every 2 hours
export default {
    cron: '0 */2 * * *',
    // interval: 20 * 60 * 1000,
    processor
}
