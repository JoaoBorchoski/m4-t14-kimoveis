import { Request, Response } from "express";
import { loginServices } from "../services/login/login.services";

export const loginController = async (req: Request, res: Response) => {
    const loginReq = req.body;
    const token = await loginServices(loginReq);

    return res.json({
        token: token,
    });
};
