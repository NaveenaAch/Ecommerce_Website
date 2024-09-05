import mongoose, { model, Schema } from "mongoose"
import { schemaOptions } from "../lib/function.js"

export const Review = model('Review', new Schema({
    comment:{
        type: String,
        required:true,
    },
    rating:{
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    product_id:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'products'
    },
    user_id:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'users'
    },

}, {
    autoCreate: true,
    autoIndex: true,
    timestamps: true
}))
