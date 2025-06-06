import { Request, Response, NextFunction } from "express";

process.loadEnvFile();

interface AuthRequest extends Request {
    user?: any;
}

// Only allows admins to perform certain actions
export const authorizeRoles = (...allowedRoles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        const roles: string[] = req.user?.roles || [];

        const hasRole = roles.some(role => allowedRoles.includes(role));
        if (!hasRole) {
            res.status(403).json({ message: "Access denied. Insufficient permissions." });
            return;
        }

        next();
    };
};