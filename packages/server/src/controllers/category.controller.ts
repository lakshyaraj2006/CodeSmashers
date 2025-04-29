import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { CategoryModel } from "../models/category.model";

const getAllCategories = asyncHandler(
    async (req: Request, res: Response) => {
        const categories = await CategoryModel.find();

        res.status(200).json(categories);
    }
)

const getCategoryById = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const category = await CategoryModel.findById(id);

        res.status(200).json(category);
    }
)

const createCategory = asyncHandler(
    async (req: Request, res: Response) => {
        const { name } = req.params;
        let success = false;

        try {
            const newCategory = new CategoryModel({ name });
            await newCategory.save()
            success = true;

            res.status(201).json({
                success,
                message: 'Category created!',
                category: newCategory
            })
        } catch (error) {
            res.status(500).json({
                success,
                message: 'Some error occurred!'
            })
        }
    }
)

export const CategoryController = { getAllCategories, getCategoryById, createCategory };
