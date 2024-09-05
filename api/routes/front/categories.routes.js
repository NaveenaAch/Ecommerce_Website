import express from "express"
import { listCtrl, productsCtrl } from "../../controllers/front/index.js"

const router = express.Router()

router.get('/', listCtrl.categories)

router.get('/:id', listCtrl.categoryById)

router.get('/:id/products', productsCtrl.byCategoryId)
    

export default router