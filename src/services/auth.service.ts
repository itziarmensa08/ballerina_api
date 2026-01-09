import { IUser } from "../interfaces/user.interface";
import UserModel from "../models/user.model";
import { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken } from "../utils/jwt.utils";
import path from 'path';
import fs from 'fs';
import { transporter } from "../config/mail";
import { CreateUserDTO, LoginDTO } from "../dtos/user.dto";

const formatDate = (date: any) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('ca-ES', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
};

/**
 * Register a new user
 * @param userData - Contains user data from request body
 * @returns New user data or error message
 */
export const registerUserService = async (userData: CreateUserDTO): Promise<IUser> => {
    const { username, email, password, language = 'ca', ...otherData } = userData;

    // Check if the username or email already exists
    const existingUser = await UserModel.findOne({ $or: [{ username }] });
    if (existingUser) throw new Error("ALREADY USER");

    const allowedRoles = [...(otherData.roles || [])]
    .filter(role => role !== 'admin');

    delete otherData.roles;

    // Hash the password automatically in the User model, so no need to hash it here
    const newUser = new UserModel({
        username,
        email,
        password,
        language,
        roles: allowedRoles,
        ...otherData,
    });

    await newUser.save();

    const token = generateAccessToken(newUser._id.toString(), newUser.roles);

    const validationLink = `${process.env.ORIGIN}/validate/${token}`;
    const templateFilename = `confirm-template.${language}.html`;
    const templatePath = path.join(__dirname, '..', 'config', 'templates', templateFilename);
    let html = fs.readFileSync(templatePath, 'utf8');

    html = html
        .replace(/{{validationLink}}/g, validationLink);

    /* await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: email,
        subject: `Validació del compte`,
        html
    }); */

    if (newUser.roles?.includes('gimnast')) {
        const templateFilename = `gimnast-register-template.html`;
        const templatePath = path.join(__dirname, '..', 'config', 'templates', templateFilename);
        let html = fs.readFileSync(templatePath, 'utf8');

        html = html
            .replace(/{{name}}/g, `${newUser.name} ${newUser.surname}`)
            .replace(/{{email}}/g, newUser.email)
            .replace(/{{dni}}/g, newUser.dni ?? '')
            .replace(/{{dateBorn}}/g, formatDate(newUser.dateBorn))
            .replace(/{{messageRow}}/g, '');

        await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to: process.env.CONTACT_TO,
            bcc: process.env.ALERT_EMAIL,
            subject: `Nova inscripció`,
            html
        });
    }

    return newUser;
};

/**
 * Login user
 * @param username - Username from request
 * @param password - Password from request
 * @returns JWT tokens (access & refresh) or error message
 */
export const loginUserService = async (userData: LoginDTO): Promise<{
    accessToken: string;
    refreshToken: string;
    user: IUser;
}> => {
    const username = userData.username;
    const password = userData.password;
    const user = await UserModel.findOne({ username });

    if (!user) throw new Error("NOT USER");

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error("INVALID PASS");

    // Generate JWT tokens
    const accessToken = generateAccessToken(user._id.toString(), user.roles);
    const refreshToken = generateRefreshToken(user._id.toString());

    await user.save();

    return { accessToken: accessToken ?? '', refreshToken: refreshToken ?? '', user };
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
    const newAccessToken = generateAccessToken(user._id.toString(), user.roles);
    const newRefreshToken = generateRefreshToken(user._id.toString());

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

/**
 * Validate a user's account based on a token
 * @param token - The JWT token from the validation link
 * @returns Updated user data or an error message
 */
export const validateUserService = async (token: string): Promise<{ user: IUser; message?: string }>=> {
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

    const isTemporal = await user.comparePassword('temporal');
    const message = isTemporal ? 'PASSWORD_TEMPORAL' : undefined;

    return { user, message };
};

/**
 * Change user password
 * @param userId - ID of the authenticated user
 * @param currentPassword - Current password of the user
 * @param newPassword - New password to set
 * @returns Success message or error
 */
export const changePasswordService = async (userId: string, currentPassword: string, newPassword: string) => {
    const user = await UserModel.findById(userId);
    if (!user) throw new Error("USER_NOT_FOUND");
  
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) throw new Error("INVALID_CURRENT_PASSWORD");
  
    user.password = newPassword;
    await user.save();
  
    return { message: "PASSWORD_UPDATED_SUCCESSFULLY" };
};
  