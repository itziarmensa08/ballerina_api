import { Document } from "mongoose";

export interface IExhibition extends Document {
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
}