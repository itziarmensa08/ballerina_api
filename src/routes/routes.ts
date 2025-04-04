import logger from "../config/logger";
import { Router } from "express";
import { routerAuth } from "./auth.routes";
import { routerUser } from "./users.routes";
import { routerText } from "./texts.routes";
import { routerImages } from "./images.routes";
import { routerCategories } from "./categories.routes";
import { routerContact } from "./contact.routes";
import { routerTry } from "./try.routes";

const router = Router();

router.use('/auth', routerAuth);
logger.info("Route initialized: /auth");

router.use('/users', routerUser);
logger.info("Route initialized: /users");

router.use('/texts', routerText);
logger.info("Route initialized: /texts");

router.use('/images', routerImages);
logger.info("Route initialized: /images");

router.use('/categories', routerCategories);
logger.info("Route initialized: /categories");

router.use('/contact', routerContact);
logger.info("Route initialized: /contact");

router.use('/try', routerTry);
logger.info("Route initialized: /try");

export default router;