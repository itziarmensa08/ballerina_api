import mongoose, { Schema } from "mongoose";
import { ICompetition } from "../interfaces/competition.interface";

const competitionSchema = new Schema<ICompetition>({
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

export const CompetitionModel = mongoose.model<ICompetition>("competitions", competitionSchema);