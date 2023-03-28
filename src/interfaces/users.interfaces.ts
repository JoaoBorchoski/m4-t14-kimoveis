import { User } from "./../entities/users.entities";
import { DeepPartial, Repository } from "typeorm";
import {
    createUserSchema,
    createUserSchemaReturn,
} from "../schemas/users.schemas";
import { z } from "zod";

type IUser = z.infer<typeof createUserSchema>;
type IUserReturn = z.infer<typeof createUserSchemaReturn>;
type IUserRepo = Repository<User>;
type IMultipleUsers = Array<IUserReturn>;
type IUserPartial = DeepPartial<IUser>;

export type { IUser, IUserReturn, IUserRepo, IMultipleUsers, IUserPartial };
