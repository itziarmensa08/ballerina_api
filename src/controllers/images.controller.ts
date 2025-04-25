import { Request, Response } from "express";
import { 
    createImage, 
    deleteImageById, 
    getAllImages, 
    getImageById, 
    getImageByKey, 
    updateImageById 
} from "../services/images.service";
import logger from "../config/logger";

/**
 * Controller to get all images
 */
export const getAllImagesController = async (req: Request, res: Response) => {
    try {
        const images = await getAllImages();
        res.json(images);
    } catch (error) {
        logger.error(`Error getAllImagesController: ${error}`)
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
            logger.error(`Error getImageController: Image not found`)
            res.status(404).json({ message: "Image not found" });
            return;
        }
        res.json(image);
    } catch (error: any) {
        if (error.message === "INVALID_ID") {
            logger.error(`Error getImageController: Invalid ObjectId`)
            res.status(400).json({ message: "Invalid ObjectId" });
        } else {
            logger.error(`Error getImageController: ${error}`)
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
            logger.error(`Error getImageByKeyController: Image not found`)
            res.status(404).json({ message: "Image not found" });
            return;
        }
        res.json(image);
    } catch (error: any) {
        logger.error(`Error getImageByKeyController: ${error}`)
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
            logger.error(`Error createImageController: Key and one image are required`)
            res.status(400).json({ message: "Key and one image are required" });
            return;
        }

        const createdImage = await createImage(key, image);
        res.status(201).json(createdImage);
    } catch (error: any) {
        if (error.code === 11000) {
            logger.error(`Error createImageController: Duplicated key`)
            res.status(400).json({ message: "Duplicated key" });
        } else {
            logger.error(`Error createImageController: ${error}`)
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
            logger.error(`Error updateImageController: Image is required for update`)
            res.status(400).json({ message: "Image is required for update" });
            return;
        }

        const updatedImage = await updateImageById(id, image);
        if (!updatedImage) {
            logger.error(`Error updateImageController: Image not found`)
            res.status(404).json({ message: "Image not found" });
            return;
        }

        res.status(200).json(updatedImage);
    } catch (error: any) {
        if (error.message === "INVALID_ID") {
            logger.error(`Error updateImageController: Invalid ObjectId`)
            res.status(400).json({ message: "Invalid ObjectId" });
        } else {
            logger.error(`Error updateImageController: ${error}`)
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
            logger.error(`Error deleteImageController: Image not found`)
            res.status(404).json({ message: "Image not found" });
            return;
        }

        res.status(200).json({ message: "Image deleted successfully" });
    } catch (error: any) {
        if (error.message === "INVALID_ID") {
            logger.error(`Error deleteImageController: Invalid ObjectId`)
            res.status(400).json({ message: "Invalid ObjectId" });
        } else {
            logger.error(`Error deleteImageController: ${error}`)
            res.status(500).json({ message: "Server error, please try again later" });
        }
    }
};