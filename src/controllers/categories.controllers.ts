import { retriverCategoriesServices } from "./../services/categories/retriverAllCategories.services";
import { createCategoryService } from "./../services/categories/createCategory.services";
import { Request, Response } from "express";
import { retriverEstatesByCategoryService } from "../services/categories/retriverAllEstatesByCategory.services";

export const createCategoryController = async (req: Request, res: Response) => {
    const category = await createCategoryService(req.body);

    return res.status(201).json(category);
};

export const retriveCategoriesController = async (
    req: Request,
    res: Response
) => {
    const category = await retriverCategoriesServices();

    return res.json(category);
};

export const retriveEstatesByCategoryController = async (
    req: Request,
    res: Response
) => {
    const estates = await retriverEstatesByCategoryService(+req.params.id);

    return res.json(estates);
};
