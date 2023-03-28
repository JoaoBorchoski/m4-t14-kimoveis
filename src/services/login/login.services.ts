import { User } from "./../../entities/users.entities";
import { AppDataSource } from "./../../data-source";
import { IUserLoginRequest, IUserRepo } from "../../interfaces";
import { AppError } from "../../errors";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

export const loginServices = async (userData: IUserLoginRequest) => {
    const userRepo: IUserRepo = AppDataSource.getRepository(User);

    const user: User | null = await userRepo.findOneBy({
        email: userData.email,
    });

    if (!user) {
        throw new AppError("Invalid credentials", 401);
    }

    if (user.deletedAt) {
        throw new AppError("Invalid credentials", 401);
    }

    const pwdMatch: boolean = await compare(userData.password, user.password);
    if (!pwdMatch) {
        throw new AppError("Invalid credentials", 401);
    }

    const token: string = sign(
        { email: user.email, admin: user.admin, id: user.id },
        process.env.SECRET_KEY!,
        { expiresIn: "24h", subject: String(user.id) }
    );

    return token;
};
