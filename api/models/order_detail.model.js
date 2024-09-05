import mongoose, { model, Schema } from "mongoose"
import { schemaOptions } from "../lib/function.js"

export const OrderDetail = model('OrderDetail', new Schema({
    order_id:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    product_id:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'products'
    },
    price:{
        type: Number,
        required: true,
    },
    qty:{
        type: Number,
        required: true,
    },
    total:{
        type: Number,
        required: true,
    }
    
}, {
    autoCreate: true,
    autoIndex: true,
    timestamps: true    
}))
