import { model, Schema } from "mongoose";
import { IVisit } from "../interfaces/visit.interface";

const VisitSchema = new Schema<IVisit>({
  date: { type: String, required: true, unique: true },
  count: { type: Number, default: 1 }
});

export const VisitModel = model<IVisit>("visits", VisitSchema);