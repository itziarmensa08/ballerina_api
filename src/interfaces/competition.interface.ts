import { Document } from "mongoose";

export interface ICompetition extends Document {
    title: string;
    description: string;
    images: string[];
}