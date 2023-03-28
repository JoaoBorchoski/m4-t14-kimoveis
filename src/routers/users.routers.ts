import { verifyToken } from "./../middlewares/verifyToken.middlewares";
import { verifyPermission } from "./../middlewares/veryfyPermission.middlewares";
import { verifyData, verifyUserId } from "../middlewares";
import { createUserSchema, updateUserSchema } from "./../schemas/users.schemas";
import { Router } from "express";
import {
    createUserController,
    deleteUserController,
    retriveUsersController,
    updateUserController,
} from "./../controllers/users.controllers";

export const usersRouter: Router = Router();

usersRouter.post("", verifyData(createUserSchema), createUserController);
usersRouter.get("", verifyPermission, retriveUsersController);
usersRouter.patch(
    "/:id",
    verifyData(updateUserSchema),
    verifyToken,
    verifyUserId,
    updateUserController
);
usersRouter.delete(
    "/:id",
    verifyUserId,
    verifyPermission,
    deleteUserController
);
