import UserModel from "../models/user.model";
import { IUser } from "../interfaces/user.interface";

/**
 * Get all users
 */
export const getAllUsers = async (): Promise<IUser[]> => {
    return await UserModel.find();
};

/**
 * Get a user by ID
 * @param id - User's ID
 */
export const getUserById = async (id: string): Promise<IUser | null> => {
    return await UserModel.findById(id);
};

/**
 * Update a user by ID
 * @param id - User's ID
 * @param updateData - Data to update
 */
export const updateUserById = async (id: string, updateData: Partial<IUser>): Promise<IUser | null> => {
    return await UserModel.findByIdAndUpdate(id, updateData, { new: true });
};

/**
 * Change lamguage user by ID
 * @param id - User's ID
 * @param lang - Language
 */
export const changeLangByID = async (id: string, lang: string): Promise<IUser | null> => {
    return await UserModel.findByIdAndUpdate(id, {language: lang}, { new: true });
};

/**
 * Delete a user by ID
 * @param id - User's ID
 */
export const deleteUserById = async (id: string): Promise<IUser | null> => {
    return await UserModel.findByIdAndDelete(id);
};