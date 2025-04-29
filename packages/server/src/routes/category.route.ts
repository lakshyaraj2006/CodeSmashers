import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";

const router = Router();

router.get('/', CategoryController.getAllCategories);
router.get('/:id', CategoryController.getCategoryById);
router.post('/create', CategoryController.createCategory);

export {router as CategoryRouter};