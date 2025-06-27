"use client";

import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "./button";

export default function Sidebar_Profile() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="flex">
        <Link href={"/register"} className="flex justify-center px-3">
          SignIn
        </Link>
        <Link href={"/login"} className="flex justify-center">
          Login
        </Link>
      </div>
    );
  }
  return (
    <div>
      <main className="flex w-full flex-row text-xl p-3 gap-7 justify-center group-data-[collapsible=icon]:hidden">
        {session?.user?.image ? (
          <div className="flex flex-col justify-center items-center">
            <p>
              {session?.user.name} {session?.user.firstName}
            </p>
            <Button
              variant="ghost"
              className="flex justify-center rounded-lg"
              onClick={() => signOut()}
            >
              SignOut
            </Button>
          </div>
        ) : (
          <div>
            <Avatar>
              <AvatarImage src={session?.user?.image as string} />
              <AvatarFallback>TA</AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center">
              <p>
                {session?.user.name} {session?.user.firstName}
              </p>
              <Button
                variant="ghost"
                className="flex justify-center rounded-lg"
                onClick={() => signOut()}
              >
                SignOut
              </Button>
            </div>
          </div>
        )}
      </main>
      <main className="text-xl py-3 gap-4 group-data-[collapsible=icon]:block hidden">
        <Avatar>
          <AvatarImage src={session?.user?.image as string} />
          <AvatarFallback>TA</AvatarFallback>
        </Avatar>
      </main>
    </div>
  );
}
