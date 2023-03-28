import { z } from "zod";

const createUserSchema = z.object({
    name: z.string().max(45),
    email: z.string().email(),
    admin: z.boolean().optional().default(false),
    password: z.string().max(120),
});

const createUserSchemaReturn = createUserSchema
    .extend({
        id: z.number(),
        createdAt: z.string(),
        updatedAt: z.string(),
        deletedAt: z.string().nullable(),
    })
    .omit({ password: true });

const userSchemaMultiples = createUserSchemaReturn.array();
const updateUserSchema = createUserSchema.omit({ admin: true }).partial();

const loginSchema = createUserSchema.omit({
    admin: true,
    name: true,
});

export {
    createUserSchema,
    createUserSchemaReturn,
    userSchemaMultiples,
    updateUserSchema,
    loginSchema,
};
