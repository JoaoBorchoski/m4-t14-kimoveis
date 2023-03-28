import { User } from "./../../entities/users.entities";
import { AppDataSource } from "./../../data-source";
import { IUserRepo } from "../../interfaces";
import { userSchemaMultiples } from "../../schemas/users.schemas";

export const retriverUsersServices = async (): Promise<any> => {
    const userRepo: IUserRepo = AppDataSource.getRepository(User);

    const result = await userRepo.find();
    const users = userSchemaMultiples.parse(result);

    return users;
};
