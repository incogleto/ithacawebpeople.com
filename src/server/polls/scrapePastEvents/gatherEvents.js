import rp from 'request-promise'
import cheerio from 'cheerio'

const base = 'https://www.meetup.com'

export const getPastEvents = async group => {
    const events = []

    // scrape through pagination
    let reachedEnd = false, page = 0
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
    return events
}

export const getFutureEvents = async group => {
    const events = []

    // scrape page
    const $ = await rp({
        uri: `${ base }/${ group.foreign_id }`,
        transform: function (body) {
            return cheerio.load(body)
        }
    })

    // get event URLs
    const $evts = $('#events-list-module .event-item h3 a, #events-list-module table.upcoming-events th:first-child a')
    $evts.each(function(){
        events.push($(this).attr('href'))
    })

    return events
}
