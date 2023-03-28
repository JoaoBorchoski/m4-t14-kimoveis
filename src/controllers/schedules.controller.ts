import { retriverAllSchedulesService } from "./../services/schedules/retriverSchedules.services";
import { createSchedulesServices } from "./../services/schedules/newSchedules.services";
import { Request, Response } from "express";

export const createSchedulesController = async (
    req: Request,
    res: Response
) => {
    const token: string = req.headers.authorization!;
    await createSchedulesServices(req.body, token);

    return res.status(201).json({
        message: "Schedule created",
    });
};

export const retriverAllSchedulesController = async (
    req: Request,
    res: Response
) => {
    const schedules = await retriverAllSchedulesService(+req.params.id);

    return res.json(schedules);
};
