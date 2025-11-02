import { IVisit } from "../interfaces/visit.interface";
import { VisitModel } from "../models/visit.model";

/**
 * Increment today's visit count or create if it doesn't exist.
 */
export const registerVisit = async (): Promise<void> => {
  const today = new Date().toISOString().split("T")[0];
  const existingVisit = await VisitModel.findOne({ date: today });

  if (existingVisit) {
    existingVisit.count += 1;
    await existingVisit.save();
  } else {
    await VisitModel.create({ date: today, count: 1 });
  }
};

/**
 * Get all visits sorted by date ascending.
 */
export const getVisits = async (): Promise<IVisit[]> => {
  return await VisitModel.find().sort({ date: 1 });
};
