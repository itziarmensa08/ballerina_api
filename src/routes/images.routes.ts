import { Router } from "express";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { authorizeAdmin } from "../middlewares/admin.middleware";
import { createImageController, deleteImageController, getAllImagesController, getImageByKeyController, getImageController, updateImageController } from "../controllers/images.controller";
import multer from "multer";

const router = Router();
const upload = multer();

// Routes for texts CRUD operations
router.get("/", authenticateJWT, authorizeAdmin, getAllImagesController);
router.get("/:id", authenticateJWT, authorizeAdmin, getImageController);
router.get("/key/:key", getImageByKeyController);
router.post("/", authenticateJWT, authorizeAdmin, upload.single("image"), createImageController);
router.put("/:id", authenticateJWT, authorizeAdmin, upload.single("image"), updateImageController);
router.delete("/:id", authenticateJWT, authorizeAdmin, deleteImageController);

export { router as routerImages};