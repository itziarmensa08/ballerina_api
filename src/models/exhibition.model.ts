import mongoose, { Schema } from "mongoose";
import { IExhibition } from "../interfaces/exhibitions.interface";

const exhibitionSchema = new Schema<IExhibition>({
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
    images: { type: [String], required: true, default: [] }
}, {
    timestamps: true
});

export const ExhibitionModel = mongoose.model<IExhibition>("exhibitions", exhibitionSchema);