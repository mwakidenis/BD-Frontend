import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().gt(0, "Price must be greater than 0"),
  discount: z.number().min(0).max(100).default(0),
  manufacturer: z.string().min(1, "Manufacturer is required"),
  quantity: z.number().min(0, "Quantity cannot be negative"),
  inStock: z.boolean().default(true).optional(),
});
