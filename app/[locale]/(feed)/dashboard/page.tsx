import { Student, Teacher, User } from "@prisma/client"
import { getTranslations, unstable_setRequestLocale } from "next-intl/server"

import { Classroom } from "@/types/classroom"

import { redirect } from "@/lib/navigation"
import { getCurrentEntity, getCurrentUser } from "@/lib/session"

import { columns } from "./columns"
import { DataTable } from "./data-table"

export async function generateMetadata() {
  const t = await getTranslations("Metadata.Pages.Dashboard")
  return { title: `${t("title")}` }
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
      const data: Classroom[] = await res.json()
      return data
    }
    return null
  } catch (error) {
    console.log(error)
  }
}

export default async function DashboardPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)

  const user = await getCurrentUser()
  const t = await getTranslations("Pages.TeacherDashboard")

  if (!user || user.role != "TEACHER") {
    return redirect("/feed")
  }

  const classrooms = await getClassrooms(user!)

  return (
    <div className="container mx-auto py-10">
      <div className="mb-10 text-center text-xl font-bold md:text-3xl">
        {t("title")}
      </div>
      <DataTable columns={columns} data={classrooms as any} />
    </div>
  )
}
