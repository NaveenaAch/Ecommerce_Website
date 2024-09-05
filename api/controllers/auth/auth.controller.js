import { genPassword } from "../../lib/function.js"
import {User} from "../../models/index.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

class AuthController {
    register = async (req,res,next)=>{
        // console.log(req.body)
        // res.send('Ok')

        try{
            const {name, email, password, confirm_password, phone, address} = req.body

            if (password == confirm_password){
                
                const hash = await genPassword(password)

                await User.create({name, email, phone, address, password:hash})

                res.status(201).json({
                success: 'You have been registered. Please login to continue'
            })
            }else{
                next({
                    message:'password not confirmed',
                    status: 422
                })
            }

            // res.json({hash})
            // console.log(await genPassword(password))

            
        }catch(e){
            console.error(e)
            next({
                message: "Unable to register at the moment",
                status: 400
            })
        }
    }
    
    login = async (req,res,next)=>{
        try{
            const {email ,password} = req.body
            const user = await User.findOne({email}).exec()
            if (user !=null){
                if (await bcrypt.compare(password, user.password)){
                    const token = jwt.sign({id:user._id, iat: Math.floor(Date.now() /
                    1000) + (30*24*60*60)}, process.env.JWT_SECRET)

                    res.json({token, user})

            } else{
                next({
                    message: 'Incorrect password',
                    status: 422
                })
            }
            } else{
                next({
                    message: 'Incorrect email address',
                    status: 422
                })
            
            }
            // res.json(user)
           
        }catch(e){
            console.error(e)
            next({
                message: 'Unable to login to the moment',
                status: 400
            })
        }
    }
}

export default new AuthController

