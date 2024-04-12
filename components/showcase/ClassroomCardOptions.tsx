"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Classroom, User } from "@prisma/client";

import { toast } from "@hook/use-toast";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@component/ui/DropdownMenu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@component/ui/AlertDialog";
import { Button } from "@component/ui/Button";
import { Icons } from "@component/icons/Lucide";
import { EditClassroom } from "@component/form/EditClassroom";

interface ClassroomCardProps {
  classroom: Classroom & {
    teacher: { user: User; id: string; userId: string };
  };
}

export function ClassroomCardOptions({ classroom }: ClassroomCardProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isModifyOpen, setIsModifyOpen] = useState(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);

  const t = useTranslations("Components.Display.ClassroomCardOptions");

  const handleArchive = async () => {
    try {
      const res = await fetch(`/api/classrooms/${classroom.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: classroom.teacher.user.id,
          isArchived: true,
        }),
      });
      if (res.ok) {
        toast({
          title: t("toastTitleArchiveClassroom"),
          description: t("toastDescriptionArchiveClassroom"),
        });
        router.refresh();
      }
    } catch (error) {
      toast({
        title: t("error-toast-archive"),
        description: t("error-description-toast-archive"),
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/classrooms/${classroom.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: classroom.teacher.user.id,
        }),
      });
      if (res.ok) {
        toast({
          title: t("toastTitleDeleteClassroom"),
          variant: "default",
          description: t("toastDescriptionDeleteClassroom"),
        });
        router.refresh();
      }
    } catch (error) {
      toast({
        title: t("error-toast-delete"),
        description: t("error-description-toast-arcdeletehive"),
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Icons.moreHorizontal className="h-4 w-4" />
            <span className="sr-only">Toggle options of classroom</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{t("classroomOption")}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex gap-2 items-center hover:cursor-pointer"
            onClick={() => setIsModifyOpen(true)}
          >
            <Icons.editClassroom className="h-4 w-4 " />
            {t("editClassroom")}{" "}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex gap-2 items-center hover:cursor-pointer"
            onClick={() => setIsArchiveOpen(true)}
          >
            <Icons.archiveClassroom className="h-4 w-4" />
            {t("archiveClassroom")}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex gap-2 items-center hover:cursor-pointer text-red-600"
            onClick={() => setIsDeleteOpen(true)}
          >
            <Icons.deleteClassroom className="h-4 w-4 " />
            {t("deleteClassroom")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isArchiveOpen && (
        <AlertDialog open={isArchiveOpen} onOpenChange={setIsArchiveOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {t("alertDialogTitleArchive")}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {t("alertDialogDescriptionArchive")}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t("alertDialogCancel")}</AlertDialogCancel>
              <AlertDialogAction onClick={handleArchive}>
                {t("alertDialogAction")}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {isDeleteOpen && (
        <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t("alertDialogTitleDelete")}</AlertDialogTitle>
              <AlertDialogDescription>
                {t("alertDialogDescriptionDelete")}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="focus-visible:ring-red-700">
                {t("alertDialogCancel")}
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-700 hover:bg-red-500"
                onClick={handleDelete}
              >
                {t("alertDialogAction")}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {isModifyOpen && (
        <EditClassroom
          classroom={classroom}
          open={isModifyOpen}
          setOpen={setIsModifyOpen}
        />
      )}
    </>
  );
}
