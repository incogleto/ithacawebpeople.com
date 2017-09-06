require('./environment')
const { NODE_ENV, DATABASE_URL } = process.env

// require from dist by default
let source = 'dist'

// in dev mode, require from src and
// transpile files on the fly
if ( NODE_ENV == 'development' ){
    require('babel-register')
    source = 'src'
}

// kick off server if we have db
require(`./${ source }/server`)
if ( DATABASE_URL ) require(`./${ source }/server/worker`)
