import { Router } from "express";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { authorizeAdmin } from "../middlewares/admin.middleware";
import { createCompetitionController, deleteCompetitionController, getAllCompetitionsController, getCompetitionController, updateCompetitionController } from "../controllers/competitions.controller";

const router = Router();

// Routes for texts CRUD operations
router.get("/", authenticateJWT, authorizeAdmin, getAllCompetitionsController);
router.get("/:id", getCompetitionController);
router.post("/", authenticateJWT, authorizeAdmin, createCompetitionController);
router.put("/:id", authenticateJWT, authorizeAdmin, updateCompetitionController);
router.delete("/:id", authenticateJWT, authorizeAdmin, deleteCompetitionController);

export { router as routerText};