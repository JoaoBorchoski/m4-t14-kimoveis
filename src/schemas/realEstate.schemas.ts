import { z } from "zod";

export const createRealEstateSchema = z.object({
    value: z.number().or(z.string()),
    size: z.number().int().min(0, "Number must be greater than 0"),
    sold: z.boolean().optional(),
    address: z.object({
        street: z.string(),
        zipCode: z
            .string()
            .max(8, "String must contain at most 8 character(s)"),
        number: z.string().optional(),
        city: z.string(),
        state: z.string().max(2),
    }),
    categoryId: z.number(),
});
