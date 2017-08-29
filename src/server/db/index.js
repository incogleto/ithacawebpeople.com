const settings = require.main.require('./knexfile')
const knex = require('knex')

const env = process.env.NODE_ENV || 'development'

module.exports = knex(settings[env])
