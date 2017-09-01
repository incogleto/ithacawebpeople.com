import { Router } from 'express'
import create from './create'
import show from './show'
import list from './list'

const router = new Router({ mergeParams: true })

router.get('/:note_id', show)
router.post('/', create)
router.get('/', list)

export default router
