import logger from "../config/logger";
import { IVisit } from "../interfaces/visit.interface";
import { VisitModel } from "../models/visit.model";

/**
 * Increment today's visit count or create if it doesn't exist.
 */
export const registerVisit = async (visitorId: string): Promise<void> => {
  const today = new Date().toISOString().split("T")[0];
  const visit = await VisitModel.findOne({ date: today });

  if (!visit) {
    logger.info(`No visit found for today: ${today}. Creating new record.`);
    await VisitModel.create({
      date: today,
      count: 1,
      visitors: [visitorId],
    });
    return;
  }

  logger.info(`Existing visit found for today: ${today}`);

  if (!visit.visitors) {
    visit.visitors = [];
  }

  if (!visit.visitors.includes(visitorId)) {
    logger.info(`New visitor for today: ${visitorId}. Incrementing count.`);
    visit.count += 1;
    visit.visitors.push(visitorId);
    await visit.save();
  } else {
    logger.info(`Visitor ${visitorId} has already been counted today.`);
  }
};

/**
 * Get all visits sorted by date ascending.
 */
export const getVisits = async (): Promise<IVisit[]> => {
  return await VisitModel.find().sort({ date: 1 });
};
