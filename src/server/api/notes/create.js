import { succeed, fail } from '~/src/server/utils/responses'
import serializer from '~/src/server/serializers/note'
import wrapRoute from '~/src/server/utils/wrapRoute'
import noteSchema from '~/src/server/schemas/note'
// import sendMail from '~/src/server/utils/sendmail'
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

    // await sendMail({
    //     to: noteRecord.email,
    //     subject: `Message Verification`,
    //     body: `Thanks for submitting your note to Ithacawebpeople.com.
    //
    //     Please verify your email by visiting this URL: https://www.ithacawebpeople.com/api/events/${ req.params.event_id }/notes/${ note.id }/verify
    //     Once verified, your message will show publicly.
    //
    //     Thanks!
    //     Ithaca Web People`
    // })

    return succeed({ res, msg: 'Successfully created new note.', add: { data: serializer(note) } })
}

export default wrapRoute(handler)
