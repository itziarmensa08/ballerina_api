import { Router } from "express";
import { createTextController, deleteTextController, getAllTextsController, getTextController, updateTextController } from "../controllers/texts.controller";

const router = Router();

// Routes for texts CRUD operations
router.get("/", getAllTextsController);
router.get("/:key/:lang", getTextController);
router.post("/", createTextController);
router.put("/", updateTextController);
router.delete("/:key", deleteTextController);

export { router as routerText};