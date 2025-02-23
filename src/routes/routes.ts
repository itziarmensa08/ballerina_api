import logger from "../config/logger";
import { Router } from "express";
import { routerAuth } from "./auth.routes";
import { routerUser } from "./users.routes";
import { routerText } from "./texts.routes";

const router = Router();

router.use('/auth', routerAuth);
logger.info("Route initialized: /auth");

router.use('/users', routerUser);
logger.info("Route initialized: /users");

router.use('/texts', routerText);
logger.info("Route initialized: /users");

export default router;