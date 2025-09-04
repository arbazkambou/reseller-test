import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(1, "Password is required")
    .max(100, "Password must be less than 100 characters."),
});
