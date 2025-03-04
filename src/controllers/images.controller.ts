import { Request, Response } from "express";
import { 
    createImage, 
    deleteImageById, 
    getAllImages, 
    getImageById, 
    updateImageById 
} from "../services/images.service";

/**
 * Controller to get all images
 */
export const getAllImagesController = async (req: Request, res: Response) => {
    try {
        const images = await getAllImages();
        res.json(images);
    } catch (error) {
        res.status(500).json({ message: "Server error, please try again later" });
    }
};

/**
 * Controller to get an image by ID
 */
export const getImageController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const image = await getImageById(id);
        if (!image) {
            res.status(404).json({ message: "Image not found" });
            return;
        }
        res.json(image);
    } catch (error: any) {
        if (error.message === "INVALID_ID") {
            res.status(400).json({ message: "Invalid ObjectId" });
        } else {
            res.status(500).json({ message: "Server error, please try again later" });
        }
    }
};

/**
 * Controller to create a new image
 */
export const createImageController = async (req: Request, res: Response) => {
    try {
        const { key, images } = req.body;

        // Validación de datos de entrada
        if (!key || !Array.isArray(images) || images.length === 0) {
            res.status(400).json({ message: "Key and at least one image are required" });
            return;
        }

        const createdImage = await createImage({ key, images });
        res.status(201).json(createdImage);
    } catch (error: any) {
        if (error.code === 11000) {
            res.status(400).json({ message: "Duplicated key" });
        } else {
            res.status(500).json({ message: "Server error, please try again later" });
        }
    }
};

/**
 * Controller to update an image by ID
 */
export const updateImageController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (!updateData || Object.keys(updateData).length === 0) {
            res.status(400).json({ message: "At least one field is required for update" });
            return;
        }

        const updatedImage = await updateImageById(id, updateData);
        if (!updatedImage) {
            res.status(404).json({ message: "Image not found" });
            return;
        }

        res.status(200).json(updatedImage);
    } catch (error: any) {
        if (error.message === "INVALID_ID") {
            res.status(400).json({ message: "Invalid ObjectId" });
        } else {
            res.status(500).json({ message: "Server error, please try again later" });
        }
    }
};

/**
 * Controller to delete an image by ID
 */
export const deleteImageController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const imageDeleted = await deleteImageById(id);
        if (!imageDeleted) {
            res.status(404).json({ message: "Image not found" });
            return;
        }

        res.status(200).json({ message: "Image deleted successfully" });
    } catch (error: any) {
        if (error.message === "INVALID_ID") {
            res.status(400).json({ message: "Invalid ObjectId" });
        } else {
            res.status(500).json({ message: "Server error, please try again later" });
        }
    }
};