/* eslint no-console: 0 */
import express from 'express'
import api from './api'

const app = express()

// route api
app.use('/api', api)
app.use((req, res, next) => {
    return res.send('App is up and running.')
})

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`App started on port: ${port}`))
