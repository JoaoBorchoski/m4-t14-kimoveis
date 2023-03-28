import { Category } from "../../entities";
import { ICategoryRepo } from "../../interfaces";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";

export const createCategoryService = async (userData: any) => {
    const categoryRepo: ICategoryRepo = AppDataSource.getRepository(Category);

    if (await categoryRepo.exist({ where: { name: userData.name } })) {
        throw new AppError("Category already exists", 409);
    }

    const category = categoryRepo.create(userData);
    await categoryRepo.save(category);

    return category;
};
