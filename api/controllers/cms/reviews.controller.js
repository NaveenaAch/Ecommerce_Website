import { Review } from "../../models/index.js"

class ReviewsController{
    index = async(req,res,next)=>{
        try{
            const reviews = await Review.aggregate([
                {$lookup: {from: 'users', localField: 'user_id', foreignField: '_id', as:
            'user'}},
                {$lookup: {from: 'products', localField: 'product_id', foreignField: '_id', as:
            'product'}},
            ]).exec()

            res.json(reviews)

        }catch(e){
            console.error(e)
            next({message: 'problem while processing requets', status: 400})
        }
    }
    
    destroy = async(req,res,next)=>{
        try{

            await Review.findOneAndDelete(req.params.id)
            
            res.json({
                success: 'Review removed'
            })

        }catch(e){
            console.error(e)
            next({message: 'problem while processing requets', status: 400})
        }
    }
}


export default new ReviewsController
