import { Request, Response } from "express";
import {
    updateUserService,
    createUserService,
    retriverUsersServices,
    deleteUserServices,
} from "../services/users";

export const createUserController = async (req: Request, res: Response) => {
    const newUser = await createUserService(req.body);

    return res.status(201).json(newUser);
};

export const retriveUsersController = async (req: Request, res: Response) => {
    const users = await retriverUsersServices();

    return res.json(users);
};

export const updateUserController = async (req: Request, res: Response) => {
    const id: number = +req.params.id;
    const user = await updateUserService(req.body, id, req.user);

    return res.status(200).json(user);
};

export const deleteUserController = async (req: Request, res: Response) => {
    const id: number = +req.params.id;
    await deleteUserServices(id);

    res.status(204).send();
};
