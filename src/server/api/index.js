import { succeed } from '~/src/server/utils/responses'
import groupsRoute from './groups'
import eventsRoute from './events'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

// heartbeat
router.use('/events', eventsRoute)
router.use('/groups', groupsRoute)
router.use('/', (req, res) => succeed({ res, msg: 'API is up and running.' }))

export default router
