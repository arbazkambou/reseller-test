import z from "zod";

export const UpdateDealerFormSchema = z
  .object({
    name: z
      .string()
      .min(4, "Name must be at least 4 characters long.")
      .max(100, "Name must be less than 100 characters."),
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long.")
      .max(100, "Password must be less than 100 characters.")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character."
      ),
    password_confirmation: z
      .string()
      .min(8, {
        message: "Confirm Password must be at least 8 characters long.",
      })
      .max(100, {
        message: "Confirm Password must be less than 100 characters.",
      }),
    status: z.string().min(1, "Please select status"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Password do not match.",
    path: ["confirmPassword"],
  });
