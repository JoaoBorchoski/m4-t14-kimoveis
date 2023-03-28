import { verifyData } from "./../middlewares/verifyData.middlewares";
import { verifyToken } from "./../middlewares/verifyToken.middlewares";
import { verifyPermission } from "./../middlewares/veryfyPermission.middlewares";
import {
    createSchedulesController,
    retriverAllSchedulesController,
} from "./../controllers/schedules.controller";
import { Router } from "express";
import { createSchedule } from "../schemas/schedules.schemas";

export const shedulesRouter: Router = Router();

shedulesRouter.post(
    "",
    verifyToken,
    verifyData(createSchedule),
    createSchedulesController
);
shedulesRouter.get(
    "/realEstate/:id",
    verifyPermission,
    retriverAllSchedulesController
);
