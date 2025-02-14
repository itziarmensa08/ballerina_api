import { Router } from "express";
import { routerAuth } from "./auth.routes";
import logger from "../config/logger";
import { routerUser } from "./users.routes";

const router = Router();

router.use('/auth', routerAuth);
logger.info("Route initialized: /auth");

router.use('/users', routerUser);
logger.info("Route initialized: /users");

export default router;