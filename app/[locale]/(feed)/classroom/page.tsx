import { Student, Teacher, User } from "@prisma/client"
import { getTranslations, unstable_setRequestLocale } from "next-intl/server"

import { Classroom } from "@/types/classroom"

import { redirect } from "@/lib/navigation"
import { getCurrentEntity, getCurrentUser } from "@/lib/session"

import { FeedClassroomCard } from "@/components/app/feed-classroom-card"
import { FeedAddClassroom } from "@/components/layout/feed-add-classroom"
import { FeedJoinClassroom } from "@/components/layout/feed-join-classroom"
import { Icons } from "@/components/shared/icons"

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
      const data: Classroom[] = await res.json()
      return {
        entity,
        classrooms: data,
      }
    }
    return {
      entity,
      classrooms: [],
    }
  } catch (error) {
    console.log(error)
    return {
      entity,
      classrooms: [],
    }
  }
}

export default async function ClassroomsPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)

  const user = await getCurrentUser()
  const t = await getTranslations("app.pages.classroom")

  if (!user) {
    return redirect("/login")
  }

  const { entity, classrooms } = await getClassrooms(user)

  return (
    <>
      <div className="flex flex-col gap-6">
        {classrooms && classrooms.length > 0 ? (
          classrooms.map((classroom) => {
            return (
              <FeedClassroomCard
                classroom={classroom}
                key={classroom.id}
                entity={entity as any}
              />
            )
          })
        ) : (
          <>
            {user.role === "TEACHER" && (
              <div className="-mt-20 flex h-screen w-full items-center justify-center">
                <div className="relative block w-full max-w-md rounded-lg border-2 border-dashed border-secondary-foreground/20 p-12 text-center transition-all duration-300 hover:border-secondary-foreground/50">
                  <Icons.books className="mx-auto size-24 text-secondary-foreground/60" />
                  <span className="text-md mt-2 block font-semibold text-secondary-foreground">
                    {t("create-classroom")}
                  </span>
                  <p className="mt-2 block text-sm font-normal text-secondary-foreground/60">
                    {t("paragraph")}
                  </p>
                  <div className="py-6">
                    <FeedAddClassroom teacher={entity} />
                  </div>
                </div>
              </div>
            )}

            {user.role === "STUDENT" && (
              <div className="-mt-20 flex h-screen w-full items-center justify-center">
                <div className="relative block w-full max-w-md rounded-lg border-2 border-dashed border-secondary-foreground/20 p-12 text-center transition-all duration-300 hover:border-secondary-foreground/50">
                  <Icons.add className="mx-auto size-24 text-secondary-foreground/60" />
                  <span className="text-md mt-2 block font-semibold text-secondary-foreground">
                    {t("join-classroom")}
                  </span>
                  <p className="mt-2 block text-sm font-normal text-secondary-foreground/60">
                    {t("join-classroom-description")}
                  </p>
                  <div className="py-6">
                    <FeedJoinClassroom student={entity} />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}
