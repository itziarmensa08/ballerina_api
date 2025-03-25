import { Document } from "mongoose";

export interface ICategory extends Document {
    type: string;
    title: {
        ca: string,
        es: string,
        en: string
    };
    description: {
        ca: string,
        es: string,
        en: string
    };
    images: string[];
    videos?: string[];
}