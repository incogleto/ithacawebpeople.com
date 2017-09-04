import { succeed } from '~/src/server/utils/responses'
import wrapRoute from '~/src/server/utils/wrapRoute'
import knex from '~/src/server/db'

const handler = async (req, res, next) => {

    const event = await knex('events').where({ foreign_id: req.params.event_id }).first()

    return succeed({ res, msg: 'Successfully retrieved event.', add: { data: event } })
}

export default wrapRoute(handler)
