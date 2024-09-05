import express from "express"
import { profileCtrl } from "../../controllers/front/index.js"
import { customerUser } from "../../lib/function.js"

const router = express.Router()

router.get('/details', profileCtrl.details)

router.get('/orders', customerUser, profileCtrl.orders)

router.get('/reviews', customerUser, profileCtrl.reviews)

router.route('/edit-profile')
    .put(profileCtrl.edit)
    .patch(profileCtrl.edit)

router.route('/change-password')
    .put(profileCtrl.password)
    .patch(profileCtrl.password)    


export default router