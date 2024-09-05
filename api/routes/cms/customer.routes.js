import express from "express";
import { customerCtrl } from "../../controllers/cms/index.js";

const router = express.Router()
router.route('/')
    .get(customerCtrl.index)
    .post(customerCtrl.store)

router.route('/:id')
    .get(customerCtrl.show)
    .put(customerCtrl.update)
    .patch(customerCtrl.update)
    .delete(customerCtrl.destroy)

export default router