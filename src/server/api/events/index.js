import { Router } from 'express'
import show from './show'
import list from './list'

const router = new Router({ mergeParams: true })

router.get('/:event_id', show)
router.get('/', list)

export default router
