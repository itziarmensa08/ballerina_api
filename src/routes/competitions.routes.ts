import { Router } from "express";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { authorizeAdmin } from "../middlewares/admin.middleware";
import { createCompetitionController, deleteCompetitionController, getAllCompetitionsController, getCompetitionController, updateCompetitionController } from "../controllers/competitions.controller";
import multer from "multer";

const router = Router();
const upload = multer();

// Routes for texts CRUD operations
router.get("/", getAllCompetitionsController);
router.get("/:id", authenticateJWT, authorizeAdmin, getCompetitionController);
router.post("/", authenticateJWT, authorizeAdmin, upload.array('images', 10), createCompetitionController);
router.put("/:id", authenticateJWT, authorizeAdmin, upload.array('images', 10), updateCompetitionController);
router.delete("/:id", authenticateJWT, authorizeAdmin, deleteCompetitionController);

export { router as routerCompetitions};