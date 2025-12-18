import { v4 as uuidv4 } from "uuid";
import { Request, Response, NextFunction } from "express";

export const visitorMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.cookies?.visitorId) {
    const visitorId = uuidv4();

    res.cookie("visitorId", visitorId, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });

    req.visitorId = visitorId;
  } else {
    req.visitorId = req.cookies.visitorId;
  }

  next();
};