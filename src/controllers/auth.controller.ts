import { Request, Response } from "express";
import { registerUserService, loginUserService, validateUserService, refreshTokenService } from "../services/auth.service";

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
            res.status(409).json({ message: "Username or email already exists" });
        } else {
            // Handle any other unexpected errors
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
            res.status(404).json({ message: "User not found with this username" });
        }
        else if (error.message === "INVALID PASS") {
            res.status(401).json({ message: "Invalid password" });
        }
        else {
            // Handle any other unexpected errors
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
            res.status(400).json({ message: "Refresh token is required" });
        } else if (error.message === "INVALID_REFRESH_TOKEN") {
            res.status(403).json({ message: "Invalid or expired refresh token" });
        } else if (error.message === "NOT_FOUND_USER") {
            res.status(404).json({ message: "Not found user" });
        } else {
            // Handle any other unexpected errors
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
        await validateUserService(token);
        res.status(200).json({ message: "Account validated successfully" });
    } catch (error: any) {
        // Handle specific errors from the service
        if (error.message === "USER_NOT_FOUND") {
            res.status(404).json({ message: "User not found" });
        }
        else if (error.message === "USER_ALREADY_VALIDATED") {
            res.status(400).json({ message: "User is already validated" });
        }
        else if (error.message === "INVALID_TOKEN") {
            res.status(400).json({ message: "Invalid or expired token" });
        }
        else {
            // Handle unexpected errors
            res.status(500).json({ message: "Server error, please try again later" });
        }
    }
};