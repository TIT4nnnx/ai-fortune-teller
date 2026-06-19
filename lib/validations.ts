import { z } from "zod";

export const fortuneRequestSchema = z.object({
  lang: z.enum(["th", "en"]).optional().default("th"),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z฀-๿\s'-]+$/, "Name contains invalid characters"),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
    .refine((val) => {
      const date = new Date(val);
      const now = new Date();
      const minDate = new Date("1900-01-01");
      return date >= minDate && date <= now;
    }, "Date of birth must be between 1900 and today"),
  question: z
    .string()
    .min(1, "Please enter a question")
    .max(500, "Question must be less than 500 characters"),
});

export type FortuneRequestInput = z.infer<typeof fortuneRequestSchema>;
