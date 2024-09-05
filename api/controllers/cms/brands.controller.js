import { Brand } from "../../models/index.js"

class BrandsController {

    index = async(req,res,next)=>{
        try{
           const brands = await Brand.find()
           res.json(brands)

        }catch(e){
            next({message:'problem while processing request', status: 400})
        }
    }
    store = async(req,res,next)=>{
        try{
            const {name,slug,status} = req.body
            await Brand.create({name,slug,status})
            res.json({
                success:'Brand created'
            })
        }catch(e){
            next({message:'problem while processing request', status: 400})
        }
    }
    show = async(req,res,next)=>{
        try{
            const brand = await Brand.findById(req.params.id)
            res.json(brand)

        }catch(e){
            next({message:'problem while processing request', status: 400})
        }
    }
    update = async(req,res,next)=>{
        try{
            const {name,slug,status} = req.body
            await Brand.findByIdAndUpdate(req.params.id,{name,slug,status})
            res.json({
                success:'Brand updated'
            })
        }catch(e){
            next({message:'problem while processing request', status: 400})
        }
    }
    destroy = async(req,res,next)=>{
        try{
            await Brand.findByIdAndDelete(req.params.id)
            res.json({
                success:'Brand removed'
        })
        }catch(e){
            next({message:'problem while processing request', status: 400})
        }
    }
}

export default new BrandsController