import { Router } from "express";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { authorizeAdmin } from "../middlewares/admin.middleware";
import { getAllTextsController, getTextController, updateTextController } from "../controllers/texts.controller";

const router = Router();

// Routes for texts CRUD operations
router.get("/", authenticateJWT, authorizeAdmin, getAllTextsController);
router.get("/:key/:lang", authenticateJWT, authorizeAdmin, getTextController);
router.put("/", updateTextController);

export { router as routerText};