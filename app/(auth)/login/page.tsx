import Link from "next/link";
import { Metadata } from "next";
import { cn } from "@/lib/utils";
import { Suspense } from "react";

import { Icons } from "@component/icons/Lucide";
import { LogoPNG } from "@component/icons/Overall";

import { buttonVariants } from "@component/ui/Button";
import { UserAuthForm, UserAuthSkeleton } from "@component/form/UserAuth";

export const metadata: Metadata = {
  title: "Se connecter à votre compte",
};

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <Icons.chevronLeft className="mr-2 h-4 w-4" />
        Retourner
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <LogoPNG className="mx-auto h-10 w-10" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Bienvenue de retour
          </h1>
          <p className="text-sm text-muted-foreground">
            Saisissez votre email ci-dessous pour vous connecter
          </p>
        </div>

        <Suspense fallback={<UserAuthSkeleton />}>
          <UserAuthForm />
        </Suspense>

        <p className="px-8 text-center text-sm text-muted-foreground">
          Nouveau sur le site?{" "}
          <Link
            href="/register"
            className="hover:text-brand underline underline-offset-4"
          >
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
}
