import { Request, Response } from "express";
import { createText, deleteText, getAllTexts, getText, updateText } from "../services/texts.service";
import logger from "../config/logger";

/**
 * Controller to get a text by key and language
 */
export const getTextController = async (req: Request, res: Response) => {
    try {
        const { key, lang } = req.params;
        const text = await getText(key, lang);
        if (!text) {
            logger.error(`Error getTextController: Text not found`)
            res.status(404).json({ message: "Text not found" });
            return;
        }
        logger.info(`Fetched text successfully: Key ${key}, Language ${lang}`);
        res.json({ value: text });
    } catch (error) {
        logger.error(`Error getTextController: ${error}`)
        res.status(500).json({ message: "Server error, please try again later" });
    }
};

/**
 * Controller to create a new text
 */
export const createTextController = async (req: Request, res: Response) => {
    try {
        const newText = req.body;
        const createdText = await createText(newText);
        logger.warn(`Text created successfully: Key ${createdText.key}`);
        res.status(201).json(createdText);
    } catch (error: any) {
        if (error.code == 11000) {
            logger.error(`Error createTextController: Duplicated key`)
            res.status(400).json({ message: "Duplicated key" });
        } else {
            logger.error(`Error createTextController: ${error}`)
            res.status(500).json({ message: "Server error, please try again later" });
        }
    }
};

/**
 * Controller to update a text in a specific language
 */
export const updateTextController = async (req: Request, res: Response) => {
    try {
        const { key, value } = req.body;

        if (!key || !value) {
            logger.error(`Error updateTextController: Key and value are required`)
            res.status(400).json({ message: "Key and value are required" });
            return;
        }
        const updatedText = await updateText(key, value);

        if (!updatedText) {
            logger.error(`Error updateTextController: Text not found`)
            res.status(404).json({ message: "Text not found" });
            return;
        }

        logger.warn(`Text updated successfully: Key ${key}`);

        res.json(updatedText);
    } catch (error) {
        logger.error(`Error updateTextController: ${error}`)
        res.status(500).json({ message: "Server error, please try again later" });
    }
};

/**
 * Controller to get all texts
 */
export const getAllTextsController = async (req: Request, res: Response) => {
    try {
        const texts = await getAllTexts();
        logger.info(`Fetched all texts successfully`);
        res.json(texts);
    } catch (error) {
        logger.error(`Error getAllTextsController: ${error}`)
        res.status(500).json({ message: "Server error, please try again later" });
    }
};

/**
 * Controller to delete a text by key
 */
export const deleteTextController = async (req: Request, res: Response) => {
    try {
        const { key } = req.params;
        const deletedText = await deleteText(key);
        if (!deletedText) {
            logger.error(`Error deleteTextController: Text not found`)
            res.status(404).json({ message: "Text not found" });
            return;
        }
        logger.warn(`Text deleted successfully: Key ${key}, TEXT ${deletedText}`);
        res.json({ message: "Text deleted successfully" });
    } catch (error) {
        logger.error(`Error deleteTextController: ${error}`)
        res.status(500).json({ message: "Server error, please try again later" });
    }
};