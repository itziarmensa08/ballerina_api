import { Router } from "express";
import { changePasswordController, loginController, refreshTokenController, registerController, validateUserController } from "../controllers/auth.controller";

const router = Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.post("/refresh", refreshTokenController);

router.patch("/validate/:token", validateUserController);

router.put("/changePassword/:id", changePasswordController);

export { router as routerAuth };