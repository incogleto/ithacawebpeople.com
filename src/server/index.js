/* eslint no-console: 0 */
import express from 'express'

const app = express()

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`App started on port: ${port}`))
