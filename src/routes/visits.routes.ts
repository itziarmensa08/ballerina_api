import { Router } from "express";
import { registerVisitController, getVisitsController } from "../controllers/visits.controller";

const router = Router();

router.post("/", registerVisitController);
router.get("/", getVisitsController);

export { router as visitsRouter};