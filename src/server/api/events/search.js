import knex from '~/src/server/db'
import Fuse from 'fuse.js'

export default (async () => {

    const index = await knex.select('id', 'title', 'description', 'foreign_id').from('events')
    const ops = {
        shouldSort: true,
        threshold: 0.2,
        tokenize: true,
        location: 0,
        distance: 50,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: ['title', 'description', 'foreign_id']
    }

    return new Fuse(index, ops)
})()
