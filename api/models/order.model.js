import mongoose, { model, Schema } from "mongoose"
import { schemaOptions } from "../lib/function.js"

export const Order = model('Order', new Schema({
    user_id:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    status:{
        type: String,
        enum: ['Processing', 'Confirmed', 'Shipping', 'Delivered', 'Cancelled'],
        default: 'Processing',
        required: true,
    }
}, {
    autoCreate: true,
    autoIndex: true,
    timestamps: true    
}))
