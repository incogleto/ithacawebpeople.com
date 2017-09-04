import { succeed, fail } from '~/src/server/utils/responses'
import serializer from '~/src/server/serializers/note'
import wrapRoute from '~/src/server/utils/wrapRoute'
import noteSchema from '~/src/server/schemas/note'
import knex from '~/src/server/db'
import crypto from 'crypto'

const handler = async (req, res, next) => {

    // build record with random token
    const noteRecord = {
        ...req.body,
        token: crypto.randomBytes(5).toString('hex'),
        event_id: req.params.event_id
    }

    // make sure event exists
    const event = await knex('events').where('foreign_id', req.params.event_id)
    if ( !event ) return fail({ res, code: 404, msg: 'No event found with that ID.' })

    // validate input against schema
    await noteSchema.validate(noteRecord)

    // create new note record
    const note = await knex('notes').insert(noteRecord, '*')

    return succeed({ res, msg: 'Successfully created new note.', add: { data: serializer(note) } })
}

export default wrapRoute(handler)
