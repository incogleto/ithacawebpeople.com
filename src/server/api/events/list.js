import { succeed } from '~/src/server/utils/responses'
import wrapRoute from '~/src/server/utils/wrapRoute'
import eventSearch from './search'
import knex from '~/src/server/db'
import _ from 'lodash'

const handler = async (req, res, next) => {
    const fuse = await eventSearch

    let orderBy = req.query.orderBy || 'date',
        order = req.query.order || 'DESC',
        limit = req.query.limit ? Math.min(req.query.limit, 100) : 25,
        offset = req.query.offset || 0

    // modifier to filter by dates
    const limitDates = q => {
        const after = req.query.after && new Date(parseInt(req.query.after))
        const before = req.query.before && new Date(parseInt(req.query.before))
        if ( after ) q.where('date', '>', after)
        if ( before ) q.where('date', '<', before)
    }

    // modifier to limit results to search query
    const limitSearchResults = q => {
        if ( req.query.s ){
            const results = fuse.search(req.query.s)
            q.whereIn('id', _.map(results, 'id'))
        }
    }

    // function to get events
    const getEvents = () => knex('events').modify(limitDates).modify(limitSearchResults)

    // query and count total
    const [data, count] = await Promise.all([
        getEvents().offset(offset).orderBy(orderBy, order).limit(limit),
        getEvents().count().then(_.first)
    ])

    // build pagination
    const pagination = {
        total: parseInt(count.count) || 0,
        limit,
        offset
    }

    return succeed({ res, msg: 'Successfully retrieved events.', add: { pagination, data } })
}

export default wrapRoute(handler)
