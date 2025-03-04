import mongoose from "mongoose";
import { ICompetition } from "../interfaces/competition.interface";
import { CompetitionModel } from "../models/competition.model";

/**
 * Get all competitions
 */
export const getAllCompetitions = async (): Promise<ICompetition[]> => {
    return await CompetitionModel.find();
};

/**
 * Get a competition by ID
 * @param id - Competition's ID
 */
export const getCompetitionById = async (id: string): Promise<ICompetition | null> => {
    if (!mongoose.isValidObjectId(id)) throw new Error("INVALID_ID");
    return await CompetitionModel.findById(id);
};

/**
 * Create a new competition
 * @param competitionData - Data for the new competition
 */
export const createCompetition = async (competitionData: ICompetition): Promise<ICompetition> => {
    const newCompetition = new CompetitionModel(competitionData);
    return await newCompetition.save();
};

/**
 * Update a competition by ID
 * @param id - Competition's ID
 * @param updateData - Data to update
 */
export const updateCompetitionById = async (id: string, updateData: Partial<ICompetition>): Promise<ICompetition | null> => {
    if (!mongoose.isValidObjectId(id)) throw new Error("INVALID_ID");
    return await CompetitionModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
};

/**
 * Delete a competition by ID
 * @param id - Competition's ID
 */
export const deleteCompetitionById = async (id: string): Promise<ICompetition | null> => {
    if (!mongoose.isValidObjectId(id)) throw new Error("INVALID_ID");
    return await CompetitionModel.findByIdAndDelete(id);
};