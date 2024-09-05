import express from "express";
import { reviewsCtrl } from "../../controllers/cms/index.js";

const router = express.Router()

router.get('/', reviewsCtrl.index)

router.delete('/:id', reviewsCtrl.destroy)

export default router