const { z } = require("zod");

const createProductSchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.number().positive("Price must be a positive number"),
  description: z.string().optional(),
  images: z
    .array(z.string().url(), "Each image must be a valid URL")
    .nonempty("At least one image URL is required"),
});

const updateProductSchema = z.object({
  title: z.string().min(1).optional(),
  price: z.number().positive().optional(),
  description: z.string().optional(),
  images: z
    .array(z.instanceof(File))
    .min(1, { message: "At least one image is required" }),
});

module.exports = { createProductSchema, updateProductSchema };
