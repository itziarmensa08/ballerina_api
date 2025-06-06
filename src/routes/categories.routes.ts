import { Router } from "express";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/roles.middleware";
import multer from "multer";
import { createCategoryController, deleteCategoryController, getAllCategoriesController, getCategorieByTypeController, getCategoryController, updateCategoryController } from "../controllers/categories.controller";

const router = Router();
const upload = multer();

// Routes for texts CRUD operations
router.get("/", getAllCategoriesController);
router.get("/type/:type", getCategorieByTypeController);
router.get("/:id", authenticateJWT, authorizeRoles('admin'), getCategoryController);
router.post("/", authenticateJWT, authorizeRoles('admin'), upload.array('files', 10), createCategoryController);
router.put("/:id", authenticateJWT, authorizeRoles('admin'), upload.array('files', 10), updateCategoryController);
router.delete("/:id", authenticateJWT, authorizeRoles('admin'), deleteCategoryController);

export { router as routerCategories};