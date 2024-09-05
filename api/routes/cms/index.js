import express from "express";
import staffRoutes from "./staffs.routes.js"
import { adminUser } from "../../lib/function.js";
import customerRoutes from "./customer.routes.js"
import categoriesRoutes from "./categories.routes.js"
import brandRoutes from "./brands.routes.js"
import productsRoutes from "./products.routes.js"
import reviewsRoutes from "./reviews.routes.js"
import ordersRoutes from "./orders.routes.js"

const router = express.Router()

router.use('/staffs', adminUser, staffRoutes)
router.use('/customers', customerRoutes)
router.use('/categories', categoriesRoutes)
router.use('/brands', brandRoutes)
router.use('/products', productsRoutes)
router.use('/reviews', reviewsRoutes)
router.use('/orders', ordersRoutes)

export default router
