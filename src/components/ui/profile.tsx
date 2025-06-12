"use client";

import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Bookmark, History, LogOut, Settings } from "lucide-react";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  function Timeout() {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }

  useEffect(() => {
    Timeout();
  }, []);

  if (loading) {
    return (
      <div className=" flex flex-row justify-end h-[80px] items-center pr-5">
        <Skeleton className="h-12 w-12 rounded-full" />
      </div>
    );
  }
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={session?.user?.image as string} />
          <AvatarFallback>TA</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[250px] rounded-xl" align="end">
        <div className="flex flex-row py-1 p-2">
          {session?.user.image ? (
            <Avatar>
              <AvatarImage src={session?.user?.image } />
              <AvatarFallback>TA</AvatarFallback>
            </Avatar>
          ) : null}

          <div className="flex flex-col w-full ">
            <p className="flex pl-2 justify-center">
              {session.user.name} {session.user.firstName}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator className="px-2" />
        <div className="flex flex-col w-full ">
          <div className="flex pl-2 py-3">
            <Link className="flex" href={"/dashboard/profile"}>
              <Settings className="p-[2px]" />
              <div className="pl-1"> Setting</div>
            </Link>
          </div>
        </div>

        <div className="flex flex-col w-full ">
          <div className="flex pl-2 py-3">
            <Link className="flex" href={"/dashboard/history"}>
              <History className="p-[2px]" />
              <div className="pl-1"> History</div>
            </Link>
          </div>
        </div>

        <div className="flex flex-col w-full ">
          <div className="flex pl-2 py-3">
            <Link className="flex " href={"/dashboard/my-list"}>
              <Bookmark className="p-[2px]" />
              <div className="pl-1"> My List</div>
            </Link>
          </div>
        </div>
        <div className="flex w-full ">
          <div className=" pl-2 py-3">
            <button className="flex " onClick={() => signOut()}>
              <LogOut className="p-[2px] flex" />
              <div className="pl-1">Sign Out</div>
            </button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
