import { Request, Response } from "express";
import { getAllTexts, getText, updateText } from "../services/texts.service";

/**
 * Controller to get a text by key and language
 */
export const getTextController = async (req: Request, res: Response) => {
    try {
        const { key, lang } = req.params;
        const text = await getText(key, lang);
        if (!text) res.status(404).json({ message: "Text not found" });
        res.json({ value: text });
    } catch (error) {
        res.status(500).json({ message: "Server error, please try again later" });
    }
};

/**
 * Controller to update a text in a specific language
 */
export const updateTextController = async (req: Request, res: Response) => {
    try {
        const { key, lang, value } = req.body;
        const updatedText = await updateText(key, lang, value);
        res.json(updatedText);
    } catch (error) {
        res.status(500).json({ message: "Server error, please try again later" });
    }
};

/**
 * Controller to get all texts
 */
export const getAllTextsController = async (req: Request, res: Response) => {
    try {
        const texts = await getAllTexts();
        res.json(texts);
    } catch (error) {
        res.status(500).json({ message: "Server error, please try again later" });
    }
};