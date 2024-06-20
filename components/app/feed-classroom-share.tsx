"use client"

import { useState } from "react"
import Image from "next/image"
import { Classroom, Student, Teacher, User } from "@prisma/client"
import { useTranslations } from "next-intl"

import { siteConfig } from "@/config/site"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"

import { Icons } from "@/components/shared/icons"
import { ResponsiveDialog } from "@/components/shared/responsive-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

import { sendMail } from "@/undrstnd/mailer"

interface ShareClassroomProps {
  students: Student & { user: User }[]
  classroom: Classroom & { teacher: Teacher & { user: User } }
  user: User
}

export function FeedClassroomShare({
  classroom,
  students,
  user,
}: ShareClassroomProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { isCopied, copyToClipboard } = useCopyToClipboard({})
  const [invitedStudents, setInvitedStudents] = useState<string[]>([])

  const t = useTranslations("app.components.app.feed-classroom-share")

  const copyLink = () => {
    copyToClipboard(`${siteConfig.url}/classroom/join/${classroom.classCode}`)
  }

  async function inviteStudent(student: Student & { user: User }) {
    setInvitedStudents((prev) => [...prev, student.user.email])
    await sendMail("invite-student", {
      teacher: classroom.teacher,
      student,
      classroom,
    })
  }

  return (
    <>
      <Button
        variant="outline"
        size={"icon"}
        className="size-8 max-sm:size-6"
        onClick={() => setOpen(true)}
      >
        <Icons.shareClassroom className="size-4" />

        <span className="sr-only">Share classroom</span>
      </Button>
      <ResponsiveDialog
        title={t("dialog-title-share")}
        description={t("dialog-description-share")}
        loading={loading}
        open={open}
        setOpen={setOpen}
        action={() => ({})}
      >
        <div className="flex space-x-2">
          <Input
            value={`${siteConfig.url}/classroom/join/${classroom.classCode}`}
            readOnly
          />
          <Button onClick={copyLink} variant="secondary" className="shrink-0">
            {isCopied ? t("copied") : t("copy")}
          </Button>
        </div>
        {user.role === "TEACHER" && (
          <>
            <Separator className="my-4" />
            <div className="space-y-4">
              <h4 className="text-sm font-medium">{t("student-university")}</h4>
              <ScrollArea className="grid h-[200px] px-2">
                {students.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    {t("no-students")}
                  </p>
                )}

                {students.map((student) => (
                  <div
                    key={student.user.id}
                    className="mb-6 flex items-center justify-between space-x-4"
                  >
                    <div className="flex items-center space-x-4">
                      <Image
                        src={student.user.image!}
                        alt="Avatar"
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <div>
                        <p className="text-sm font-medium leading-none">
                          {student.user.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {student.user.email}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => inviteStudent(student as any)}
                      disabled={invitedStudents.includes(student.user.email)}
                    >
                      {invitedStudents.includes(student.user.email) ? (
                        <Icons.userCheck className="size-4" />
                      ) : (
                        <Icons.userPlus className="size-4" />
                      )}
                    </Button>
                  </div>
                ))}
              </ScrollArea>
            </div>
          </>
        )}
      </ResponsiveDialog>
    </>
  )
}
