"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "@navigation"
import { Student } from "@prisma/client"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "@/hooks/use-toast"

import { Icons } from "@/components/shared/icons"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

import { joinClassroom } from "@/undrstnd/classroom"

const baseFormSchema = (t: (arg: string) => string) =>
  z.object({
    code: z.string().min(8, {
      message: t("formSchemaCodeMessage"),
    }),
  })

function SubmitButton({
  pending,
  t,
}: {
  pending: boolean
  t: (arg: string) => string
}) {
  if (pending) {
    return (
      <div className="absolute right-0 top-1">
        <Icons.spinner className="absolute right-2 top-2.5 mr-3 size-4 animate-spin text-base" />
      </div>
    )
  }

  return (
    <button
      type="submit"
      className="absolute right-2 top-2 z-10 h-7 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
    >
      <Icons.arrowRight className="size-4" />
    </button>
  )
}

export function FeedJoinClassroom({ student }: { student: Student }) {
  const router = useRouter()
  const t = useTranslations("Pages.Classroom")
  const [isLoading, setIsLoading] = useState(false)

  const formSchema = baseFormSchema(t)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    const result = await joinClassroom(student, values.code)

    if (result.status === 404) {
      toast({
        title: t("joinApiError"),
        variant: "destructive",
        description: t("joinApiErrorDescription"),
      })
    } else if (result.status === 301) {
      toast({
        title: t("joinApiErrorArchived"),
        variant: "destructive",
        description: t("joinApiErrorArchivedDescription"),
      })
    } else if (result.status === 400) {
      toast({
        title: t("joinApiAlreadyError"),
        variant: "destructive",
        description: t("joinApiAlreadyErrorDescription"),
      })
    } else if (result.status === 200) {
      toast({
        title: t("joinApiSuccess"),
        variant: "default",
        description: t("joinApiSuccessDescription"),
      })
      router.refresh()
      form.reset()
    }

    setIsLoading(false)
  }

  return (
    <div className="mb-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <fieldset className="relative z-50">
                    <input
                      placeholder={t("formLabelClassroomCode")}
                      id="classroom-code"
                      autoComplete="classroom-code"
                      aria-label="classroom-code"
                      {...field}
                      disabled={isLoading}
                      className="font-sm h-11 w-full rounded-lg border-2 border-secondary-foreground/20 bg-transparent px-3 py-1 text-xs text-primary outline-none"
                    />
                    <SubmitButton pending={isLoading} t={t} />
                  </fieldset>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}
