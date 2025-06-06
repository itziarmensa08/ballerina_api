import { Router } from "express";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/roles.middleware";
import { createImageController, deleteImageController, getAllImagesController, getImageByKeyController, getImageController, updateImageController } from "../controllers/images.controller";
import multer from "multer";

const router = Router();
const upload = multer();

// Routes for texts CRUD operations
router.get("/", authenticateJWT, authorizeRoles('admin'), getAllImagesController);
router.get("/:id", authenticateJWT, authorizeRoles('admin'), getImageController);
router.get("/key/:key", getImageByKeyController);
router.post("/", authenticateJWT, authorizeRoles('admin'), upload.single("image"), createImageController);
router.put("/:id", authenticateJWT, authorizeRoles('admin'), upload.single("image"), updateImageController);
router.delete("/:id", authenticateJWT, authorizeRoles('admin'), deleteImageController);

export { router as routerImages};