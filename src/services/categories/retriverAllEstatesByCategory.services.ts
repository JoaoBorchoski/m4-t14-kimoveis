import { returnManyEstatesByCategory } from "./../../schemas/category.schemas";
import { AppError } from "./../../errors";
import { Category, RealEstate } from "./../../entities";
import { AppDataSource } from "./../../data-source";
export const retriverEstatesByCategoryService = async (id: number) => {
    const categoriesRepo = AppDataSource.getRepository(Category);
    const categoty = await categoriesRepo.findOneBy({ id: id });
    const categoryId = categoty?.id;

    if (!categoty) {
        throw new AppError("Category not found", 404);
    }

    const values = await AppDataSource.getRepository(RealEstate)
        .createQueryBuilder("realEstate")
        .leftJoinAndSelect("realEstate.category", "category")
        .where("realEstate.category = :categoryId", { categoryId })
        .select("realEstate")
        .getMany();

    const ret = {
        id: categoty.id,
        name: categoty.name,
        realEstate: values,
    };

    return ret;
};
