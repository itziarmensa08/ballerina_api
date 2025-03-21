import { Request, Response } from "express";
import { 
    createExhibition, 
    deleteExhibitionById, 
    getAllExhibitions, 
    getExhibitionById, 
    updateExhibitionById 
} from "../services/exhibitions.service";

/**
 * Controller to get all exhibitions
 */
export const getAllExhibitionsController = async (req: Request, res: Response) => {
    try {
        const Exhibitions = await getAllExhibitions();
        res.json(Exhibitions);
    } catch (error) {
        res.status(500).json({ message: "Server error, please try again later" });
    }
};

/**
 * Controller to get a Exhibition by ID
 */
export const getExhibitionController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const Exhibition = await getExhibitionById(id);
        if (!Exhibition) {
            res.status(404).json({ message: "Exhibition not found" });
            return;
        }
        res.json(Exhibition);
    } catch (error: any) {
        if (error.message === "INVALID_ID") {
            res.status(400).json({ message: "Invalid ObjectId" });
        } else {
            res.status(500).json({ message: "Server error, please try again later" });
        }
    }
};

/**
 * Controller to create a new Exhibition
 */
export const createExhibitionController = async (req: Request, res: Response) => {
    try {
        const { exhibition } = req.body;
        const files = req.files;

        if (!exhibition || !Array.isArray(files) || files.length === 0) {
            res.status(400).json({ message: "Title, description, and at least one image are required" });
            return;
        }

        const createdExhibition = await createExhibition(JSON.parse(exhibition), files);
        res.status(201).json(createdExhibition);
    } catch (error: any) {
        res.status(500).json({ message: "Server error, please try again later" });
    }
};

/**
 * Controller to update a Exhibition by ID
 */
export const updateExhibitionController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { exhibition } = req.body;
        let files = req.files;

        if (!exhibition) {
            res.status(400).json({ message: "Title or description required" });
            return;
        }

        if (!Array.isArray(files) || files.length === 0) {
            files = [];
        }

        const updatedExhibition = await updateExhibitionById(id, JSON.parse(exhibition), files);
        if (!updatedExhibition) {
            res.status(404).json({ message: "Exhibition not found" });
            return;
        }

        res.status(200).json(updatedExhibition);
    } catch (error: any) {
        if (error.message === "INVALID_ID") {
            res.status(400).json({ message: "Invalid ObjectId" });
        } else {
            res.status(500).json({ message: "Server error, please try again later" });
        }
    }
};

/**
 * Controller to delete a Exhibition by ID
 */
export const deleteExhibitionController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const ExhibitionDeleted = await deleteExhibitionById(id);
        if (!ExhibitionDeleted) {
            res.status(404).json({ message: "Exhibition not found" });
            return;
        }

        res.status(200).json({ message: "Exhibition deleted successfully" });
    } catch (error: any) {
        if (error.message === "INVALID_ID") {
            res.status(400).json({ message: "Invalid ObjectId" });
        } else {
            res.status(500).json({ message: "Server error, please try again later" });
        }
    }
};