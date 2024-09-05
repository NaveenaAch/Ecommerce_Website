import express from "express"
import { productsCtrl } from "../../controllers/front/index.js"
import { auth , customerUser } from "../../lib/function.js"

const router = express.Router()

router.get('/featured', productsCtrl.featured)

router.get('/latest', productsCtrl.latest)

router.get('/top-selling', productsCtrl.topSelling)

router.get('/search', productsCtrl.byTerm)

router.get('/:id', productsCtrl.byId)

router.post('/:id/review', auth, customerUser, productsCtrl.review)


export default router