import { Router } from "express";
import { CategoryController } from "../controllers/category.controller.js";

const router = Router();
const controller = new CategoryController();

router
  .post("/", controller.createCategory)
  .get("/", controller.getAllCategories)
  .get("/:id", controller.getCategoryById)
  .put("/:id", controller.updateCategoryById)
  .delete("/:id", controller.deleteCategoryById);
export default router;
