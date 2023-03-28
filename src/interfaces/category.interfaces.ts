import { Category } from "./../entities";
import { createCategorySchema } from "./../schemas/category.schemas";
import { Repository } from "typeorm";
import { z } from "zod";

type ICreateCategory = z.infer<typeof createCategorySchema>;
type ICategoryRepo = Repository<Category>;

export type { ICreateCategory, ICategoryRepo };
