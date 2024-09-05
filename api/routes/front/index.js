import express from "express"
import productRoutes from "./products.routes.js"
import categoryRoutes from "./categories.routes.js"
import brandRoutes from "./brands.routes.js"
import profileRoutes from "./profile.routes.js"
import { checkoutCtrl } from "../../controllers/front/index.js"
import { auth, customerUser } from "../../lib/function.js"

const router = express.Router()

router.use('/product', productRoutes)

router.use('/category', categoryRoutes)

router.use('/brand', brandRoutes)

router.post('/checkout', auth, customerUser, checkoutCtrl.order)

router.use('/profile', auth, profileRoutes)

export default router