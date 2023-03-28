import { z } from "zod";

export const createSchedule = z.object({
    date: z.string(),
    hour: z.string(),
    realEstateId: z.number().int(),
});
