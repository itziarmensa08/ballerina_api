import { Request, Response } from "express";
import { registerVisit, getVisits } from "../services/visits.service";
import logger from "../config/logger";

/**
 * Register a visit (increments today's counter)
 */
export const registerVisitController = async (req: Request, res: Response) => {
  try {
    await registerVisit(req.visitorId ?? "");
    logger.info("Visit registered successfully");
    res.status(201).json({ message: "Visit registered" });
  } catch (error) {
    logger.error(`Error registerVisitController: ${error}`);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

/**
 * Get all visits
 */
export const getVisitsController = async (req: Request, res: Response) => {
  try {
    const visits = await getVisits();
    logger.info("Fetched all visits successfully");
    res.status(200).json(visits);
  } catch (error) {
    logger.error(`Error getVisitsController: ${error}`);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};
