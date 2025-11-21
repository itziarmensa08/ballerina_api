import mongoose from "mongoose";
import { ICategory } from "../interfaces/category.interface";
import { CategoryModel } from "../models/category.model";
import { maybeCompressFile } from "../utils/compress.utils";
import { uploadToCloudinary } from "../config/cloudinary";


/**
 * Get all Categories
 */
export const getAllCategories = async (): Promise<ICategory[]> => {
    return await CategoryModel.find();
};

/**
 * Get category by type
 */
export const getCategoriesByType = async (type: String): Promise<ICategory[]> => {
    return await CategoryModel.find({ type }).sort({ createdAt: -1 });
};

/**
 * Get a Category by ID
 * @param id - Category's ID
 */
export const getCategoryById = async (id: string): Promise<ICategory | null> => {
    if (!mongoose.isValidObjectId(id)) throw new Error("INVALID_ID");
    return await CategoryModel.findById(id);
};

/**
 * Create a new Category
 * @param CategoryData - Data for the new Category
 */
export const createCategory = async (CategoryData: Partial<ICategory>, files: Express.Multer.File[]): Promise<ICategory> => {
    if (!files) throw new Error("No se han recibido ninguna imágen");
    const imagesList: string[] = [];
    const videosList: string[] = [];

    for (let file of files) {
        try {
            const compressedBuffer = await maybeCompressFile(file);

            const videoFolder = CategoryData.type + '/videos';

            const imageFolder = CategoryData.type + '/images';

            const folder = file.mimetype.startsWith('video/') ? videoFolder : imageFolder;

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
    const newCategory = new CategoryModel({
        type: CategoryData.type,
        title: CategoryData.title,
        description: CategoryData.description,
        images: imagesList,
        videos: videosList
    });
    return await newCategory.save();
};

/**
 * Update a Category by ID
 * @param id - Category's ID
 * @param updateData - Data to update
 */
export const updateCategoryById = async (id: string, CategoryData: Partial<ICategory>, files: Express.Multer.File[]): Promise<ICategory | null> => {
    if (!mongoose.isValidObjectId(id)) throw new Error("INVALID_ID");
    const imagesList: string[] = [];
    const videosList: string[] = [];

    for (let file of files) {
        try {
            const compressedBuffer = await maybeCompressFile(file);

            const videoFolder = CategoryData.type + '/videos';

            const imageFolder = CategoryData.type + '/images';

            const folder = file.mimetype.startsWith('video/') ? videoFolder : imageFolder;

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

    const { _id, ...updateData } = CategoryData; 

    if (imagesList.length > 0) {
        updateData.images = imagesList;
    }

    if (videosList.length > 0) {
        updateData.videos = videosList;
    }

    return await CategoryModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
};

/**
 * Delete a Category by ID
 * @param id - Category's ID
 */
export const deleteCategoryById = async (id: string): Promise<ICategory | null> => {
    if (!mongoose.isValidObjectId(id)) throw new Error("INVALID_ID");
    return await CategoryModel.findByIdAndDelete(id);
};