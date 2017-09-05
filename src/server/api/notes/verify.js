import { succeed, fail } from '~/src/server/utils/responses'
import serializer from '~/src/server/serializers/note'
import wrapRoute from '~/src/server/utils/wrapRoute'
import knex from '~/src/server/db'

const handler = async (req, res, next) => {

    // query for note record
    const note = await knex('notes').where({
        id: req.params.note_id,
        event_id: req.params.event_id,
        email: req.query.email,
        token: req.query.token
    }).first()

    if ( !note ) return fail({ res, code: 400, msg: 'Failed to verify note.' })
    if ( note.verified ) return succeed({ res, msg: 'This note has already been verified.' })

    // create new note record
    const updatedNote = await knex('notes').where('id', note.id).update({
        verified: new Date()
    })

    return res.redirect(`/events/${ req.params.event_id }`)
    // return succeed({ res, msg: 'Successfully verified note.', add: { data: serializer(updatedNote) } })
}

export default wrapRoute(handler)
