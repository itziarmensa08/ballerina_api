import mongoose, { Schema } from "mongoose";
import { ICompetition } from "../interfaces/competition.interface";

const competitionSchema = new Schema<ICompetition>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: [String], required: true, default: [] }
}, {
    timestamps: true
});

export const CompetitionModel = mongoose.model<ICompetition>("competitions", competitionSchema);