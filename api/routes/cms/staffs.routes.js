import express from "express";
import { staffsCtrl } from "../../controllers/cms/index.js";

const router = express.Router()

router.route('/')
    .get(staffsCtrl.index)
    .post(staffsCtrl.store)

router.route('/:id')
    .get(staffsCtrl.show)
    .put(staffsCtrl.update)
    .patch(staffsCtrl.update)
    .delete(staffsCtrl.destroy)

export default router
