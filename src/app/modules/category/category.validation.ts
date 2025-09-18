import { z } from "zod";

const createCategoryValidation = z.object({
  body: z.object({
    title: z.string().min(1, { message: "Title is required" }),
  }),
});

const updateCategoryValidation = z.object({
  body: z.object({
    title: z.string().optional(),
  }),
});

export const categoryValidation = {
  createCategoryValidation,
  updateCategoryValidation,
};
