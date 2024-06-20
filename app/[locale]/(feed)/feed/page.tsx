import React from "react"
import { type Metadata } from "next"
import Image from "next/image"
import { Link, redirect } from "@navigation"
import { Student, Teacher, User } from "@prisma/client"
import { getTranslations, unstable_setRequestLocale } from "next-intl/server"

import { Classroom } from "@/types"
import { NextAuthUser } from "@/types/auth"

import {
  getCurrentEntity,
  getCurrentUser,
  userAuthentificateVerification,
} from "@/lib/session"
import { cn, processActivities } from "@/lib/utils"

import { Icons } from "@/components/shared/icons"
import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("app.pages.feed")
  return {
    title: `${t("metadata-title")}`,
  }
}

async function getClassrooms(user: User) {
  const entity = (await getCurrentEntity(user)) as Student | Teacher
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/classrooms/${user.role.toLowerCase()}/${entity.id}`,
      {
        method: "GET",
        next: {
          revalidate: 0,
        },
      }
    )

    if (res.ok) {
      return (await res.json()) as Classroom[]
    } else {
      return []
    }
  } catch (error) {
    console.log(error)
    return []
  }
}

export default async function FeedPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)

  const t = await getTranslations("app.pages.feed")
  const user = await getCurrentUser()
  const toRedirect = await userAuthentificateVerification(user as NextAuthUser)

  if (toRedirect) {
    redirect(toRedirect)
  }

  if (!user || !user.name || !user.email || !user.image) {
    return null
  }

  const classrooms = (await getClassrooms(user)) as Classroom[]
  const activities = processActivities(classrooms, t)

  return (
    <main className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(activities.length > 0 || activities[0]?.length > 0) && (
          <h1 className="py-4 text-2xl font-semibold">{t("feed")}</h1>
        )}

        <div className="flow-root space-y-3">
          {(activities.length === 0 || activities[0].length === 0) && (
            <div className="-mt-20 flex h-screen w-full items-center justify-center">
              <div className="relative block w-full max-w-md rounded-lg border-2 border-dashed border-secondary-foreground/20 p-12 text-center transition-all duration-300 hover:border-secondary-foreground/50">
                <Icons.sleep className="mx-auto size-24 text-secondary-foreground/60" />
                <span className="text-md mt-2 block font-semibold text-secondary-foreground">
                  {t("nothing-title")}
                </span>
                <p className="mt-2 block text-sm font-normal text-secondary-foreground/60">
                  {t("paragraph")}
                </p>
              </div>
            </div>
          )}

          {activities.map((classroomActivities, idx) => (
            <Card className="p-6">
              <ul role="list" className="-mb-8">
                {classroomActivities.map((activityItem, activityItemIdx) => (
                  <li key={activityItem.id}>
                    <div className="relative pb-8">
                      {activityItemIdx !== activities.length - 1 ? (
                        <span
                          className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-secondary-foreground/20"
                          aria-hidden="true"
                        />
                      ) : null}

                      <div className="relative flex items-start space-x-3">
                        {activityItem.type === "post" ? (
                          <>
                            <div className="relative">
                              <Image
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary ring-4 ring-secondary"
                                src={activityItem.imageUrl}
                                alt={activityItem.user.name}
                                width={40}
                                height={40}
                              />

                              <span className="absolute -bottom-2 -right-3 rounded-lg rounded-tl bg-secondary px-0.5 py-px">
                                <Icons.post
                                  className="h-5 w-5 bg-secondary"
                                  aria-hidden="true"
                                />
                              </span>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div>
                                <div className="text-sm">
                                  <span className="font-medium text-secondary-foreground">
                                    {activityItem.user.name}{" "}
                                    <span className="text-sm font-light">
                                      - {activityItem.date}
                                    </span>
                                  </span>
                                </div>
                                <p className="mt-0.5 text-sm text-secondary-foreground/60">
                                  {t("posted")} @{" "}
                                  <Link
                                    href={`/classroom/${activityItem.classroom.id}`}
                                    className="font-semibold hover:underline"
                                  >
                                    {activityItem.classroom.name}
                                  </Link>
                                </p>
                              </div>
                              <div className="mt-2 text-sm text-secondary-foreground/70">
                                <p>{activityItem.comment}</p>
                              </div>
                            </div>
                            <Link
                              href={`/classroom/${activityItem.classroom.id}#${activityItem.id}`}
                              className={cn(
                                buttonVariants({
                                  size: "icon",
                                  variant: "ghost",
                                }),
                                "absolute right-0 top-0 h-5 w-5"
                              )}
                            >
                              <Icons.external className="absolute right-0 top-0 h-5 w-5" />
                            </Link>
                          </>
                        ) : activityItem.type === "comment" ? (
                          <>
                            <div>
                              <div className="relative px-1">
                                <div className="flex size-6 items-center justify-center rounded-full bg-secondary/80 ring-4 ring-secondary/80">
                                  <Image
                                    src={activityItem.imageUrl}
                                    alt={activityItem.user.name}
                                    width={32}
                                    height={32}
                                    className="size-6 rounded-full"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="min-w-0 flex-1 py-1.5">
                              <div className="text-sm text-secondary-foreground/40">
                                <span className="font-medium text-secondary-foreground/80">
                                  {activityItem.user.name}
                                </span>{" "}
                                {t("commented")} @{" "}
                                {activityItem.post && (
                                  <Link
                                    href={`/classroom/${activityItem.classroom.id}#${activityItem.post.id}`}
                                    className="font-semibold hover:underline"
                                  >
                                    {activityItem.post.name}
                                  </Link>
                                )}{" "}
                                <span className="text-sm font-light">
                                  - {activityItem.date}
                                </span>
                              </div>
                            </div>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
