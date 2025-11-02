import { Router } from "express";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/roles.middleware";
import { chnageLangByIdController, deleteUserByIdController, getAdminsController, getAllUsersController, getGimnastsController, getUserByIdController, getUsersController, getUsersCountByRoleController, updateUserByIdController } from "../controllers/users.controller";

const router = Router();

// Routes for user CRUD operations
router.get("/", authenticateJWT, authorizeRoles('admin'), getAllUsersController);
router.get("/count-by-role", authenticateJWT, authorizeRoles('admin'), getUsersCountByRoleController);
router.get("/admins", authenticateJWT, authorizeRoles('admin'), getAdminsController);
router.get("/users", authenticateJWT, authorizeRoles('admin'), getUsersController);
router.get("/gimnasts", authenticateJWT, authorizeRoles('admin'), getGimnastsController);

router.get("/:id", authenticateJWT, authorizeRoles('admin'), getUserByIdController);

router.put("/:id", authenticateJWT, updateUserByIdController);

router.put("/:id/:lang", chnageLangByIdController);

router.delete("/:id", authenticateJWT, deleteUserByIdController);

export { router as routerUser};