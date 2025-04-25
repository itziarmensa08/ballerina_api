import { Request, Response } from "express";
import { getAllUsers, getUserById, updateUserById, deleteUserById, changeLangByID } from "../services/users.service";
import logger from "../config/logger";

/**
 * Get all users
 */
export const getAllUsersController = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        logger.error(`Error getAllUsersController: ${error}`)
        res.status(500).json({ message: "Server error, please try again later" });
    }
};

/**
 * Get a user by ID
 */
export const getUserByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const user = await getUserById(id);
        if (!user) {
            logger.error(`Error getUserByIdController: User not found`)
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        logger.error(`Error getUserByIdController: ${error}`)
        res.status(500).json({ message: "Server error, please try again later" });
    }
};

/**
 * Update a user by ID
 */
export const updateUserByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const user = await updateUserById(id, updateData);
        if (!user) {
            logger.error(`Error updateUserByIdController: User not found`)
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        logger.error(`Error updateUserByIdController: ${error}`)
        res.status(500).json({ message: "Server error, please try again later" });
    }
};

/**
 * Change language user by ID
 */
export const chnageLangByIdController = async (req: Request, res: Response) => {
    const { id, lang } = req.params;

    try {
        const user = await changeLangByID(id, lang);
        if (!user) {
            logger.error(`Error chnageLangByIdController: User not found`)
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        logger.error(`Error chnageLangByIdController: ${error}`)
        res.status(500).json({ message: "Server error, please try again later" });
    }
};

/**
 * Delete a user by ID
 */
export const deleteUserByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const user = await deleteUserById(id);
        if (!user) {
            logger.error(`Error deleteUserByIdController: User not found`)
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        logger.error(`Error deleteUserByIdController: ${error}`)
        res.status(500).json({ message: "Server error, please try again later" });
    }
};