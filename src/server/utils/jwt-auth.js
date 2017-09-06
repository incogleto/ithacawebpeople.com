import wrapRoute from './wrapRoute'
import jwt from 'jwt-simple'
import knex from '../db'

const handler = async (req, res, next) => {

    const token = req.cookies.access_token || ''
    if ( !token ) return next()

    const decoded = jwt.decode(token, process.env.JWT_TOKEN_SECRET) || {}

    const note = await knex('notes')
        .where({ id: decoded.note_id })
        .whereNotNull('verified').first()
    if ( note ) req.user = note.email

    return next()
}

export default wrapRoute(handler)
