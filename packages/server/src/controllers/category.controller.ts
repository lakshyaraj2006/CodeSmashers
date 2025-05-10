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
        const { name, tagline } = req.body;
        let success = false;

        try {
            const newCategory = new CategoryModel({ name, tagline });
            await newCategory.save()
            success = true;

            res.status(201).json({
                success,
                message: 'Category created!'
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success,
                message: 'Some error occurred!'
            })
        }
    }
)

const updateCategory = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const { name, tagline } = req.body;
        let success = false;

        if (!name) {
            res.status(400).json({
                success,
                message: "Name is required!"
            })
        } else {
            const category = await CategoryModel.findByIdAndUpdate(id, {
                $set: { name, tagline }
            });
            success = true;

            res.status(400).json({
                success,
                message: "Category updated successfully!"
            })
        }
    }
)

export const CategoryController = { getAllCategories, getCategoryById, createCategory, updateCategory };
