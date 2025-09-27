import { z } from "zod";

export const createBannerSchema = z.object({
  heading: z.string().min(1, "Heading is required"),
  description: z.string().min(1, "Description is required"),
});
