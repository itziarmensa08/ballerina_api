import mongoose from "mongoose";
import { Text } from "../interfaces/text.interface";

const textSchema = new mongoose.Schema<Text>({
    key: { type: String, required: true, unique: true },
    value: {
      ca: { type: String, required: true },
      es: { type: String, required: true },
      en_US: { type: String, required: true },
    },
  });
  
  export const TextModel = mongoose.model<Text>("texts", textSchema);