import * as z from "zod"

import { getEmailOptions } from "@/config/universities"

const emailOptions = getEmailOptions()

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
/*       .refine(
        (value) => {
          const [, domain] = value.split("@")
          return emailOptions.includes(domain)
        },
        {
          message: invalidUniversityEmail,
        }
      ), */
  })
}

export const emailSchema = z.object({
  email: z
    .string()
    .email()
    .refine((value) => {
      const [, domain] = value.split("@")
      return emailOptions.includes(domain)
    }),
})

export const pinSchema = z.object({
  email: z
    .string()
    .email()
    .refine((value) => {
      const [, domain] = value.split("@")
      return emailOptions.includes(domain)
    }),
  pin: z.string().length(6),
})

export const addClassroomSchema = (t: (arg: string) => string) =>
  z.object({
    name: z.string().min(4, {
      message: t("formSchemaNameMessage"),
    }),
    description: z.string().optional(),
  })

export const editClassroomSchema = (t: (arg: string) => string) =>
  z.object({
    name: z.string().min(4, {
      message: t("formSchemaNameMessage"),
    }),
    description: z.string().optional(),
  })

export const addPostSchema = (t: (arg: string) => string) =>
  z.object({
    name: z.string().min(4, {
      message: t("formSchemaPostName"),
    }),
    content: z.string().min(10, {
      message: t("formSchemaDescriptionMessage"),
    }),
    files: z
      .array(
        z.instanceof(File).refine((file) => file.size < 25 * 1024 * 1024, {
          message: t("file-size-error"),
        })
      )
      .max(10, {
        message: t("file-max-error"),
      })
      .optional(),
  })

export const editPostSchema = (t: (arg: string) => string) =>
  z.object({
    name: z.string().min(4, {
      message: t("formSchemaPostName"),
    }),
    content: z.string().min(10, {
      message: t("formSchemaDescriptionMessage"),
    }),
    files: z.array(z.unknown()).optional(),
  })

export const commentAddCardSchema = (t: (arg: string) => string) =>
  z.object({
    text: z.string().min(4, t("commentAddSchema")),
  })

export const editCommentSchema = (t: (arg: string) => string) =>
  z.object({
    text: z.string().min(4, t("commentAddSchema")),
  })

export const uploadFileSchema = (t: (arg: string) => string) =>
  z.object({
    files: z
      .array(
        z.instanceof(File).refine((file) => file.size < 25 * 1024 * 1024, {
          message: t("file-size-error"),
        })
      )
      .max(1, {
        message: t("file-max-error"),
      }),
  })

export const onboaringSchema = z.object({
  name: z.string().min(2).max(50),
  bio: z.string().max(200).optional(),
  image: z.string().url().optional(),
  role: z.union([z.literal("STUDENT"), z.literal("TEACHER")]),
})

export const authOTPCodeTranslatedSchema = (t: (key: string) => string) =>
  z.object({
    email: z.string().email({
      message: t("email"),
    }),
    pin: z.string().length(6),
  })

export const authOTPCodeSchema = z.object({
  email: z.string().email(),
  pin: z.string().length(6),
})
