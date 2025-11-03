import z from "zod";

export const EditPromoSchema = z.object({
  promocode: z.string().min(3, "Promocode must be at least 3 characters"),
});
