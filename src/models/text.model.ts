import mongoose from "mongoose";
import { Text } from "../interfaces/text.interface";

const textSchema = new mongoose.Schema<Text>(
  {
    key: { type: String, required: true, unique: true },
    value: {
      ca: { type: String, required: true },
      es: { type: String, required: true },
      en: { type: String, required: true },
    },
  }, {
    timestamps: true,
    versionKey: false
  }
);
  
export const TextModel = mongoose.model<Text>("texts", textSchema);