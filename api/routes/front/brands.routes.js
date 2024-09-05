import express from "express"
import { listCtrl, productsCtrl } from "../../controllers/front/index.js"

const router = express.Router()

router.get('/', listCtrl.brands)

router.get('/:id', listCtrl.brandById)

router.get('/:id/products', productsCtrl.byBrandId)    

export default router