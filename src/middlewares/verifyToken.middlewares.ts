import { AppError } from "./../errors";
import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const verifyToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let token: string = req.headers.authorization!;

    if (!token || token == "Bearer") {
        throw new AppError("Missing bearer token", 401);
    }

    token = token.split(" ")[1];

    return verify(
        token,
        String(process.env.SECRET_KEY),
        async (error: any, decoded: any) => {
            if (error) throw new AppError(error.message, 401);

            if (!decoded) {
                throw new AppError("invalid signature", 401);
            }

            req.user = {
                id: decoded.sub,
                admin: decoded.admin,
                email: decoded.email,
            };

            return next();
        }
    );
};
