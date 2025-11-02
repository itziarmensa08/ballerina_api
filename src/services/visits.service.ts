import { IVisit } from "../interfaces/visit.interface";
import { VisitModel } from "../models/visit.model";
import { Request } from "express";

/**
 * Increment today's visit count or create if it doesn't exist.
 */
export const registerVisit = async (req: Request): Promise<void> => {
  const today = new Date().toISOString().split("T")[0];
  const ip = req.headers['x-forwarded-for']?.toString().split(',')[0] || req.socket.remoteAddress;

  const existingVisit = await VisitModel.findOne({ date: today });

  if (existingVisit) {
    if (ip && !existingVisit.uniqueIps.includes(ip)) {
        existingVisit.uniqueIps.push(ip);
        existingVisit.count += 1;
    }
    await existingVisit.save();
  } else {
    await VisitModel.create({ date: today, count: 1, uniqueIps: ip ? [ip] : [] });
  }
};

/**
 * Get all visits sorted by date ascending.
 */
export const getVisits = async (): Promise<IVisit[]> => {
  return await VisitModel.find().sort({ date: 1 });
};
