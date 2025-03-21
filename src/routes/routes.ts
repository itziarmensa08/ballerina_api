import logger from "../config/logger";
import { Router } from "express";
import { routerAuth } from "./auth.routes";
import { routerUser } from "./users.routes";
import { routerText } from "./texts.routes";
import { routerImages } from "./images.routes";
import { routerCompetitions } from "./competitions.routes";
import { routerExhibitions } from "./exhibitions.routes";

const router = Router();

router.use('/auth', routerAuth);
logger.info("Route initialized: /auth");

router.use('/users', routerUser);
logger.info("Route initialized: /users");

router.use('/texts', routerText);
logger.info("Route initialized: /texts");

router.use('/images', routerImages);
logger.info("Route initialized: /images");

router.use('/competitions', routerCompetitions);
logger.info("Route initialized: /competitions");

router.use('/exhibitions', routerExhibitions);
logger.info("Route initialized: /exhibitions");

export default router;