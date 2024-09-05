import { genPassword } from "../../lib/function.js"
import { User } from "../../models/index.js"

class StaffsController {
    index = async (req, res, next)=>{
        try{
            const staffs = await User.find({type: 'Staff'}).exec()

            res.json(staffs)
        } catch(e){
            console.error(e)
            next({message: 'Problem while processing request', status: 400})
        }
    }



    store = async (req, res, next)=>{
        try{
            const {name, email, password, confirm_password, phone, address, status} = req.body

            if (password == confirm_password){
                
                const hash = await genPassword(password)

                await User.create({name, email, phone, address, status, 
                    type: 'Staff', password:hash})

                res.status(201).json({
                success: 'Staff created'
            })
            }else{
                next({message:'password not confirmed',status: 422})
            }
            
        
        }catch(e){
            console.error(e)
            next({message: 'Problem while processing request', status: 400})
        }
    }

    show = async (req, res, next)=>{
        try{
            const user = await User.findById(req.params.id)
            res.json(user)

        }catch(e){
            console.error(e)
            next({message: 'Problem while processing request', status: 400})
        }
    }

    update = async (req, res, next)=>{
        try{
            const {name,email,phone,address,status}= req.body
            await User.findByIdAndUpdate(req.params.id,{name,email,phone,address,status})
            res.json({
                success:'Staff updated'
            })
        }catch(e){
            console.error(e)
            next({
                message:'problem while processing request',
                status:400
            })
        }
    }

    destroy = async (req, res, next)=>{
        try{
            await User.findByIdAndDelete(req.params.id)

            res.json({
                success:'Staff removed'
            })
        }catch(e){
            console.error(e)
            next({
                message:'problem while processing request',
                status:400
            })
        }
    }
    
}

export default new StaffsController
