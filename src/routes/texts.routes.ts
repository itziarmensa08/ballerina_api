import { Router } from "express";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { authorizeAdmin } from "../middlewares/admin.middleware";
import { createTextController, deleteTextController, getAllTextsController, getTextController, updateTextController } from "../controllers/texts.controller";

const router = Router();

// Routes for texts CRUD operations
router.get("/", getAllTextsController);
router.get("/:key/:lang", getTextController);
router.post("/", createTextController);
router.put("/", authenticateJWT, authorizeAdmin, updateTextController);
router.delete("/:key", authenticateJWT, authorizeAdmin, deleteTextController);

export { router as routerText};