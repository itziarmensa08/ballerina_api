import mongoose from "mongoose";
import { ICompetition } from "../interfaces/competition.interface";
import { CompetitionModel } from "../models/competition.model";
import { uploadToCloudinary } from "../config/cloudinary";

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
export const createCompetition = async (competitionData: Partial<ICompetition>, files: Express.Multer.File[]): Promise<ICompetition> => {
    if (!files) throw new Error("No se han recibido ninguna imágen");
    let listImages: string[] = [];
    for (let file of files) {
        const uploadedImage = await uploadToCloudinary(file.buffer, 'images');
        listImages.push(uploadedImage);
    }
    const newCompetition = new CompetitionModel({
        title: competitionData.title,
        description: competitionData.description,
        images: listImages
    });
    return await newCompetition.save();
};

/**
 * Update a competition by ID
 * @param id - Competition's ID
 * @param updateData - Data to update
 */
export const updateCompetitionById = async (id: string, competitionData: Partial<ICompetition>, files: Express.Multer.File[]): Promise<ICompetition | null> => {
    if (!mongoose.isValidObjectId(id)) throw new Error("INVALID_ID");
    let listImages: string[] = [];
    for (let file of files) {
        const uploadedImage = await uploadToCloudinary(file.buffer, 'images');
        listImages.push(uploadedImage);
    }
    const { _id, ...updateData } = competitionData; 

    if (listImages.length > 0) {
        updateData.images = listImages;
    }

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