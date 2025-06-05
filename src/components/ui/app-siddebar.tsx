"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

import { CgProfile } from "react-icons/cg";
import { GoHistory } from "react-icons/go";
import { FaList } from "react-icons/fa";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { TbDeviceIpadMinus } from "react-icons/tb";
import { FaUsersViewfinder } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { CiBoxList } from "react-icons/ci";

import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { BiCategory } from "react-icons/bi";
import { CiViewColumn } from "react-icons/ci";
import { CiViewList } from "react-icons/ci";
import { GoVideo } from "react-icons/go";
export function AppSidebar() {
  const currentPath = usePathname();
  const { data: session } = useSession();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex items-center justify-center">
        <Link
          href={"/"}
          className="group-data-[collapsible=icon]:hidden text-2xl pt-5 flex-none font-bold truncate"
        >
          The Anime Arch
        </Link>
        <Image
          alt=""
          className="group-data-[collapsible=icon]:block hidden"
          src={
            "https://cdn.discordapp.com/attachments/1362055620785733662/1376177224763441293/Untitled.png?ex=68403dea&is=683eec6a&hm=02218d18bf650ba7c47e43de903fab17500cac831886cb561723cbec23c35026&"
          }
          width={40}
          height={40}
        />
      </SidebarHeader>
      <div className="flex justify-center">
        <div className="h-[2px] w-[80%] bg-border" />
      </div>
      <SidebarContent>
        <SidebarGroup className="flex text-xl gap-4 group-data-[collapsible=icon]:hidden">
          <Link
            className={
              currentPath === "/dashboard/profile"
                ? "flex flex-row items-center justify-center gap-2 underline underline-offset-8 decoration-primary rounded-2xl "
                : "flex flex-row items-center justify-center gap-2"
            }
            href={"/dashboard/profile"}
          >
            <CgProfile /> Profile
          </Link>
          <Link
            className={
              currentPath === "/dashboard/history"
                ? "flex flex-row items-center justify-center gap-2 underline underline-offset-8 decoration-primary rounded-2xl "
                : "flex flex-row items-center justify-center gap-2"
            }
            href={"/dashboard/history"}
          >
            <GoHistory /> History
          </Link>
          <Link
            className={
              currentPath === "/dashboard/my-list"
                ? "flex flex-row items-center justify-center gap-2 underline underline-offset-8 decoration-primary rounded-2xl "
                : "flex flex-row items-center justify-center gap-2"
            }
            href={"/dashboard/my-list"}
          >
            <FaList /> My List
          </Link>

          {/*  //TODO MAKE THE PERMISSION FOR OWNER SIDE */}
          {session?.user.role == "Owner" ? (
            <div className="flex flex-col gap-4">
              <div className="flex justify-center py-2">
                <div className="h-[2px] w-[80%] bg-border" />
              </div>
              <Collapsible className="flex flex-col">
                <CollapsibleTrigger className="flex justify-center items-center flex-row gap-2 flex-none truncate">
                  <MdOutlineAdminPanelSettings size={26} /> Administrative Side
                </CollapsibleTrigger>
                <CollapsibleContent className="flex flex-col justify-start gap-3 pt-3">
                  <div className="pl-14 ">
                    <div className="flex flex-row items-center justify-start gap-2">
                      <FaUsersViewfinder />
                      <Link
                        className={
                          currentPath === "/dashboard/my-list"
                            ? "flex flex-row items-center justify-center gap-2 underline underline-offset-8 decoration-primary rounded-2xl "
                            : "flex flex-row items-center justify-center gap-2"
                        }
                        href={"/dashboard/my-list"}
                      >
                        Permission | Role
                      </Link>
                    </div>
                    <div className="flex flex-row items-center justify-start text-center gap-2">
                      <IoSettingsOutline />
                      <Link
                        className={
                          currentPath === "/dashboard/my-list"
                            ? "flex flex-row items-center justify-center basis-2/3 gap-2 underline underline-offset-8 decoration-primary rounded-2xl "
                            : "flex flex-row items-center justify-center gap-2"
                        }
                        href={"/dashboard/my-list"}
                      >
                        Site Settings
                      </Link>
                    </div>
                    <div className="flex flex-row items-center justify-start text-center gap-2">
                      <CiBoxList />
                      <Link
                        className={
                          currentPath === "/dashboard/my-list"
                            ? "flex flex-row items-center justify-center basis-2/3 gap-2 underline underline-offset-8 decoration-primary rounded-2xl "
                            : "flex flex-row items-center justify-center gap-2"
                        }
                        href={"/dashboard/my-list"}
                      >
                        Page List
                      </Link>
                    </div>
                    <div className="flex flex-row items-center justify-start text-center gap-2">
                      <CgProfile />
                      <Link
                        className={
                          currentPath === "/dashboard/my-list"
                            ? "flex flex-row items-center justify-center basis-2/3 gap-2 underline underline-offset-8 decoration-primary rounded-2xl "
                            : "flex flex-row items-center justify-center gap-2"
                        }
                        href={"/dashboard/my-list"}
                      >
                        User
                      </Link>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          ) : null}
          {/*  //TODO MAKE THE PERMISSION FOR OWNER SIDE */}
          {session?.user.role == "Owner" ? (
            <div className="flex flex-col gap-4">
              <Collapsible className="flex flex-col">
                <CollapsibleTrigger className="flex justify-center items-center flex-row gap-2 flex-none  truncate">
                  <TbDeviceIpadMinus size={26} /> Anime Administrator
                </CollapsibleTrigger>
                <CollapsibleContent className="flex flex-col justify-start gap-3 pt-3">
                  <div className="pl-14 ">
                    <div className="flex flex-row items-start justify-start gap-2">
                      <BiCategory />
                      <Link
                        className={
                          currentPath === "/dashboard/my-list"
                            ? "flex flex-row items-center justify-center gap-2 underline underline-offset-8 decoration-primary rounded-2xl "
                            : "flex flex-row items-center justify-center gap-2"
                        }
                        href={"/dashboard/my-list"}
                      >
                        Category
                      </Link>
                    </div>
                    <div className="flex flex-row items-center justify-start text-center gap-2">
                      <CiViewColumn />
                      <Link
                        className={
                          currentPath === "/dashboard/my-list"
                            ? "flex flex-row items-center justify-center basis-2/3 gap-2 underline underline-offset-8 decoration-primary rounded-2xl "
                            : "flex flex-row items-center justify-center gap-2"
                        }
                        href={"/dashboard/my-list"}
                      >
                        Serial
                      </Link>
                    </div>
                    <div className="flex flex-row items-center justify-start text-center gap-2">
                      <CiViewList />
                      <Link
                        className={
                          currentPath === "/dashboard/my-list"
                            ? "flex flex-row items-center justify-center basis-2/3 gap-2 underline underline-offset-8 decoration-primary rounded-2xl "
                            : "flex flex-row items-center justify-center gap-2"
                        }
                        href={"/dashboard/my-list"}
                      >
                        Season
                      </Link>
                    </div>
                    <div className="flex flex-row items-center justify-start text-center gap-2">
                      <GoVideo />
                      <Link
                        className={
                          currentPath === "/dashboard/my-list"
                            ? "flex flex-row items-center justify-center basis-2/3 gap-2 underline underline-offset-8 decoration-primary rounded-2xl "
                            : "flex flex-row items-center justify-center gap-2"
                        }
                        href={"/dashboard/my-list"}
                      >
                        Episode
                      </Link>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          ) : null}
        </SidebarGroup>

        <SidebarGroup className="text-xl gap-4 group-data-[collapsible=icon]:block hidden">
          <Link
            className={
              currentPath === "/dashboard/profile"
                ? "flex flex-row items-center justify-center gap-2 underline underline-offset-8 decoration-primary rounded-2xl "
                : "flex flex-row items-center justify-center gap-2"
            }
            href={"/dashboard/profile"}
          >
            <CgProfile />
          </Link>
          <Link
            className="flex py-2 flex-row items-center justify-center gap-2"
            href={"/dashboard/history"}
          >
            <GoHistory />
          </Link>
          <Link
            className="flex flex-row items-center justify-center gap-2"
            href={"/dashboard/my-list"}
          >
            <FaList />
          </Link>

          {/*  //TODO MAKE THE PERMISSION FOR OWNER SIDE */}
          {session?.user.role == "Owner" ? (
            <div className="flex flex-col gap-4">
              <div className="flex justify-center py-2">
                <div className="h-[2px] w-[80%] bg-border" />
              </div>
              <Collapsible className="flex flex-col">
                <CollapsibleTrigger className="flex justify-center items-center flex-row gap-2 flex-none truncate">
                  <MdOutlineAdminPanelSettings size={26} />
                </CollapsibleTrigger>
                <CollapsibleContent className="flex flex-col justify-start gap-3 py-3">
                  <div className="flex flex-col pl-4 gap-3">
                    <div className="flex flex-row items-start justify-start ">
                      <Link
                        className={
                          currentPath === "/dashboard/my-list"
                            ? "flex flex-row items-center justify-center underline underline-offset-8 decoration-primary rounded-2xl "
                            : "flex flex-row items-center justify-center"
                        }
                        href={"/dashboard/my-list"}
                      >
                        <FaUsersViewfinder />
                      </Link>
                    </div>
                    <div className="flex flex-row items-center justify-start text-center">
                      <Link
                        className={
                          currentPath === "/dashboard/my-list"
                            ? "flex flex-row items-center justify-center basis-2/3 underline underline-offset-8 decoration-primary rounded-2xl "
                            : "flex flex-row items-center justify-center"
                        }
                        href={"/dashboard/my-list"}
                      >
                        <IoSettingsOutline />
                      </Link>
                    </div>
                    <div className="flex flex-row items-center justify-start text-center">
                      <Link
                        className={
                          currentPath === "/dashboard/my-list"
                            ? "flex flex-row items-center justify-center basis-2/3 gap-2 underline underline-offset-8 decoration-primary rounded-2xl "
                            : "flex flex-row items-center justify-center gap-2"
                        }
                        href={"/dashboard/my-list"}
                      >
                        <CiBoxList />
                      </Link>
                    </div>
                    <div className="flex flex-row items-center justify-start text-center">
                      <Link
                        className={
                          currentPath === "/dashboard/my-list"
                            ? "flex flex-row items-center justify-center basis-2/3 underline underline-offset-8 decoration-primary rounded-2xl "
                            : "flex flex-row items-center justify-center"
                        }
                        href={"/dashboard/my-list"}
                      >
                        <CgProfile />
                      </Link>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          ) : null}
          {/*  //TODO MAKE THE PERMISSION FOR OWNER SIDE */}
          {session?.user.role == "Owner" ? (
            <div className="flex flex-col gap-4">
              <Collapsible className="flex flex-col">
                <CollapsibleTrigger className="flex justify-center items-center flex-row gap-2 flex-none  truncate">
                  <TbDeviceIpadMinus size={26} />
                </CollapsibleTrigger>
                <CollapsibleContent className="flex flex-col justify-start gap-3 pt-3">
                  <div className="flex flex-col pl-4 gap-3">
                    <div className="flex flex-row items-start justify-start gap-2">
                      <Link
                        className={
                          currentPath === "/dashboard/my-list"
                            ? "flex flex-row items-center justify-center gap-2 underline underline-offset-8 decoration-primary rounded-2xl "
                            : "flex flex-row items-center justify-center gap-2"
                        }
                        href={"/dashboard/my-list"}
                      >
                        <BiCategory />
                      </Link>
                    </div>
                    <div className="flex flex-row items-center justify-start text-center gap-2">
                      <Link
                        className={
                          currentPath === "/dashboard/my-list"
                            ? "flex flex-row items-center justify-center basis-2/3 gap-2 underline underline-offset-8 decoration-primary rounded-2xl "
                            : "flex flex-row items-center justify-center gap-2"
                        }
                        href={"/dashboard/my-list"}
                      >
                        <CiViewColumn />
                      </Link>
                    </div>
                    <div className="flex flex-row items-center justify-start text-center gap-2">
                      <Link
                        className={
                          currentPath === "/dashboard/my-list"
                            ? "flex flex-row items-center justify-center basis-2/3 gap-2 underline underline-offset-8 decoration-primary rounded-2xl "
                            : "flex flex-row items-center justify-center gap-2"
                        }
                        href={"/dashboard/my-list"}
                      >
                        <CiViewList />
                      </Link>
                    </div>
                    <div className="flex flex-row items-center justify-start text-center gap-2">
                      <Link
                        className={
                          currentPath === "/dashboard/my-list"
                            ? "flex flex-row items-center justify-center basis-2/3 gap-2 underline underline-offset-8 decoration-primary rounded-2xl "
                            : "flex flex-row items-center justify-center gap-2"
                        }
                        href={"/dashboard/my-list"}
                      >
                        <GoVideo />
                      </Link>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          ) : null}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <main className="flex w-full flex-row text-xl p-3 gap-7 group-data-[collapsible=icon]:hidden">
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
        </main>
        <main className="text-xl py-3 gap-4 group-data-[collapsible=icon]:block hidden">
          <Avatar>
            <AvatarImage src={session?.user?.image as string} />
            <AvatarFallback>TA</AvatarFallback>
          </Avatar>
        </main>
      </SidebarFooter>
    </Sidebar>
  );
}
