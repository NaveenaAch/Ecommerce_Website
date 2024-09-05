import { Product } from "../../models/index.js"
import { unlinkSync } from "node:fs" 

class ProductsController {

    index = async(req,res,next)=>{
        try{
           const products = await Product.aggregate([
            {$lookup: {from: 'categories', localField: 'category_id', foreignField: '_id',
            as: 'category'}},
            {$lookup: {from: 'brands', localField: 'brand_id', foreignField: '_id',
            as: 'brand'}}
           ]).exec()

           res.json(products)

        }catch(e){
            console.error(e)
            next({message:'problem while processing request', status: 400})
        }
    }

    store = async(req,res,next)=>{
        try{
            const {name,slug,status,summary,description,price,discounted_price,
                category_id, brand_id, featured} = req.body

            const images = req.files.map(file => file.path)

            await Product.create({name,slug,status,summary,description,price,discounted_price,
                category_id, brand_id, featured, images})

            res.json({
                success:'Product created'
            })
        }catch(e){
            console.error(e)
            next({message:'problem while processing request', status: 400})
        }
    }

    show = async(req,res,next)=>{
        try{
            const product = await Product.findById(req.params.id)
            res.json(product)

        }catch(e){
            console.error(e)
            next({message:'problem while processing request', status: 400})
        }
    }

    update = async(req,res,next)=>{
        try{
            const {name,slug,status,summary,description,price,discounted_price,
                category_id, brand_id, featured} = req.body

            const product = await Product.findById(req.params.id)

            let images = []
            
            if (req.files.length > 0){
                images = [...product.images, ...req.files.map(file => file.path)]
            }else{
                images = product.images
            }

            await Product.findByIdAndUpdate(req.params.id, {name,slug,status,summary,description,price,discounted_price,
                category_id, brand_id, featured, images})

            res.json({
                success:'product updated'
            })
        }catch(e){
            console.error(e)
            next({message:'problem while processing request', status: 400})
        }
    }
    
    destroy = async(req,res,next)=>{
        try{
            const product = await Product.findById(req.params.id)

            if (product.images.length > 0){
                for (let image of product.images){
                    unlinkSync(image)
                }
            }

            await Product.findByIdAndDelete(req.params.id)

            res.json({
                success:'product removed'
        })
        }catch(e){
            console.error(e)
            next({message:'problem while processing request', status: 400})
        }
    }

    image = async (req,res,next) => {
        try{
            const product = await Product.findById(req.params.id)

            const index = product.images.findIndex((image) => image.endsWith(req.params.filename))

            if(index > -1){
                if(product.images.length > 1){
                    unlinkSync(product.images[index])
                    let images = product.images
    
                    images.splice(index, 1)
    
                    await Product.findByIdAndUpdate(product._id,{
                        images
                    })
    
                    res.json({
                        success:'Image removed'
                    })
                }else{
                    next({
                        message: 'At least one image is required in the product',
                        status: 403
                    })
                }
                
            }else{
                next({
                    message: 'Image not found',
                    status: 404
                })
            }

        }catch(e){
            console.error(e)
            next({message:'problem while processing request', status: 400})
        }
    }
}

export default new ProductsController