import { Router } from "express";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { authorizeAdmin } from "../middlewares/admin.middleware";
import multer from "multer";
import { createCategoryController, deleteCategoryController, getAllCategoriesController, getCategorieByTypeController, getCategoryController, updateCategoryController } from "../controllers/categories.controller";

const router = Router();
const upload = multer();

// Routes for texts CRUD operations
router.get("/", getAllCategoriesController);
router.get("/type/:type", getCategorieByTypeController);
router.get("/:id", authenticateJWT, authorizeAdmin, getCategoryController);
router.post("/", authenticateJWT, authorizeAdmin, upload.array('files', 10), createCategoryController);
router.put("/:id", authenticateJWT, authorizeAdmin, upload.array('files', 10), updateCategoryController);
router.delete("/:id", authenticateJWT, authorizeAdmin, deleteCategoryController);

export { router as routerCategories};