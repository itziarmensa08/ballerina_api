import { Request, Response } from "express";
import { 
    createCompetition, 
    deleteCompetitionById, 
    getAllCompetitions, 
    getCompetitionById, 
    updateCompetitionById 
} from "../services/competitions.service";
import { ICompetition } from "../interfaces/competition.interface";

/**
 * Controller to get all competitions
 */
export const getAllCompetitionsController = async (req: Request, res: Response) => {
    try {
        const competitions = await getAllCompetitions();
        res.json(competitions);
    } catch (error) {
        res.status(500).json({ message: "Server error, please try again later" });
    }
};

/**
 * Controller to get a competition by ID
 */
export const getCompetitionController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const competition = await getCompetitionById(id);
        if (!competition) {
            res.status(404).json({ message: "Competition not found" });
            return;
        }
        res.json(competition);
    } catch (error: any) {
        if (error.message === "INVALID_ID") {
            res.status(400).json({ message: "Invalid ObjectId" });
        } else {
            res.status(500).json({ message: "Server error, please try again later" });
        }
    }
};

/**
 * Controller to create a new competition
 */
export const createCompetitionController = async (req: Request, res: Response) => {
    try {
        const { title, description, images } = req.body;

        // Validación de entrada
        if (!title || !description || !Array.isArray(images) || images.length === 0) {
            res.status(400).json({ message: "Title, description, and at least one image are required" });
            return;
        }

        const createdCompetition = await createCompetition({ title, description, images } as ICompetition);
        res.status(201).json(createdCompetition);
    } catch (error: any) {
        res.status(500).json({ message: "Server error, please try again later" });
    }
};

/**
 * Controller to update a competition by ID
 */
export const updateCompetitionController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (!updateData || Object.keys(updateData).length === 0) {
            res.status(400).json({ message: "At least one field is required for update" });
            return;
        }

        const updatedCompetition = await updateCompetitionById(id, updateData);
        if (!updatedCompetition) {
            res.status(404).json({ message: "Competition not found" });
            return;
        }

        res.status(200).json(updatedCompetition);
    } catch (error: any) {
        if (error.message === "INVALID_ID") {
            res.status(400).json({ message: "Invalid ObjectId" });
        } else {
            res.status(500).json({ message: "Server error, please try again later" });
        }
    }
};

/**
 * Controller to delete a competition by ID
 */
export const deleteCompetitionController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const competitionDeleted = await deleteCompetitionById(id);
        if (!competitionDeleted) {
            res.status(404).json({ message: "Competition not found" });
            return;
        }

        res.status(200).json({ message: "Competition deleted successfully" });
    } catch (error: any) {
        if (error.message === "INVALID_ID") {
            res.status(400).json({ message: "Invalid ObjectId" });
        } else {
            res.status(500).json({ message: "Server error, please try again later" });
        }
    }
};