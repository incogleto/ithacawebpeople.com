/* eslint no-console: 0 */
import express from 'express'
import api from './api'
import path from 'path'

const app = express()
app.use(express.static(path.resolve(__dirname, '../../dist/public')))

// route api
app.use('/api', api)

app.use((req, res, next) => {
    return res.sendFile(path.resolve(__dirname, 'index.html'))
})

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`App started on port: ${port}`))
