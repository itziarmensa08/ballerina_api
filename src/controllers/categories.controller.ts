import { Request, Response } from "express";
import { createCategory, deleteCategoryById, getAllCategories, getCategoriesByType, getCategoryById, updateCategoryById } from "../services/categories.service";

/**
 * Controller to get all categories
 */
export const getAllCategoriesController = async (req: Request, res: Response) => {
    try {
        const Categories = await getAllCategories();
        res.json(Categories);
    } catch (error) {
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
            res.status(404).json({ message: "Categorie not found" });
            return;
        }
        res.json(Categorie);
    } catch (error: any) {
        if (error.message === "INVALID_ID") {
            res.status(400).json({ message: "Invalid ObjectId" });
        } else {
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
            res.status(404).json({ message: "Categorie not found" });
            return;
        }
        res.json(Categorie);
    } catch (error: any) {
        if (error.message === "INVALID_ID") {
            res.status(400).json({ message: "Invalid ObjectId" });
        } else {
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
            res.status(400).json({ message: "Title, description, and at least one image are required" });
            return;
        }

        const createdCategory = await createCategory(JSON.parse(category), files);
        res.status(201).json(createdCategory);
    } catch (error: any) {
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
            res.status(400).json({ message: "Title or description required" });
            return;
        }

        if (!Array.isArray(files) || files.length === 0) {
            files = [];
        }

        const updatedcategory = await updateCategoryById(id, JSON.parse(category), files);
        if (!updatedcategory) {
            res.status(404).json({ message: "Category not found" });
            return;
        }

        res.status(200).json(updatedcategory);
    } catch (error: any) {
        if (error.message === "INVALID_ID") {
            res.status(400).json({ message: "Invalid ObjectId" });
        } else {
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
            res.status(404).json({ message: "Category not found" });
            return;
        }

        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error: any) {
        if (error.message === "INVALID_ID") {
            res.status(400).json({ message: "Invalid ObjectId" });
        } else {
            res.status(500).json({ message: "Server error, please try again later" });
        }
    }
};