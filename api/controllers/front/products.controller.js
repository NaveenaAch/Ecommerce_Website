import mongoose from "mongoose"
import { Product, Review } from "../../models/index.js"

class ProductsController{
    featured = async(req,res,next) =>{
        try{
            const products = await Product.find({status: true, featured: true}).exec()

            res.json(products)

        }catch(e){
            console.log(e)
            next({
                message: 'Problem while processing request',
                status: 400
            })
        }
    }

    latest = async(req,res,next) =>{
        try{
            const products = await Product.aggregate([
                {$match: {status: true}},
                {$sort : {createdAt: -1}}
            ]).exec()

            res.json(products)

        }catch(e){
            console.log(e)
            next({
                message: 'Problem while processing request',
                status: 400
            })
        }
    }

    topSelling = async(req,res,next) =>{

        try{
            const products = await Product.aggregate([
                {$match: {status: true} },
                {$lookup: {from: 'orderdetails', localField: '_id', foreignField: 'product_id', as: 'orders_count'}},
                {$addFields: {orders_count: {$size: '$orders_count'}}},
                {$sort : {orders_count: -1}}
            ]).exec()
    
            res.json(products)

        }catch(e){
            console.log(e)
            next({
                message: 'Problem while processing request',
                status: 400
            })
        }
    }

    byId = async(req,res,next) =>{
        try{
            const product = (await Product.aggregate([
                {$match: {status: true, _id: new mongoose.Types.ObjectId(req.params.id)} },
                {$lookup: {from: 'brands', localField: 'brand_id', foreignField: '_id', as: 'brand'}},
            ]).exec()).pop()

            if(product) {
                const similar = await Product.find({category_id: product.category_id,
                    status: true, _id: {$ne: new mongoose.Types.ObjectId(product._id)}}).exec()
        
                const reviews = await Review.aggregate([
                    {$match: {product_id: new mongoose.Types.ObjectId(product._id)}},
                    {$lookup: {from: 'users', localField: 'user_id',
                    foreignField: '_id', as: 'user'}}
                ]).exec()

                res.json({...product, similar, reviews})
            }else{
                next({
                    message: 'Product not found', 
                    status: 404})
            }
           

        }catch(e){
            console.log(e)
            next({
                message: 'Problem while processing request',
                status: 400
            })
        }
    }

    byCategoryId = async(req,res,next) =>{

        try{
            const products = await Product.find({category_id: new mongoose.Types.
                ObjectId(req.params.id),status: true }).exec()

                res.json(products)
        }catch(e){
            console.log(e)
            next({
                message: 'Problem while processing request',
                status: 400
            })
        }
    }

    byBrandId = async(req,res,next) =>{
        try{
            const products = await Product.find({brand_id: new mongoose.Types.
                ObjectId(req.params.id),status: true }).exec()

                res.json(products)
        }catch(e){
            console.log(e)
            next({
                message: 'Problem while processing request',
                status: 400
            })
        }
    }

    byTerm = async(req,res,next) =>{
        try{
            const products = await Product.find({status: true, name: {$regex: req.
                query.term, $options: 'i'}}).exec()

            res.json(products)

        }catch(e){
            console.log(e)
            next({
                message: 'Problem while processing request',
                status: 400
            })
        }
    }

    review = async(req,res,next) => {
        try{
            const {comment, rating } = req.body

            await Review.create({comment, rating, user_id: req.uid, product_id: req.params.id})

            res.json({
                success: 'Thank you for your review'
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

export default new ProductsController
