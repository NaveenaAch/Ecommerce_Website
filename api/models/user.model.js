import { model, Schema } from "mongoose"
import { schemaOptions } from "../lib/function.js"

export const User = model('User', new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        maxLength: 30,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    status:{
        type: Boolean,
        default: true,
        required: true,
    },
    type:{
        type: String,
        required: true,
        enum: ['Admin','Staff','Customer'],
        default: 'Customer'
    }
}, {
    autoCreate: true,
    autoIndex: true,
    timestamps: true
}))
