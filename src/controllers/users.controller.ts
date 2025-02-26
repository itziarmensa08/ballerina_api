import { Request, Response } from "express";
import { getAllUsers, getUserById, updateUserById, deleteUserById } from "../services/users.service";

/**
 * Get all users
 */
export const getAllUsersController = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
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
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
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
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
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
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error, please try again later" });
    }
};