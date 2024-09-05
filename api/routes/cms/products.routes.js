import express from "express"
import { productsCtrl } from "../../controllers/cms/index.js"
import { fileUpload } from "../../lib/function.js"

const router = express.Router()

const mimeList = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

router.route('/')
    .get(productsCtrl.index)
    .post(fileUpload(mimeList).array('files'), productsCtrl.store)

router.route('/:id')
    .get(productsCtrl.show)
    .put(fileUpload(mimeList).array('files'), productsCtrl.update)
    .patch(fileUpload(mimeList).array('files'), productsCtrl.update)
    .delete(productsCtrl.destroy)

router.delete('/:id/image/:filename', productsCtrl.image)

export default router