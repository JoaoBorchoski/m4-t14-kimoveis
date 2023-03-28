import { verifyToken } from "./../middlewares/verifyToken.middlewares";
import { createCategorySchema } from "./../schemas/category.schemas";
import { verifyData } from "./../middlewares/verifyData.middlewares";
import { verifyPermission } from "./../middlewares/veryfyPermission.middlewares";
import {
    createCategoryController,
    retriveCategoriesController,
    retriveEstatesByCategoryController,
} from "./../controllers/categories.controllers";
import { Router } from "express";

export const categoriesRouter: Router = Router();

categoriesRouter.post(
    "",
    verifyToken,
    verifyPermission,
    verifyData(createCategorySchema),
    createCategoryController
);
categoriesRouter.get("", retriveCategoriesController);
categoriesRouter.get("/:id/realEstate", retriveEstatesByCategoryController);
