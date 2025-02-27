import { Router } from "express";
import { createTextController, deleteTextController, getAllTextsController, getTextController, updateTextController } from "../controllers/texts.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { authorizeAdmin } from "../middlewares/admin.middleware";

const router = Router();

// Routes for texts CRUD operations
router.get("/", authenticateJWT, authorizeAdmin, getAllTextsController);
router.get("/:key/:lang", getTextController);
router.post("/", authenticateJWT, authorizeAdmin, createTextController);
router.put("/", authenticateJWT, authorizeAdmin, updateTextController);
router.delete("/:key", authenticateJWT, authorizeAdmin, deleteTextController);

export { router as routerText};