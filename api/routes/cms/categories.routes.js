import express from "express";
import { categoriesCtrl } from "../../controllers/cms/index.js";

const router = express.Router()

router.route('/')
    .get(categoriesCtrl.index)
    .post(categoriesCtrl.store)

router.route('/:id')
    .get(categoriesCtrl.show)
    .put(categoriesCtrl.update)
    .patch(categoriesCtrl.update)
    .delete(categoriesCtrl.destroy)

export default router