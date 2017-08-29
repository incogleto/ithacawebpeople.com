require('app/environment')
const { NODE_ENV } = process.env

// require from dist by default
let source = 'dist'

// in dev mode, require from src and
// transpile files on the fly
if ( NODE_ENV == 'development' ){
    require('babel-register')
    source = 'src'
}

// kick off server
require(`./${ source }/server`)
require(`./${ source }/server/worker`)
