import extract from './extractGroup'
import knex from '~/src/server/db'
import rp from 'request-promise'
import cheerio from 'cheerio'

const base = 'https://www.meetup.com'

const processor = async () => {

    const groups = await knex('groups')

    for (var i in groups){

        const group = groups[i]

        // scrape page
        const $ = await rp({
            uri: `${ base }/${ group.foreign_id }/`,
            transform: function (body) {
                return cheerio.load(body)
            }
        })

        const groupData = extract($)

        await knex('groups')
            .where('id', group.id)
            .update(groupData)
    }

    return groups.length
}

export default {
    processor,
    interval: 20 * 60 * 1000
}
