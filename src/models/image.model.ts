import mongoose from "mongoose";
import { Image } from "../interfaces/image.interface";

const imageSchema = new mongoose.Schema<Image>(
    {
        key: { type: String, required: true, unique: true },
        images: { type: [String], required: true, default: [] },
    }, {
        timestamps: true,
        versionKey: false
    }
);
  
export const ImageModel = mongoose.model<Image>("images", imageSchema);