import { z } from "zod";

const entrySchema = z.object({
  code: z.number().min(1, "Code is required"),
  value: z.transform(Number).pipe(
    z
      .number()
      .min(0, "Value must be 0 or greater")
      // .positive({ message: "Value should be positive" })
      .max(1000, "Value must be 1000 or less")
  ),
});
const globalEntrySchema = z.object({
  code: z.string().min(1, "Code is required"),
  value: z.transform(Number).pipe(
    z
      .number()
      .min(0, "Value must be 0 or greater")
      // .positive({ message: "Value should be positive" })
      .max(1000, "Value must be 1000 or less")
  ),
});

export const createPricingFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .min(3, "Name must be at least 3 characters long")
    .max(100, "Name must be less than 100 characters"),
  percent: z
    .transform(Number)
    .pipe(
      z
        .number()
        .min(0, "Percent must be 0 or greater")
        .max(100, "Percent must be 100 or less")
    ),
  default: z.boolean().catch(false),
  regions: z.array(entrySchema).min(1, "At least one region is required"),
  countries: z.array(entrySchema).min(1, "At least one country is required"),
  global: z.array(globalEntrySchema).min(1, "Select Global price"),
  assignedUsers: z
    .array(z.number())
    .min(1, "Please select at least one user to assign"),
});

export type CreatePricingFormInput = z.infer<typeof createPricingFormSchema>;
