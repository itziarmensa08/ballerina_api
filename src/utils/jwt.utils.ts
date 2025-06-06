import { sign, verify, JwtPayload } from "jsonwebtoken";
import logger from "../config/logger";
import { Role } from "../interfaces/user.interface";

process.loadEnvFile();

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

/**
 * Generate an access token
 * @param id - User ID
 * @param role - User role
 * @returns Signed JWT access token
 */
const generateAccessToken = (id: string, roles: Role[]): string | undefined => {
    if (JWT_SECRET) return sign({ id, roles }, JWT_SECRET, { expiresIn: "1h" }); // Access token expires in 1 hour
    else logger.error("JWT_SECRET not found");
};

/**
 * Generate a refresh token
 * @param id - User ID
 * @returns Signed JWT refresh token
 */
const generateRefreshToken = (id: string): string | undefined => {
    if (REFRESH_SECRET) return sign({ id }, REFRESH_SECRET, { expiresIn: "7d" }); // Refresh token expires in 7 days
    else logger.error("REFRESH_SECRET not found");
};

/**
 * Verify an access token
 * @param token - JWT token to verify
 * @returns Decoded payload or null if invalid
 */
const verifyAccessToken = (token: string): JwtPayload | null | undefined => {
    try {
        if (JWT_SECRET) return verify(token, JWT_SECRET) as JwtPayload;
        else logger.error("JWT_SECRET not found");
    } catch (error) {
        logger.error("Access token verification failed:", error);
        return null;
    }
};

/**
 * Verify a refresh token
 * @param token - JWT refresh token to verify
 * @returns Decoded payload or null if invalid
 */
const verifyRefreshToken = (token: string): JwtPayload | null | undefined => {
    try {
        if (REFRESH_SECRET) return verify(token, REFRESH_SECRET) as JwtPayload;
        else logger.error("REFRESH_SECRET not found");
    } catch (error) {
        logger.error("Refresh token verification failed:", error);
        return null;
    }
};

export { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken };