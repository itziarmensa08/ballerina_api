import { Router } from "express";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { authorizeAdmin } from "../middlewares/admin.middleware";
import { chnageLangByIdController, deleteUserByIdController, getAllUsersController, getUserByIdController, updateUserByIdController } from "../controllers/users.controller";

const router = Router();

// Routes for user CRUD operations
router.get("/", authenticateJWT, authorizeAdmin, getAllUsersController);
router.get("/:id", authenticateJWT, authorizeAdmin, getUserByIdController);
router.put("/:id", authenticateJWT, authorizeAdmin, updateUserByIdController);
router.put("/:id/:lang", chnageLangByIdController);
router.delete("/:id", authenticateJWT, authorizeAdmin, deleteUserByIdController);

export { router as routerUser};