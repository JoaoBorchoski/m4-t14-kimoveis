import { Request } from "express";
declare global {
    namespace Express {
        interface Request {
            user: {
                id: string;
                admin: boolean;
                email: string;
            };
        }
    }
}

export {};
