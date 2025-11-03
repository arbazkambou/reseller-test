import z from "zod";

export function getAccountUpdateFormSchema(isDealer: boolean) {
  return z
    .object({
      name: z.string().min(2, "Name must be at least 2 characters"),
      newPassword: z
        .string()

        .optional(),
      confirmPassword: z.string().optional(),
      apiKey: isDealer ? z.string().optional() : z.string().optional(),
      apiSecret: isDealer ? z.string().optional() : z.string().optional(),
    })
    .refine((data) => data.confirmPassword === data.newPassword, {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    });
}

export type AccountUpdateFormInputs = z.infer<
  ReturnType<typeof getAccountUpdateFormSchema>
>;
