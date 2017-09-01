import { succeed } from '~/src/server/utils/responses'
import wrapRoute from '~/src/server/utils/wrapRoute'
import noteSchema from '~/src/server/schemas/note'
import knex from '~/src/server/db'

const handler = async (req, res, next) => {

    // build record
    const noteRecord = {
        ...req.body,
        event_id: req.params.event_id
    }

    // validate input against schema
    await noteSchema.validate(noteRecord)

    // create new note record
    const note = await knex('notes').insert(noteRecord, '*')

    return succeed({ res, msg: 'Successfully created new note.', add: { data: note } })
}

export default wrapRoute(handler)
