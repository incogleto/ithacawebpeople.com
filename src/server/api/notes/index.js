import { Router } from 'express'
import verify from './verify'
import create from './create'
import show from './show'
import list from './list'

const router = new Router({ mergeParams: true })

router.use('/:note_id/verify', verify)
router.get('/:note_id', show)
router.post('/', create)
router.get('/', list)

export default router
