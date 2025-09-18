import { z } from "zod";

const createDocumentValidation = z.object({
  body: z.object({
    title: z.string().min(1, { message: "Title is required" }),
    sortDescription: z
      .string()
      .min(1, { message: "Sort Description is required" }),
    detailDescription: z
      .string()
      .min(1, { message: "Detail Description is required" }),
    document: z.string().min(1, { message: "Document is required" }),
  }),
});

const updateDocumentValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    sortDescription: z.string().optional(),
    detailDescription: z.string().optional(),
    document: z.string().optional(),
  }),
});

export const documentValidation = {
  createDocumentValidation,
  updateDocumentValidation,
};
