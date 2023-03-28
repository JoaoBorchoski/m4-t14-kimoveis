import { Category } from "./../../entities/categories.entities";
import { AppDataSource } from "./../../data-source";
import { ICategoryRepo } from "../../interfaces";

export const retriverCategoriesServices = async () => {
    const categoryRepo: ICategoryRepo = AppDataSource.getRepository(Category);

    return categoryRepo.find();
};
