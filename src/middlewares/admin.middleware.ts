import { Request, Response, NextFunction } from "express";

process.loadEnvFile();

interface AuthRequest extends Request {
    user?: any;
}

// Only allows admins to perform certain actions
export const authorizeAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    console.log(req.user)
    if (req.user?.role !== "admin") {
        res.status(403).json({ message: "Access denied. Admins only." });
    } else {
        next();
    }
};