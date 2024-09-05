import mongoose from "mongoose"
import { Order, Product, Review, User } from "../../models/index.js"
import bcrypt from "bcryptjs"
import { genPassword } from "../../lib/function.js"

class ProfileController {

    details = async(req,res,next) => {
        try{
            res.json(req.user)

        }catch(e){
            console.log(e)
            next({
                message: 'Problem while processing request',
                status: 400
            })
        }
    }

    reviews = async(req,res,next) => {
        try{
            const reviews = await Review.aggregate([
                { $match: { user_id: req.uid } },
                { $lookup: {from: 'products', localField: 'product_id',
                foreignField: '_id', as: 'product'}}
            ]).exec()

            res.json(reviews)

        }catch(e){
            console.log(e)
            next({
                message: 'Problem while processing request',
                status: 400
            })
        }
    }

    orders = async(req,res,next) => {
        try{
            const orders = await Order.aggregate([
                {$match: {user_id: new mongoose.Types.ObjectId(req.uid)}},
                {$lookup: {from: 'orderdetails', localField: '_id', foreignField:
                'order_id', as: 'details'}}
            ]).exec()

            for(let i in orders){
                const details = orders[i].details

                for(let j in details){
                    const product = await Product.findById(details[j].product_id)

                    orders[i].details[j].product = [product]
                }
            }

            res.json(orders)
            
        }catch(e){
            console.log(e)
            next({
                message: 'Problem while processing request',
                status: 400
            })
        }
    }

    edit = async(req,res,next) => {
        try{
            const {name, phone, address} = req.body

            await User.findByIdAndUpdate(req.uid, {name,phone,address})

            res.json({
                success: 'Profile updated'
            })

        }catch(e){
            console.log(e)
            next({
                message: 'Problem while processing request',
                status: 400
            })
        }
    }

    password = async(req,res,next) => {
        try{
            const {old_password, new_password, confirm_password} = req.body

            if (await bcrypt.compare(old_password, req.user.password)){
                if (new_password == confirm_password){
                    const hash = await genPassword(new_password)
                    await User.findByIdAndUpdate(req.uid, {password:hash})

                    res.json({
                        success: 'Password updated'
                    })

                }else{
                    next({
                        message: 'The password is not confirmed',
                        status: 422
                    })
                }

            }else{
                next({
                    message: 'The old password is not correct',
                    status: 422
                })
            }

        }catch(e){
            console.log(e)
            next({
                message: 'Problem while processing request',
                status: 400
            })
        }
    }
    


}

export default new ProfileController