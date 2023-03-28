import { z } from "zod";

export const createCategorySchema = z.object({
    name: z.string().max(45),
});

export const returnManyEstatesByCategory = z
    .object({
        id: z.number(),
        sold: z.boolean(),
        value: z.number(),
        createdAt: z.string(),
        updatedAt: z.string(),
    })
    .array();
