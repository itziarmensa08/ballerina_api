import UserModel from "../models/user.model";
import { IUser } from "../interfaces/user.interface";
import { UpdateUserDTO } from "../dtos/user.dto";

/**
 * Get all users
 */
export const getAllUsers = async (): Promise<IUser[]> => {
    return await UserModel.find();
};

/**
 * Get all admins
 */
export const getAdmins = async (): Promise<IUser[]> => {
  return await UserModel.find({ roles: 'admin' });
};

/**
 * Get all users (role: user)
 */
export const getUsers = async (): Promise<IUser[]> => {
  return await UserModel.find({ roles: 'user' });
};

/**
 * Get all gimnasts
 */
export const getGimnasts = async (): Promise<IUser[]> => {
  return await UserModel.find({ roles: 'gimnast' });
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
export const updateUserById = async (id: string, updateData: UpdateUserDTO): Promise<IUser | null> => {
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

/**
 * Get the count of users by role
 */
export const getUsersCountByRole = async (): Promise<{ admin: number; user: number; gimnast: number }> => {
    const roles = ['admin', 'user', 'gimnast'];

    const counts = await Promise.all(
        roles.map(async (role) => ({
            role,
            count: await UserModel.countDocuments({ roles: role })
        }))
    );

    return {
        admin: counts.find(c => c.role === 'admin')?.count ?? 0,
        user: counts.find(c => c.role === 'user')?.count ?? 0,
        gimnast: counts.find(c => c.role === 'gimnast')?.count ?? 0,
    };
};