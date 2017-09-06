import { succeed } from '~/src/server/utils/responses'
import groupsRoute from './groups'
import eventsRoute from './events'
import { Router } from 'express'
import cors from 'cors'

const router = new Router({ mergeParams: true })
router.use(cors())

router.use('/self', (req, res) => {
    return succeed({ res, msg: 'Successfully retrieved self.', add: { data: { email: req.user || null } } })
})
router.use('/events', eventsRoute)
router.use('/groups', groupsRoute)

// heartbeat
router.use('/', (req, res) => succeed({ res, msg: 'API is up and running.' }))

export default router
