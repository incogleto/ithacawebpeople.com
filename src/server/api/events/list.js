import { succeed } from '~/src/server/utils/responses'
import wrapRoute from '~/src/server/utils/wrapRoute'
import knex from '~/src/server/db'
import _ from 'lodash'

const handler = async (req, res, next) => {

    let orderBy = req.query.orderBy || 'date',
        order = req.query.order || 'DESC',
        limit = req.query.limit ? Math.min(req.query.limit, 100) : 25,
        offset = req.query.offset || 0

    // function to get events
    const getEvents = () => knex('events')

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
