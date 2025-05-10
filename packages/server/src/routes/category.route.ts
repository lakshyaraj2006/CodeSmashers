import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";

const router = Router();

router.get('/', CategoryController.getAllCategories);
router.post('/create', CategoryController.createCategory);
router.get('/:id', CategoryController.getCategoryById);
router.patch('/:id/update', CategoryController.updateCategory);

export {router as CategoryRouter};