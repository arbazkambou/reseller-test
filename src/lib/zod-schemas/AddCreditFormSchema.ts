import z from "zod";

export const AddCreditFormSchema = z.object({
  description: z
    .string()
    .min(3, "Description must be at least 3 characters long."),
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  type: z.string().min(1, "Please select a type"),
});
