import mongoose, { Schema } from "mongoose";
import { ICategory } from "../interfaces/category.interface";

const categorySchema = new Schema<ICategory>({
    type: { type: String, required: true},
    title: { 
        ca: { type: String, required: true }, 
        es: { type: String, required: true }, 
        en: { type: String, required: true } 
    },
    description: { 
        ca: { type: String, required: true }, 
        es: { type: String, required: true }, 
        en: { type: String, required: true } 
    },
    images: { type: [String], required: true, default: [] },
    videos: { type: [String], default: [] }
}, {
    timestamps: true
});

export const CategoryModel = mongoose.model<ICategory>("categories", categorySchema);