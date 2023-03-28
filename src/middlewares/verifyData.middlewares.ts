import { Response, Request, NextFunction } from "express";
import { ZodTypeAny } from "zod";

export const verifyData =
    (schema: ZodTypeAny) =>
    (req: Request, res: Response, next: NextFunction) => {
        const validateData = schema.parse(req.body);

        req.body = validateData;

        return next();
    };
