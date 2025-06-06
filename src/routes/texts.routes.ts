import { Router } from "express";
import { createTextController, deleteTextController, getAllTextsController, getTextController, updateTextController } from "../controllers/texts.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/roles.middleware";

const router = Router();

// Routes for texts CRUD operations
router.get("/", authenticateJWT, authorizeRoles('admin'), getAllTextsController);
router.get("/:key/:lang", getTextController);
router.post("/", authenticateJWT, authorizeRoles('admin'), createTextController);
router.put("/", authenticateJWT, authorizeRoles('admin'), updateTextController);
router.delete("/:key", authenticateJWT, authorizeRoles('admin'), deleteTextController);

export { router as routerText};