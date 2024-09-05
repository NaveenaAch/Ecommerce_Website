import express from "express"
import { brandsCtrl } from "../../controllers/cms/index.js"

const router = express.Router()

router.route('/')
    .get(brandsCtrl.index)
    .post(brandsCtrl.store)

router.route('/:id')
    .get(brandsCtrl.show)
    .put(brandsCtrl.update)
    .patch(brandsCtrl.update)
    .delete(brandsCtrl.destroy)

export default router