import { AppError } from "./../../errors";
import { Repository } from "typeorm";
import { AppDataSource } from "./../../data-source";
import { RealEstate, Address, Category } from "../../entities";
export const createRealEstateService = async (estateData: any) => {
    const addressRepo: Repository<Address> =
        AppDataSource.getRepository(Address);

    if (
        await addressRepo.findOneBy({
            street: estateData.address.street,
            number: estateData.address.number,
        })
    ) {
        throw new AppError("Address already exists", 409);
    }

    const categoryRepo = AppDataSource.getRepository(Category);
    const category = await categoryRepo.findOneBy({
        id: estateData.categoryId,
    });

    const realEstateRepo = AppDataSource.getRepository(RealEstate);
    const newRealEstate = realEstateRepo.create(estateData);
    await realEstateRepo.save(newRealEstate);

    const ret = {
        address: await addressRepo.findOneBy({
            street: estateData.address.street,
            number: estateData.address.number,
        }),
        category: await categoryRepo.findOneBy({ id: estateData.categoryId }),
        ...newRealEstate,
    };

    return ret;
};
