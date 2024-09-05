import mongoose from "mongoose"
import { Order, OrderDetail } from "../../models/index.js"

class OrdersController {

    index = async(req,res,next) => {
        try{
            const orders = await Order.aggregate([
                {$lookup: {from: 'users', localField: 'user_id', foreignField: '_id', 
                as: 'user'}}
            ]).exec()

            let newList = []

            for(let order of orders) {
                const detail = await OrderDetail.aggregate([
                    {$match: {order_id: new mongoose.Types.ObjectId(order._id)}},
                    {$lookup: {from: 'products', localField: 'product_id', foreignField:
                '_id', as: 'product'}}
                ]).exec()

                newList.push({
                    _id: order._id,
                    user_id: order.user_id,
                    status: order.status,
                    createdAt: order.createdAt,
                    updatedAt: order.updatedAt,
                    __v: order.__v,
                    user: order.user,
                    details: detail
                })
            }

            res.json(newList)

        }catch(e){
            console.error(e)
            next({message:'problem while processing request', status: 400})
        }
    }

    update = async(req,res,next) => {
        try{
            const {status} = req.body

            await Order.findByIdAndUpdate(req.params.id,{
                status
            })

            res.json({
                success: 'Order updated'
            })
        
        }catch(e){
            console.error(e)
            next({message:'problem while processing request', status: 400})
        }
    }

    destroy = async(req,res,next) => {
        try{
            const details = await OrderDetail.find({
                order_id: req.params.id
            }).exec()
                
            // res.json(details)

            for(let detail of details){
                await detail.deleteOne()
            }

            await Order.findByIdAndDelete(req.params.id)

            res.json({
                success: 'Order removed'
            })

        }catch(e){
            console.error(e)
            next({message:'problem while processing request', status: 400})
        }
    }

}


export default new OrdersController