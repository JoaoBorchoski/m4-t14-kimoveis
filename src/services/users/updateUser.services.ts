import { AppError } from "./../../errors";
import { User } from "./../../entities/users.entities";
import { AppDataSource } from "./../../data-source";
import { IUserPartial } from "../../interfaces";
import { createUserSchemaReturn } from "../../schemas";

export const updateUserService = async (
    userData: IUserPartial,
    id: number,
    userReq: any
) => {
    const userRepo = AppDataSource.getRepository(User);
    const reqUser = await userRepo.findOneBy({
        id: id,
    });

    if (userData.email) {
        if (
            await userRepo.findOneBy({
                email: userData.email,
            })
        ) {
            if (userData.email != userReq.email) {
                throw new AppError("Email already exists.", 409);
            }
        }
    }

    console.log(userReq);

    if (userReq.admin == false) {
        if (reqUser?.id != userReq.id) {
            throw new AppError("Insufficient permission", 403);
        }

        const oldData = await userRepo.findOneBy({
            id: id,
        });
        const user = userRepo.create({
            ...oldData,
            ...userData,
        });

        await userRepo.save(user);

        return createUserSchemaReturn.parse(user);
    }

    const oldData = await userRepo.findOneBy({
        id: id,
    });
    const user = userRepo.create({
        ...oldData,
        ...userData,
    });

    await userRepo.save(user);

    return createUserSchemaReturn.parse(user);
};
