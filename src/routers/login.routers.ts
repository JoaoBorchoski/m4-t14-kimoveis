import { verifyData } from "./../middlewares/verifyData.middlewares";
import { loginController } from "./../controllers/login.controllers";
import { Router } from "express";
import { loginSchema } from "../schemas/users.schemas";

export const loginRouter: Router = Router();

loginRouter.post("", loginController);
