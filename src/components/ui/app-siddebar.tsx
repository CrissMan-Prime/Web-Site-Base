"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  useSidebar
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

import { CgProfile } from "react-icons/cg";
import { GoHistory } from "react-icons/go";
import { FaList } from "react-icons/fa";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
/* import { TbDeviceIpadMinus } from "react-icons/tb"; */
import { FaUsersViewfinder } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { CiBoxList } from "react-icons/ci";

import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
/* import { BiCategory } from "react-icons/bi";
import { CiViewColumn } from "react-icons/ci";
import { CiViewList } from "react-icons/ci";
import { GoVideo } from "react-icons/go"; */
import Sidebar_Profile from "./sidebar_profile";

const PageUserList = [
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: CgProfile,
  },
  {
    title: "History",
    url: "/dashboard/history",
    icon: GoHistory,
  },
  {
    title: "My List",
    url: "/dashboard/my-list",
    icon: FaList,
  },
];

const DropDownList = [
  {
    title: "Administrative Side",
    icon: MdOutlineAdminPanelSettings,
    category: "admin",
  },
];
const DD_Item_List = [
  {
    title: "Role Administaror",
    category: "admin",
    url: "/dashboard/admin/role-administrator",
    icon: FaUsersViewfinder,
  },
  {
    title: "Site Settings",
    category: "admin",
    url: "/dashboard/admin/role",
    icon: IoSettingsOutline,
  },
  {
    title: "Page List",
    category: "admin",
    url: "/dashboard/admin/role",
    icon: CiBoxList,
  },
  {
    title: "User",
    category: "admin",
    url: "/dashboard/admin/role",
    icon: CgProfile,
  },
];

export function AppSidebar() {
  const currentPath = usePathname();
  const { data: session } = useSession();
 const {
    setOpenMobile,
  } = useSidebar()
  return (
    <Sidebar collapsible="icon" className="bg-card">
      <SidebarHeader className="flex items-center justify-center ">
        <Link
          href={"/"}
          className="group-data-[collapsible=icon]:hidden text-2xl pt-5 flex-none font-bold truncate"
        >
          {process.env.NEXT_PUBLIC_SITE_NAME}
        </Link>
        <Image
          alt=""
          className="group-data-[collapsible=icon]:block hidden"
          src={
            "https://media.discordapp.net/attachments/1362055620785733662/1376177224763441293/Untitled.png?ex=6844db2a&is=684389aa&hm=09534c86b0f2e66689cf157ed3180eef83bc875a47f7372c60aba948989dabd7&=&format=webp&quality=lossless&width=832&height=832"
          }
          width={40}
          height={40}
        />
      </SidebarHeader>
      <div className="flex justify-center">
        <div className="h-[2px] w-[80%] bg-secondary" />
      </div>
      <SidebarContent>
        <SidebarGroup className="flex text-xl gap-4 group-data-[collapsible=icon]:hidden">
          {PageUserList.map((link, index) => (
            <Link
              key={index}
              className={
                currentPath === link.url
                  ? "flex flex-row items-center justify-center gap-2 underline underline-offset-8 decoration-primary rounded-2xl "
                  : "flex flex-row items-center justify-center gap-2"
              }
              href={link.url}
              onClick={() => { setOpenMobile(false)}}
            >
              <link.icon /> {link.title}
            </Link>
          ))}

          {session?.user.role == "Owner" ? (
            <div className="flex flex-col gap-4">
              <div className="flex justify-center py-2">
                <div className="h-[2px] w-[80%] bg-secondary" />
              </div>
              {DropDownList.map((dList, dindex) => (
                <Collapsible className="flex flex-col" key={dindex}>
                  <CollapsibleTrigger className="flex justify-center items-center flex-row gap-2 flex-none truncate">
                    <dList.icon size={26} /> {dList.title}
                  </CollapsibleTrigger>
                  {DD_Item_List.map((diList, diIndex) => {
                    if (dList.category == diList.category) {
                      return (
                        <CollapsibleContent
                          key={diIndex}
                          className="flex flex-col justify-start gap-3 pt-3"
                        >
                          <div className="pl-10 ">
                            <div className="flex flex-row items-center justify-start gap-2">
                              <diList.icon />
                              <Link
                                className={
                                  currentPath === diList.url
                                    ? "flex flex-row items-center justify-center gap-2 underline underline-offset-8 decoration-primary rounded-2xl "
                                    : "flex flex-row items-center justify-center gap-2"
                                }
                                href={diList.url}
                                onClick={() => { setOpenMobile(false)}}
                              >
                                {diList.title}
                              </Link>
                            </div>
                          </div>
                        </CollapsibleContent>
                      );
                    }
                  })}
                </Collapsible>
              ))}
            </div>
          ) : null}
        </SidebarGroup>

        <SidebarGroup className="text-xl gap-4 group-data-[collapsible=icon]:block hidden">
          {PageUserList.map((link, index) => (
            <div key={index} className="py-1">
              <Link
                className={
                  currentPath === link.url
                    ? "flex flex-row items-center justify-center gap-2 underline underline-offset-8 decoration-primary rounded-2xl "
                    : "flex flex-row items-center justify-center gap-2"
                }
                href={link.url}
              >
                <link.icon />
              </Link>
            </div>
          ))}

          {session?.user.role == "Owner" ? (
            <div className="flex flex-col gap-4">
              <div className="flex justify-center py-2">
                <div className="h-[2px] w-[80%] bg-border" />
              </div>
              {DropDownList.map((dList, dindex) => (
                <Collapsible className="flex flex-col" key={dindex}>
                  <CollapsibleTrigger className="flex justify-center items-center flex-row gap-2 flex-none truncate">
                    <dList.icon size={26} />
                  </CollapsibleTrigger>
                  {DD_Item_List.map((diList, diIndex) => {
                    if (dList.category == diList.category) {
                      return (
                        <CollapsibleContent
                          key={diIndex}
                          className="flex flex-col justify-start gap-3 pt-3"
                        >
                          <div className="flex flex-row items-center justify-center gap-2">
                            <Link
                              className={
                                currentPath === diList.url
                                  ? "flex flex-row items-center justify-center gap-2 underline underline-offset-8 decoration-primary rounded-2xl "
                                  : "flex flex-row items-center justify-center gap-2"
                              }
                              href={diList.url}
                            >
                              <diList.icon />
                            </Link>
                          </div>
                        </CollapsibleContent>
                      );
                    }
                  })}
                </Collapsible>
              ))}
            </div>
          ) : null}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Sidebar_Profile />
      </SidebarFooter>
    </Sidebar>
  );
}
