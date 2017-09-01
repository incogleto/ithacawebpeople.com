import { succeed } from '~/src/server/utils/responses'
import wrapRoute from '~/src/server/utils/wrapRoute'
import knex from '~/src/server/db'

const handler = async (req, res, next) => {

    const note = await knex('notes').where({
        id: req.params.note_id,
        event_id: req.params.event_id
    }).first()

    return succeed({ res, msg: 'Successfully retrieved note.', add: { data: note } })
}

export default wrapRoute(handler)
