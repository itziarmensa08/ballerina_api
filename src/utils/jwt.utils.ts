import { sign, verify, JwtPayload } from "jsonwebtoken";
import logger from "../config/logger";

const JWT_SECRET = process.env.JWT_SECRET || "token.0101";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "refresh.0202";

/**
 * Generate an access token
 * @param id - User ID
 * @param role - User role
 * @returns Signed JWT access token
 */
const generateAccessToken = (id: string, role: string): string => {
    return sign({ id, role }, JWT_SECRET, { expiresIn: "1h" }); // Access token expires in 1 hour
};

/**
 * Generate a refresh token
 * @param id - User ID
 * @returns Signed JWT refresh token
 */
const generateRefreshToken = (id: string): string => {
    return sign({ id }, REFRESH_SECRET, { expiresIn: "7d" }); // Refresh token expires in 7 days
};

/**
 * Verify an access token
 * @param token - JWT token to verify
 * @returns Decoded payload or null if invalid
 */
const verifyAccessToken = (token: string): JwtPayload | null => {
    try {
        return verify(token, JWT_SECRET) as JwtPayload;
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
const verifyRefreshToken = (token: string): JwtPayload | null => {
    try {
        return verify(token, REFRESH_SECRET) as JwtPayload;
    } catch (error) {
        logger.error("Refresh token verification failed:", error);
        return null;
    }
};

export { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken };