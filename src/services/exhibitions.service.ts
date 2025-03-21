import mongoose from "mongoose";
import { uploadToCloudinary } from "../config/cloudinary";
import { IExhibition } from "../interfaces/exhibitions.interface";
import { ExhibitionModel } from "../models/exhibition.model";
import { maybeCompressFile } from "../utils/compress.utils";

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
    const imagesList: string[] = [];
    const videosList: string[] = [];

    for (let file of files) {
        try {
            const compressedBuffer = await maybeCompressFile(file);

            const folder = file.mimetype.startsWith('video/') ? 'exhibitions/videos' : 'exhibitions/images';

            const uploadedUrl = await uploadToCloudinary(compressedBuffer, folder);

            if (file.mimetype.startsWith('video/')) {
                videosList.push(uploadedUrl);
            } else if (file.mimetype.startsWith('image/')) {
                imagesList.push(uploadedUrl);
            }
        } catch (err) {
            throw new Error('UPLOAD_FAILED');
        }
    }
    const newExhibition = new ExhibitionModel({
        title: ExhibitionData.title,
        description: ExhibitionData.description,
        images: imagesList,
        videos: videosList
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
    const imagesList: string[] = [];
    const videosList: string[] = [];

    for (let file of files) {
        try {
            const compressedBuffer = await maybeCompressFile(file);

            const folder = file.mimetype.startsWith('video/') ? 'exhibitions/videos' : 'exhibitions/images';

            const uploadedUrl = await uploadToCloudinary(compressedBuffer, folder);

            if (file.mimetype.startsWith('video/')) {
                videosList.push(uploadedUrl);
            } else if (file.mimetype.startsWith('image/')) {
                imagesList.push(uploadedUrl);
            }
        } catch (err) {
            throw new Error('UPLOAD_FAILED');
        }
    }

    const { _id, ...updateData } = ExhibitionData; 

    if (imagesList.length > 0) {
        updateData.images = imagesList;
    }

    if (videosList.length > 0) {
        updateData.videos = videosList;
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
