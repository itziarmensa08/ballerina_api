import mongoose from "mongoose";
import { uploadToCloudinary } from "../config/cloudinary";
import { IExhibition } from "../interfaces/exhibitions.interface";
import { ExhibitionModel } from "../models/exhibition.model";

/**
 * Get all Exhibitions
 */
export const getAllExhibitions = async (): Promise<IExhibition[]> => {
    return await ExhibitionModel.find();
};

/**
 * Get a Exhibition by ID
 * @param id - Exhibition's ID
 */
export const getExhibitionById = async (id: string): Promise<IExhibition | null> => {
    if (!mongoose.isValidObjectId(id)) throw new Error("INVALID_ID");
    return await ExhibitionModel.findById(id);
};

/**
 * Create a new Exhibition
 * @param ExhibitionData - Data for the new Exhibition
 */
export const createExhibition = async (ExhibitionData: Partial<IExhibition>, files: Express.Multer.File[]): Promise<IExhibition> => {
    if (!files) throw new Error("No se han recibido ninguna imágen");
    let listImages: string[] = [];
    for (let file of files) {
        const uploadedImage = await uploadToCloudinary(file.buffer, 'images');
        listImages.push(uploadedImage);
    }
    const newExhibition = new ExhibitionModel({
        title: ExhibitionData.title,
        description: ExhibitionData.description,
        images: listImages
    });
    return await newExhibition.save();
};

/**
 * Update a Exhibition by ID
 * @param id - Exhibition's ID
 * @param updateData - Data to update
 */
export const updateExhibitionById = async (id: string, ExhibitionData: Partial<IExhibition>, files: Express.Multer.File[]): Promise<IExhibition | null> => {
    if (!mongoose.isValidObjectId(id)) throw new Error("INVALID_ID");
    let listImages: string[] = [];
    for (let file of files) {
        const uploadedImage = await uploadToCloudinary(file.buffer, 'images');
        listImages.push(uploadedImage);
    }
    const { _id, ...updateData } = ExhibitionData; 

    if (listImages.length > 0) {
        updateData.images = listImages;
    }

    return await ExhibitionModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
};

/**
 * Delete a Exhibition by ID
 * @param id - Exhibition's ID
 */
export const deleteExhibitionById = async (id: string): Promise<IExhibition | null> => {
    if (!mongoose.isValidObjectId(id)) throw new Error("INVALID_ID");
    return await ExhibitionModel.findByIdAndDelete(id);
};