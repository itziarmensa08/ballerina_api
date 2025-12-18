import { Request, Response } from "express";
import { getAllUsers, getUserById, updateUserById, deleteUserById, changeLangByID, getUsersCountByRole, getGimnasts, getUsers, getAdmins } from "../services/users.service";
import logger from "../config/logger";

/**
 * Get all users
 */
export const getAllUsersController = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        logger.info(`Fetched all users successfully`);
        res.status(200).json(users);
    } catch (error) {
        logger.error(`Error getAllUsersController: ${error}`)
        res.status(500).json({ message: "Server error, please try again later" });
    }
};

/**
 * Get all admins
 */
export const getAdminsController = async (req: Request, res: Response) => {
  try {
    const admins = await getAdmins();
    logger.info(`Fetched all admins successfully`);
    res.status(200).json(admins);
  } catch (error) {
    logger.error(`Error getAdminsController: ${error}`);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

/**
 * Get all users (role: user)
 */
export const getUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    logger.info(`Fetched all users successfully`);
    res.status(200).json(users);
  } catch (error) {
    logger.error(`Error getUsersController: ${error}`);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

/**
 * Get all gimnasts
 */
export const getGimnastsController = async (req: Request, res: Response) => {
  try {
    const gimnasts = await getGimnasts();
    logger.info(`Fetched all gimnasts successfully`);
    res.status(200).json(gimnasts);
  } catch (error) {
    logger.error(`Error getGimnastsController: ${error}`);
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
        logger.info(`Fetched user successfully: ID ${id}`);
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
    const { user } = req.body;

    try {
        const updatedUser = await updateUserById(id, user);
        if (!updatedUser) {
            logger.error(`Error updateUserByIdController: User not found`)
            res.status(404).json({ message: "User not found" });
            return;
        }
        logger.warn(`Updated user successfully: ID ${id}, USERNAME ${updatedUser.username}`);
        res.status(200).json(updatedUser);
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
        logger.warn(`Changed language successfully: ID ${id}, LANG ${lang}`);
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
        logger.warn(`Deleted user successfully: ID ${id}, USERNAME ${user.username}`);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        logger.error(`Error deleteUserByIdController: ${error}`)
        res.status(500).json({ message: "Server error, please try again later" });
    }
};

/**
 * Get users count by role
 */
export const getUsersCountByRoleController = async (req: Request, res: Response) => {
    try {
        const counts = await getUsersCountByRole();
        logger.info(`Fetched users count by role successfully`);
        res.status(200).json(counts);
    } catch (error) {
        logger.error(`Error getUsersCountByRoleController: ${error}`);
        res.status(500).json({ message: "Server error, please try again later" });
    }
};