import { Category } from "../../models/index.js"

class CategoriesController {

    index = async(req,res,next)=>{
        try{
            const category = await Category.find()
            res.json(category)
        }catch(e){
            next({message: 'problem while processing request', status: 400})
        }
    }

    store = async(req,res,next)=>{
        try{
            const {name,slug,status} = req.body

            await Category.create({name,slug,status})

            res.json({
                success: 'Category created'
            })
        }catch(e){
            next({message: 'problem while processing request', status: 400})
        }
    }

    show = async(req,res,next)=>{
        try{
            const category = await Category.findById(req.params.id)
            res.json(category)

        }catch(e){
            next({message:'Problem while processing request', status: 400})
        }
    }

    update = async(req,res,next)=>{
        try{
            const {name,slug,status} = req.body
            await Category.findByIdAndUpdate(req.params.id,{name,slug,status})
            res.json({
                success:'Category updated'
            })
        }catch(e){
            next({message:'Problem while processing request', status: 400})
        }
    }

    destroy = async(req,res,next)=>{
        try{
            await Category.findByIdAndDelete(req.params.id)
            res.json({
                success:'Category removed'
            })
        }catch(e){
            next({message:'Problem while processing request', status: 400})
        }
    }
}

export default new CategoriesController