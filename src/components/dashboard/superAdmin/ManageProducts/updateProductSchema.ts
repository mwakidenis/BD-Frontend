import { z } from "zod";

export const updateProductSchemaSuperAdmin = z.object({
  name: z.string().min(1, "Name is required").trim().optional(),
  _id: z.string().optional(),
  category: z.string().min(1, "Category is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  price: z.number().gt(0, "Price must be greater than 0").optional(),
  discount: z.number().min(0).max(100).default(0).optional(),
  manufacturer: z.string().min(1, "Manufacturer is required").optional(),
  quantity: z.number().min(0, "Quantity cannot be negative").optional(),
  inStock: z.boolean().default(true).optional(),
});
