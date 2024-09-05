import express from "express"
import { ordersCtrl } from "../../controllers/cms/index.js"

const router = express.Router()

router.get('/', ordersCtrl.index)

router.route('/:id')
    .put(ordersCtrl.update)
    .patch(ordersCtrl.update)
    .delete(ordersCtrl.destroy)

export default router