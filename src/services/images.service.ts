import mongoose from "mongoose";
import { Image } from "../interfaces/image.interface";
import { ImageModel } from "../models/image.model";

/**
 * Get all images
 */
export const getAllImages = async (): Promise<Image[]> => {
    return await ImageModel.find();
};

/**
 * Get an image by ID
 * @param id - Image's ID
 */
export const getImageById = async (id: string): Promise<Image | null> => {
    if (!mongoose.isValidObjectId(id)) throw new Error("INVALID_ID");
    return await ImageModel.findById(id);
};

/**
 * Create a new image
 * @param imageData - Data for the new image
 */
export const createImage = async (imageData: Image): Promise<Image> => {
    const newImage = new ImageModel(imageData);
    return await newImage.save();
};

/**
 * Update an image by ID
 * @param id - Image's ID
 * @param updateData - Data to update
 */
export const updateImageById = async (id: string, updateData: Partial<Image>): Promise<Image | null> => {
    if (!mongoose.isValidObjectId(id)) throw new Error("INVALID_ID");
    return await ImageModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
};

/**
 * Delete an image by ID
 * @param id - Image's ID
 */
export const deleteImageById = async (id: string): Promise<Image | null> => {
    if (!mongoose.isValidObjectId(id)) throw new Error("INVALID_ID");
    return await ImageModel.findByIdAndDelete(id);
};
