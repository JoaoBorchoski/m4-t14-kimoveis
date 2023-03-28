import { RealEstate } from "../../entities";
import { AppDataSource } from "./../../data-source";
export const retriverEstatesService = async () => {
    const realEstateRepo = AppDataSource.getRepository(RealEstate);

    return await realEstateRepo.find({
        relations: {
            address: true,
        },
    });
};
