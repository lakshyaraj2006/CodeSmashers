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


export const CategoryController = { getAllCategories, getCategoryById };
