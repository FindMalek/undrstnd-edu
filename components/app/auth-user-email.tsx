"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "@navigation"
import { signIn } from "next-auth/react"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { getUserAuthSchema } from "@/config/schema"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"

import { AuthInputUniversityForm } from "@/components/app/auth-input-university-form"
import { Icons } from "@/components/shared/icons"
import { buttonVariants } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

import { ResponsiveDialog } from "../shared/responsive-dialog"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  type: "login" | "register"
}

export function AuthUserEmail({
  type,
  className,
  ...props
}: UserAuthFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false)
  const [isGitHubError, setIsGitHubError] = React.useState<boolean>(true)
  const searchParams = useSearchParams()
  const error = searchParams.get("error")
  const t = useTranslations("Components.Form.UserAuth")
  const userAuthSchema = getUserAuthSchema(
    t("invalidEmail"),
    t("invalidUniversityEmail")
  )

  type FormData = z.infer<typeof userAuthSchema>
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  })

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    try {
      await signIn("email", {
        email: data.email.toLowerCase(),
        redirect: false,
        callbackUrl: "/feed",
      })

      router.push("/otp-code/" + data.email.toLowerCase())
      return toast({
        title: t("toastSignInSuccessTitle"),
        description: t("toastSignInSuccessDescription"),
      })
    } catch (error) {
      return toast({
        title: t("toastSignInFailedTitle"),
        description: t("toastSignInFailedDescription"),
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className={cn("grid gap-6", className)} {...props}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                {t("labelEmail")}
              </Label>

              {/* <AuthInputUniversityForm
                disabled={isLoading || isGitHubLoading}
                placeholder={t("placeholderEmail")}
                register={register}
                setValue={setValue}
                {...FormData}
              /> */}
              <Input 
                id="email"
                type="email"
                placeholder={t("placeholderEmail")}
                disabled={isLoading || isGitHubLoading}
                {...register("email")}
              />

              {errors?.email && (
                <p className="px-1 text-xs text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
            <button
              className={cn(buttonVariants())}
              disabled={isLoading || isGitHubLoading}
            >
              {isLoading && (
                <Icons.spinner className="mr-2 size-4 animate-spin" />
              )}
              {t("buttonForm", { type: type })}{" "}
              <Icons.chevronRight className="ml-2 size-4 stroke-[3px]" />
            </button>
          </div>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="px-2 text-muted-foreground">
              {t("labelChoice")}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className={cn(buttonVariants({ variant: "outline" }), "flex-1")}
            onClick={() => {
              signIn("github", { callbackUrl: "/onboarding" })
            }}
            disabled={isLoading || isGitHubLoading}
          >
            {isGitHubLoading ? (
              <Icons.spinner className="mr-2 size-4 animate-spin" />
            ) : (
              <Icons.gitHub className="mr-2 size-4" />
            )}{" "}
            Github
          </button>
          <HoverCard>
            <HoverCardTrigger>
              <Icons.info className="size-6 text-yellow-500" />
            </HoverCardTrigger>
            <HoverCardContent align="end" className="mt-2">
              <div className="mt-2 flex flex-col items-start gap-2">
                <div className="self-center text-yellow-700">
                  {" "}
                  {t("hoverCardTitle")}
                </div>
                <div className="text-sm">
                  {" "}
                  <span className="underline">{t("universityEmail")}</span>{" "}
                  {t("must")}{" "}
                  <span className="underline">{t("primaryEmail")}</span>{" "}
                  {t("yourGithub")}
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
      {error && isGitHubError && (
        <ResponsiveDialog
          action={() => {
            setIsGitHubError(false)
          }}
          children={<GithubErrorContent />}
          description={t("githubErrorDescription")}
          title={t("githubErrorTitle")}
          loading={false}
          open={isGitHubError}
          setOpen={setIsGitHubError}
        />
      )}
    </>
  )
}

const GithubErrorContent = () => {
  const t = useTranslations("Components.Form.UserAuth")
  return (
    <div className="flex flex-col gap-2 text-sm">
      <div>
        <span className="font-bold text-yellow-700">1-</span>{" "}
        <span className="font-semibold">{t("step1")}</span>
      </div>
      <div>
        <span className="font-bold text-yellow-700">2-</span>{" "}
        <span className="font-semibold">{t("step2")}</span>
      </div>
      <div>
        <span className="font-bold text-yellow-700">3-</span>{" "}
        <span className="font-semibold">{t("step3")}</span>
      </div>
      <div>
        <span className="font-bold text-yellow-700">4-</span>{" "}
        <span className="font-semibold">{t("step4")}</span>
      </div>
    </div>
  )
}
