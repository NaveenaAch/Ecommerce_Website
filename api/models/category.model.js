import { model, Schema } from "mongoose"
import { schemaOptions } from "../lib/function.js"

export const Category = model('Category', new Schema({
    name:{
        type: String,
        required: true,
    },
    slug:{
        type: String,
        unique: true,
        required: true,
    },
    status:{
        type: Boolean,
        default: true,
        required: true,
    },
}, {
    autoCreate: true,
    autoIndex: true,
    timestamps: true
}))
