import { Request, Response } from "express";
import { 
    createImage, 
    deleteImageById, 
    getAllImages, 
    getImageById, 
    getImageByKey, 
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
 * Controller to get an image by Key
 */
export const getImageByKeyController = async (req: Request, res: Response) => {
    try {
        const { key } = req.params;
        const image = await getImageByKey(key);
        if (!image) {
            res.status(404).json({ message: "Image not found" });
            return;
        }
        res.json(image);
    } catch (error: any) {
        res.status(500).json({ message: "Server error, please try again later" });
    }
};

/**
 * Controller to create a new image
 */
export const createImageController = async (req: Request, res: Response) => {
    try {
        const { key } = req.body;
        const image = req.file;

        // Validación de datos de entrada
        if (!key || !image) {
            res.status(400).json({ message: "Key and one image are required" });
            return;
        }

        const createdImage = await createImage(key, image);
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
        const image = req.file;

        if (!image) {
            res.status(400).json({ message: "Image is required for update" });
            return;
        }

        const updatedImage = await updateImageById(id, image);
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