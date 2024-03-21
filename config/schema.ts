import * as z from "zod";
import { getEmailOptions } from "@config/universities";

const emailOptions = getEmailOptions();

export function getUserAuthSchema(
  invalidEmail: string,
  invalidUniversityEmail: string
) {
  return z.object({
    email: z
      .string()
      .email({
        message: invalidEmail,
      })
      .refine(
        (value) => {
          const [, domain] = value.split("@");
          return emailOptions.includes(domain);
        },
        {
          message: invalidUniversityEmail,
        }
      ),
  });
}

export const emailSchema = z.object({
  email: z
    .string()
    .email()
    .refine((value) => {
      const [, domain] = value.split("@");
      return emailOptions.includes(domain);
    }),
});

export const pinSchema = z.object({
  email: z
    .string()
    .email()
    .refine((value) => {
      const [, domain] = value.split("@");
      return emailOptions.includes(domain);
    }),
  pin: z.string().length(6),
});
