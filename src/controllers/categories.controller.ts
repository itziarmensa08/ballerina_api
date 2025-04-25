import { Request, Response } from "express";
import { createCategory, deleteCategoryById, getAllCategories, getCategoriesByType, getCategoryById, updateCategoryById } from "../services/categories.service";
import logger from "../config/logger";

/**
 * Controller to get all categories
 */
export const getAllCategoriesController = async (req: Request, res: Response) => {
    try {
        const Categories = await getAllCategories();
        res.json(Categories);
    } catch (error) {
        logger.error(`Error getAllCategoriesController: ${error}`)
        res.status(500).json({ message: "Server error, please try again later" });
    }
};

/**
 * Controller to get a Categorie by ID
 */
export const getCategoryController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const Categorie = await getCategoryById(id);
        if (!Categorie) {
            logger.error(`Error getCategoryController: Categorie not found`)
            res.status(404).json({ message: "Categorie not found" });
            return;
        }
        res.json(Categorie);
    } catch (error: any) {
        if (error.message === "INVALID_ID") {
            logger.error(`Error getCategoryController: Invalid ObjectId`)
            res.status(400).json({ message: "Invalid ObjectId" });
        } else {
            logger.error(`Error getCategoryController: ${error}`)
            res.status(500).json({ message: "Server error, please try again later" });
        }
    }
};

/**
 * Controller to get a Categorie by ID
 */
export const getCategorieByTypeController = async (req: Request, res: Response) => {
    try {
        const { type } = req.params;
        const Categorie = await getCategoriesByType(type);
        if (!Categorie) {
            logger.error(`Error getCategorieByTypeController: Categorie not found`)
            res.status(404).json({ message: "Categorie not found" });
            return;
        }
        res.json(Categorie);
    } catch (error: any) {
        if (error.message === "INVALID_ID") {
            logger.error(`Error getCategorieByTypeController: Invalid ObjectId`)
            res.status(400).json({ message: "Invalid ObjectId" });
        } else {
            logger.error(`Error getCategorieByTypeController: ${error}`)
            res.status(500).json({ message: "Server error, please try again later" });
        }
    }
};

/**
 * Controller to create a new Category
 */
export const createCategoryController = async (req: Request, res: Response) => {
    try {
        const { category } = req.body;
        const files = req.files;

        if (!category || !Array.isArray(files) || files.length === 0) {
            logger.error(`Error createCategoryController: Title, description, and at least one image are required`)
            res.status(400).json({ message: "Title, description, and at least one image are required" });
            return;
        }

        const createdCategory = await createCategory(JSON.parse(category), files);
        res.status(201).json(createdCategory);
    } catch (error: any) {
        logger.error(`Error createCategoryController: ${error}`)
        res.status(500).json({ message: "Server error, please try again later" });
    }
};

/**
 * Controller to update a Category by ID
 */
export const updateCategoryController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { category } = req.body;
        let files = req.files;

        if (!category) {
            logger.error(`Error updateCategoryController: Title or description required`)
            res.status(400).json({ message: "Title or description required" });
            return;
        }

        if (!Array.isArray(files) || files.length === 0) {
            files = [];
        }

        const updatedcategory = await updateCategoryById(id, JSON.parse(category), files);
        if (!updatedcategory) {
            logger.error(`Error updateCategoryController: Category not found`)
            res.status(404).json({ message: "Category not found" });
            return;
        }

        res.status(200).json(updatedcategory);
    } catch (error: any) {
        if (error.message === "INVALID_ID") {
            logger.error(`Error updateCategoryController: Invalid ObjectId`)
            res.status(400).json({ message: "Invalid ObjectId" });
        } else {
            logger.error(`Error updateCategoryController: ${error}`)
            res.status(500).json({ message: "Server error, please try again later" });
        }
    }
};

/**
 * Controller to delete a Category by ID
 */
export const deleteCategoryController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const CategoryDeleted = await deleteCategoryById(id);
        if (!CategoryDeleted) {
            logger.error(`Error deleteCategoryController: Category not found`)
            res.status(404).json({ message: "Category not found" });
            return;
        }

        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error: any) {
        if (error.message === "INVALID_ID") {
            logger.error(`Error deleteCategoryController: Invalid ObjectId`)
            res.status(400).json({ message: "Invalid ObjectId" });
        } else {
            logger.error(`Error deleteCategoryController: ${error}`)
            res.status(500).json({ message: "Server error, please try again later" });
        }
    }
};