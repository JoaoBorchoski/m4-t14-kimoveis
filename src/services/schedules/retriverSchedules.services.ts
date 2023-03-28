import { Category } from "./../../entities/categories.entities";
import { Address, RealEstate, Schedule } from "./../../entities";
import { AppError } from "./../../errors";
import { AppDataSource } from "./../../data-source";
export const retriverAllSchedulesService = async (id: number) => {
    const scheduleRepo = AppDataSource.getRepository(Schedule);
    const realEstateRepo = AppDataSource.getRepository(RealEstate);
    const categoryRepo = AppDataSource.getRepository(Category);

    const realEstate2 = await realEstateRepo.find({
        relations: {
            address: true,
        },
        where: {
            id: id,
        },
    });

    const category = await realEstateRepo.find({
        relations: {
            category: true,
        },
        where: {
            id: id,
        },
    });

    if (
        !(await AppDataSource.getRepository(RealEstate).findOneBy({ id: id }))
    ) {
        throw new AppError("RealEstate not found", 404);
    }

    const schedules = await scheduleRepo.find({
        relations: {
            user: true,
        },
    });

    if (!schedules) {
        throw new AppError("No schedules are found", 409);
    }

    const ret = {
        address: realEstate2[0].address,
        category: category[0].category,
        createdAt: realEstate2[0].createdAt,
        id: realEstate2[0].id,
        schedules: schedules,
        size: realEstate2[0].size,
        sold: realEstate2[0].sold,
        updatedAt: realEstate2[0].updatedAt,
        value: realEstate2[0].value,
    };

    return ret;
};
