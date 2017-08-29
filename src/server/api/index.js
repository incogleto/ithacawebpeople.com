import eventsRoute from './events'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

// heartbeat
router.use('/events', eventsRoute)
router.use('/', (req, res) => res.send('API is up and running.'))

export default router
