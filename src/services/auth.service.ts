import { sendValidationEmail } from "../config/mail";
import { IUser } from "../interfaces/user.interface";
import UserModel from "../models/user.model";
import { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken } from "../utils/jwt.utils";


/**
 * Register a new user
 * @param userData - Contains user data from request body
 * @returns New user data or error message
 */
export const registerUserService = async (userData: Partial<IUser>) => {
    const { username, email, password, ...otherData } = userData;

    // Check if the username or email already exists
    const existingUser = await UserModel.findOne({ $or: [{ username }] });
    if (existingUser) throw new Error("ALREADY USER");

    // Hash the password automatically in the User model, so no need to hash it here
    const newUser = new UserModel({
        username,
        email,
        password,
        ...otherData,
    });

    await newUser.save();

    const token = generateAccessToken(newUser._id.toString(), newUser.role);
    await sendValidationEmail(newUser.email, token);

    return newUser;
};

/**
 * Login user
 * @param username - Username from request
 * @param password - Password from request
 * @returns JWT tokens (access & refresh) or error message
 */
export const loginUserService = async (username: string, password: string) => {
    const user = await UserModel.findOne({ username });

    if (!user) throw new Error("NOT USER");

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error("INVALID PASS");

    // Generate JWT tokens
    const accessToken = generateAccessToken(user._id.toString(), user.role);
    const refreshToken = generateRefreshToken(user._id.toString());

    await user.save();

    return { accessToken, refreshToken, user };
};

/**
 * Refresh access token using a valid refresh token
 * @param refreshToken - The refresh token provided by the client
 * @returns New access token or error message
 */
export const refreshTokenService = async (refreshToken: string) => {
    if (!refreshToken) throw new Error("REFRESH_TOKEN_REQUIRED");

    const decoded = verifyRefreshToken(refreshToken);
    
    if (!decoded || typeof decoded === "string" || !("id" in decoded)) {
        throw new Error("INVALID_REFRESH_TOKEN");
    }

    const user = await UserModel.findById(decoded.id);

    if (!user) {
        throw new Error("NOT_FOUND_USER");
    }

    // Generate new access token
    const newAccessToken = generateAccessToken(user._id.toString(), user.role);
    const newRefreshToken = generateRefreshToken(user._id.toString());

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

/**
 * Validate a user's account based on a token
 * @param token - The JWT token from the validation link
 * @returns Updated user data or an error message
 */
export const validateUserService = async (token: string): Promise<IUser> => {
    // Verify and decode the token using the utility function
    const decoded = verifyAccessToken(token);

    if (!decoded || typeof decoded === "string" || !("id" in decoded)) {
        throw new Error("INVALID_TOKEN");
    }

    const userId = decoded.id;

    // Find the user in the database
    const user = await UserModel.findById(userId);
    if (!user) throw new Error("USER_NOT_FOUND");
    if (user.validated) throw new Error("USER_ALREADY_VALIDATED");

    // Update the user's validation status
    user.validated = true;
    await user.save();

    return user;
};