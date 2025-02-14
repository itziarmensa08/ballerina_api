import { Router } from "express";
import { loginController, refreshTokenController, registerController, validateUserController } from "../controllers/auth.controller";

const router = Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.post("/refresh", refreshTokenController);

router.patch("/validate/:token", validateUserController);

export { router as routerAuth };