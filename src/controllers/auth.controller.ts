import { Request, Response } from "express";
import { registerUserService, loginUserService, validateUserService, refreshTokenService, changePasswordService } from "../services/auth.service";
import logger from "../config/logger";

/**
 * Register a new user
 * @param req - Express request object
 * @param res - Express response object
 */
export const registerController = async (req: Request, res: Response) => {
    try {
        const user = await registerUserService(req.body);
        res.status(201).json(user);
    } catch (error: any) {
        // Handle specific error messages from the service
        if (error.message === "ALREADY USER") {
            logger.error('Error registerController: Username or email already exists')
            res.status(409).json({ message: "Username or email already exists" });
        } else {
            // Handle any other unexpected errors
            logger.error(`Error registerController: ${error}`)
            res.status(500).json({ message: "Server error, please try again later" });
        }
    }
};

/**
 * Login an existing user
 * @param req - Express request object
 * @param res - Express response object
 */
export const loginController = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const { accessToken, refreshToken, user } = await loginUserService(username, password);
        res.json({ accessToken, refreshToken, user });
    } catch (error: any) {
        // Handle specific errors for invalid credentials
        if (error.message === "NOT USER") {
            logger.error('Error loginController: User not found with this username')
            res.status(404).json({ message: "User not found with this username" });
        }
        else if (error.message === "INVALID PASS") {
            logger.error('Error loginController: Invalid password')
            res.status(401).json({ message: "Invalid password" });
        }
        else {
            // Handle any other unexpected errors
            logger.error(`Error loginController: ${error}`)
            res.status(500).json({ message: "Server error, please try again later" });
        }
    }
};

/**
 * Refresh Access Token
 * @param req - Express request object
 * @param res - Express response object
 */
export const refreshTokenController = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    try {
        const tokens = await refreshTokenService(refreshToken);
        res.json(tokens);
    } catch (error: any) {
        // Handle specific errors
        if (error.message === "REFRESH_TOKEN_REQUIRED") {
            logger.error('Error refreshTokenController: Refresh token is required')
            res.status(400).json({ message: "Refresh token is required" });
        } else if (error.message === "INVALID_REFRESH_TOKEN") {
            logger.error('Error refreshTokenController: Invalid or expired refresh token')
            res.status(403).json({ message: "Invalid or expired refresh token" });
        } else if (error.message === "NOT_FOUND_USER") {
            logger.error('Error refreshTokenController: Not found user')
            res.status(404).json({ message: "Not found user" });
        } else {
            // Handle any other unexpected errors
            logger.error(`Error refreshTokenController: ${error}`)
            res.status(500).json({ message: "Server error, please try again later" });
        }
    }
};

/**
 * Controller to validate a user account using a token
 * @param req - Express request object
 * @param res - Express response object
 */
export const validateUserController = async (req: Request, res: Response) => {
    const { token } = req.params;

    try {
        const { user, message } = await validateUserService(token);
        res.status(200).json({ user, message: message ?? "Account validated successfully" });
    } catch (error: any) {
        // Handle specific errors from the service
        if (error.message === "USER_NOT_FOUND") {
            logger.error('Error validateUserController: Not found user')
            res.status(404).json({ message: "User not found" });
        }
        else if (error.message === "USER_ALREADY_VALIDATED") {
            logger.error('Error validateUserController: User is already validated')
            res.status(400).json({ message: "User is already validated" });
        }
        else if (error.message === "INVALID_TOKEN") {
            logger.error('Error validateUserController: Invalid or expired token')
            res.status(400).json({ message: "Invalid or expired token" });
        }
        else {
            // Handle unexpected errors
            logger.error(`Error validateUserController: ${error}`)
            res.status(500).json({ message: "Server error, please try again later" });
        }
    }
};

/**
 * Controller to change user password
 * @param req - Express request object
 * @param res - Express response object
 */
export const changePasswordController = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const { currentPassword, newPassword } = req.body;

    if (!userId || !currentPassword || !newPassword) {
        logger.warn("Missing required fields for password change");
        res.status(400).json({ message: "Missing required fields" });
        return;
    }

    try {
        const result = await changePasswordService(userId, currentPassword, newPassword);
        res.status(200).json(result);
    } catch (error: any) {
        if (error.message === "USER_NOT_FOUND") {
            logger.error("User not found in changePasswordController");
            res.status(404).json({ message: "User not found" });
        } else if (error.message === "INVALID_CURRENT_PASSWORD") {
            logger.warn("Invalid current password in changePasswordController");
            res.status(401).json({ message: "Current password is incorrect" });
        } else {
            logger.error(`Unexpected error in changePasswordController: ${error}`);
            res.status(500).json({ message: "Server error, please try again later" });
        }
    }
};