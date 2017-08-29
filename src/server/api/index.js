import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.use('/', (req, res) => res.send('API is up and running.'))

export default router
