import { Router } from "express";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/roles.middleware";
import { chnageLangByIdController, deleteUserByIdController, getAllUsersController, getUserByIdController, updateUserByIdController } from "../controllers/users.controller";

const router = Router();

// Routes for user CRUD operations
router.get("/", authenticateJWT, authorizeRoles('admin'), getAllUsersController);
router.get("/:id", authenticateJWT, authorizeRoles('admin'), getUserByIdController);
router.put("/:id", authenticateJWT, updateUserByIdController);
router.put("/:id/:lang", chnageLangByIdController);
router.delete("/:id", authenticateJWT, deleteUserByIdController);

export { router as routerUser};