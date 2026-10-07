import { z } from "zod";

export const updateUserSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(50).optional(),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9]{10,13}$/, "Invalid phone number")
    .optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
