import { AppDataSource } from "./../../data-source";
import { verify } from "jsonwebtoken";
import { AppError } from "../../errors";
import { RealEstate, User, Schedule } from "../../entities";
import { createUserSchemaReturn } from "../../schemas";
export const createSchedulesServices = async (userData: any, token: string) => {
    const scheduleRepo = AppDataSource.getRepository(Schedule);
    const userRepo = AppDataSource.getRepository(User);
    const estateRepo = AppDataSource.getRepository(RealEstate);
    let userId = 0;

    if (!token) {
        throw new AppError("Missing authorization token", 401);
    }
    token = token.split(" ")[1];
    verify(
        token,
        String(process.env.SECRET_KEY),
        async (error: any, decoded: any) => {
            if (error) throw new AppError(error.message, 401);
            userId = decoded.id;
        }
    );
    const user = await userRepo.findOneBy({ id: userId });
    const estate = await estateRepo.findOneBy({ id: userData.realEstateId });

    const hour = userData.hour;
    const date = userData.date;
    const estateId = estate?.id;

    const verifyDateAndHour = await AppDataSource.getRepository(Schedule)
        .createQueryBuilder("schedules")
        .leftJoinAndSelect("schedules.realEstate", "realEstate")
        .where("schedules.date = :date", { date })
        .andWhere("schedules.hour = :hour", { hour })
        .andWhere("realEstate.id = :estateId", { estateId })
        .getOne();

    if (verifyDateAndHour) {
        throw new AppError(
            "Schedule to this real estate at this date and time already exists",
            409
        );
    }

    const verifyUser = await AppDataSource.getRepository(Schedule)
        .createQueryBuilder("schedules")
        .leftJoinAndSelect("schedules.user", "user")
        .where("user.id = schedules.userId")
        .andWhere("schedules.date = :date", { date })
        .andWhere("schedules.hour = :hour", { hour })
        .getOne();

    if (verifyUser) {
        throw new AppError(
            "User schedule to this real estate at this date and time already exists",
            409
        );
    }

    if (!(await estateRepo.findOneBy({ id: userData.realEstateId }))) {
        throw new AppError("RealEstate not found", 404);
    }

    if (hour.split(":"[0], 1) < 8 || hour.split(":"[0], 1) > 18) {
        throw new AppError(
            "Invalid hour, available times are 8AM to 18PM",
            400
        );
    }

    if (new Date(date).getDay() == 0 || new Date(date).getDay() == 6) {
        throw new AppError("Invalid date, work days are monday to friday", 400);
    }
    userData = {
        ...userData,
        user: createUserSchemaReturn.parse(user),
        realEstate: estate,
    };

    const newSchedule = scheduleRepo.create(userData);
    await scheduleRepo.save(newSchedule);

    return newSchedule;
};
