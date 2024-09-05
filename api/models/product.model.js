import mongoose, { model, Schema } from "mongoose"
import { schemaOptions } from "../lib/function.js"

export const Product = model('Product', new Schema({
    name:{
        type: String,
        required: true,
    },
    slug:{
        type: String,
        unique: true,
        required: true,
    },
    summary:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    discounted_price:{
        type: Number,    
    },
    category_id:{
        type: mongoose.Types.ObjectId,
        required:true,
        ref:"categories",
    },
    brand_id:{
        type: mongoose.Types.ObjectId,
        required:true,
        ref:"brands",
    },
    images:{
        type: [String],
        required: true,
    },

    status:{
        type: Boolean,
        default: true,
        required: true,
    },
    featured:{
        type: Boolean,
        default: false,
        required: true,
    }
}, {
    autoCreate: true,
    autoIndex: true,
    timestamps: true
}))
