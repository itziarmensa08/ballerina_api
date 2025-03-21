import { Router } from "express";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { authorizeAdmin } from "../middlewares/admin.middleware";
import { createExhibitionController, deleteExhibitionController, getAllExhibitionsController, getExhibitionController, updateExhibitionController } from "../controllers/exhibitions.controller";
import multer from "multer";

const router = Router();
const upload = multer();

// Routes for texts CRUD operations
router.get("/", getAllExhibitionsController);
router.get("/:id", authenticateJWT, authorizeAdmin, getExhibitionController);
router.post("/", authenticateJWT, authorizeAdmin, upload.array('files', 10), createExhibitionController);
router.put("/:id", authenticateJWT, authorizeAdmin, upload.array('files', 10), updateExhibitionController);
router.delete("/:id", authenticateJWT, authorizeAdmin, deleteExhibitionController);

export { router as routerExhibitions};