import { Router } from "express";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { authorizeAdmin } from "../middlewares/admin.middleware";
import { createImageController, deleteImageController, getAllImagesController, getImageController, updateImageController } from "../controllers/images.controller";

const router = Router();

// Routes for texts CRUD operations
router.get("/", authenticateJWT, authorizeAdmin, getAllImagesController);
router.get("/:id", authenticateJWT, authorizeAdmin, getImageController);
router.post("/", authenticateJWT, authorizeAdmin, createImageController);
router.put("/:id", authenticateJWT, authorizeAdmin, updateImageController);
router.delete("/:key", authenticateJWT, authorizeAdmin, deleteImageController);

export { router as routerImages};