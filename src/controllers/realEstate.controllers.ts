import { Request, Response } from "express";
import { retriverEstatesService } from "../services/realEstate/retriverAllEstates.services";
import { createRealEstateService } from "./../services/realEstate/createRealEstate.services";

export const createRealEstateController = async (
    req: Request,
    res: Response
) => {
    const newRealEstate = await createRealEstateService(req.body);

    return res.status(201).json(newRealEstate);
};

export const retriverEstatesController = async (
    req: Request,
    res: Response
) => {
    const estates = await retriverEstatesService();
    return res.json(estates);
};
