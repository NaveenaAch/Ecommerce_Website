import { genPassword } from "../../lib/function.js"
import { User } from "../../models/index.js"


class customerController {
    index = async(req,res,next)=>{
        try{
            const customer = await User.find({type:'Customer'}).exec()
            res.json(customer)
        }catch(e){
            next({message: 'problem while processing request', status: 400})
        }
    }

    store = async(req,res,next)=>{
        try{
            const {name,email,password,confirm_password,phone,address,status} = req.body

            if (password == confirm_password){
                const hash = await genPassword(password)

            await User.create({name,email,phone,address,status,type:'Customer',password:hash})
            
            res.status(201).json({
                success:'Customer created'
            })
            }else{
                next({message: 'Password not confirmed',status: 422})
            }

        }catch(e){
            next({message: 'problem while processing request', status: 400})
        }
    }

    show = async(req,res,next)=>{
        try{
            const customer = await User.findById(req.params.id)
            res.json(customer)

        }catch(e){
            next({message:'Problem while processing request', status: 400})
        }
    }

    update = async(req,res,next)=>{
        try{
            const {name,email,phone,address,status} = req.body
            await User.findByIdAndUpdate(req.params.id,{name,email,phone,address,status})
            res.json({
                success:'Customer updated'
            })
        }catch(e){
            next({message:'Problem while processing request', status: 400})
        }
    }

    destroy = async(req,res,next)=>{
        try{
            await User.findByIdAndDelete(req.params.id)
            res.json({
                success:'Customer removed'
            })
        }catch(e){
            next({message:'Problem while processing request', status: 400})
        }
    }
}

export default new customerController
