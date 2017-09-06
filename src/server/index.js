/* eslint no-console: 0 */
import cookieParser from 'cookie-parser'
import jwtAuth from './utils/jwt-auth'
import bodyParser from 'body-parser'
import express from 'express'
import path from 'path'

const app = express()
app.use(express.static(path.resolve(__dirname, '../../dist/public')))

// parse json
app.use(bodyParser.json())
app.use(cookieParser())

// route api
if ( process.env.DATABASE_URL ){
    app.use('/api', [jwtAuth], require('./api').default)
}

app.use((req, res, next) => {
    return res.sendFile(path.resolve(__dirname, 'index.html'))
})

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`App started on port: ${port}`))
