import { succeed, fail } from '~/src/server/utils/responses'
// import serializer from '~/src/server/serializers/note'
import wrapRoute from '~/src/server/utils/wrapRoute'
import knex from '~/src/server/db'
import jwt from 'jwt-simple'

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

    // update note record
    await knex('notes').where('id', note.id).update({
        verified: new Date()
    })

    // set token
    const token = jwt.encode({
        iss: 'SERVER',
        note_id: note.id,
        created: Date.now()
    }, process.env.JWT_TOKEN_SECRET)

    // set access token cookie
    res.cookie('access_token', token, {
        maxAge:  24 * 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
    })

    return res.redirect(`/events/${ req.params.event_id }`)
}

export default wrapRoute(handler)
