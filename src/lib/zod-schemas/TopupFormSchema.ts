import z from "zod";

export const TopupFormSchema = z.object({
  amount: z.coerce.number().min(10, "Amount must be at least $10"),
});
