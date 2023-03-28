import { createRealEstateSchema } from "./../schemas/realEstate.schemas";
import { z } from "zod";

type ICreateRealEstate = z.infer<typeof createRealEstateSchema>;

export type { ICreateRealEstate };
