import { Order, OrderDetail } from "../../models/index.js"

class CheckoutController {

    order = async(req,res,next) => {
        try{
            const order = await Order.create({user_id: req.uid})

            for (let item of req.body){
                await OrderDetail.create({order_id: order._id, product_id: 
                    item.product_id, qty: item.qty, price: item.price, total: item.total})
            }

            res.json({
                success: "Thank you for your order. We are currently processing it."
            })
        }catch(e){
            console.log(e)
            next({
                message: 'Problem while processing request',
                status: 400
            })
        }
    }

    
}

export default new CheckoutController