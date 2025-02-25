import { Text } from "../interfaces/text.interface";
import { TextModel } from "../models/text.model";


/**
 * Get a text by key and language
 * @param key - Text key
 * @param lang - Language code (ca, es, en_US)
 */
export const getText = async (key: string, lang: string): Promise<string | null> => {
    const text = await TextModel.findOne({ key });

    if (!text) return null;

    return text.value[lang as keyof Text["value"]] || text.value["es"];
};

/**
 * Create a new text
 */
export const createText = async (newText: Text): Promise<Text> => {
    return await TextModel.create(newText);
};

/**
 * Update a text in a specific language
 * @param key - Text key
 * @param lang - Language code (ca, es, en_US)
 * @param value - New text value
 */
export const updateText = async (key: string, lang: string, value: string): Promise<Text | null> => {
    return await TextModel.findOneAndUpdate(
        { key },
        { $set: { [`value.${lang}`]: value } },
        { new: true, upsert: true }
    );
};

/**
 * Get all texts
 */
export const getAllTexts = async (): Promise<Text[]> => {
    return await TextModel.find();
};

/**
 * Delete a text by key
 */
export const deleteText = async (key: string): Promise<Text | null> => {
    return await TextModel.findOneAndDelete({ key });
};