import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import { User } from "../models/index.js"
import multer from "multer"

export const schemaOptions = {
    
        autoCreate: true,
        autoIndex: true,
        timestamps: true
    
}


export const auth = async (req,res,next) => {
    if(req.headers.hasOwnProperty('authorization')){
    
    try{
        const token = req.headers.authorization.split(' ').pop()
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findOne({status: true, _id: new mongoose.Types.ObjectId
        (decoded.id)}).exec()

        if(user != null){
            req.uid = user._id
            req.user = user

            next()
        }else{
            next({message: 'Invalid user',status: 401 })
        }
        
    }catch(e){
        console.error(e)
        next({message: 'Invalid token',status: 401})
    }
    }else{
        next({message:'Authentication failed', status: 401})
    }
    
    
} 

export const cmsUser = (req,res,next)=> {
    if(['Admin','Staff'].includes(req.user.type)) {
        next()
    }else{
        next({message:'Access denied', status: 403})
    }
}

export const adminUser = (req,res,next)=> {
    if(req.user.type == 'Admin'){
        next()
    }else{
        next({message:'Access denied', status: 403})
    }
}

export const customerUser = (req,res,next)=> {
    if(req.user.type == 'Customer'){
        next()
    }else{
        next({message:'Access denied', status: 403})
    }
}


export const genPassword = async(password) => 
    Promise.resolve(bcrypt.hash(password, bcrypt.getRounds(process.env.BCRYPT_SALT)))


export const fileUpload = (mimeList = []) => multer({
    storage: multer.diskStorage({
        destination: (req, file, callback) => callback(null, 'images'),
        filename: (req, file, callback) => {
            const ext = file.originalname.split('.').pop()
            const filename = Date.now() + `.${ext}`
    

            callback(null, filename)

        }
    }),
    fileFilter: (req, file, callback) => {
        if (mimeList.length > 0){
            if (mimeList.includes(file.mimetype)){
                callback(null, true)
            }else{
                callback({message: 'File type not supported'}, false)
            }
        }else{
            callback(null, true)
        }
    },
})



