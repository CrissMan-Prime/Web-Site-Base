"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import {
  UserCog,
  UserCircle,
  History,
  ListOrdered,
  Cog,
  List,
  ShieldCheck,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Sidebar_Profile from "./sidebar_profile";
import { useEffect, useState } from "react";

const PageUserList = [
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: UserCircle,
  },
  {
    title: "History",
    url: "/dashboard/history",
    icon: History,
  },
  {
    title: "My List",
    url: "/dashboard/my-list",
    icon: ListOrdered,
  },
];

const DropDownList = [
  {
    title: "Administrative Side",
    icon: ShieldCheck,
    category: "admin",
  },
];

const DD_Item_List = [
  {
    title: "User Administrator",
    category: "admin",
    url: "/dashboard/admin/user-administrator",
    icon: UserCog,
  },
  {
    title: "Site Settings",
    category: "admin",
    url: "/dashboard/admin/site_settings",
    icon: Cog,
  },
  {
    title: "Page List",
    category: "admin",
    url: "/dashboard/admin/page_list",
    icon: List,
  },
];

export function AppSidebar() {
  const currentPath = usePathname();
  const { data: session } = useSession();
  const { setOpenMobile } = useSidebar();
  const [siteData, setSiteData] = useState<SiteSettingsType[]>([]);
  const [loading, setLoading] = useState(true);
  async function fetchSiteSettings() {
    const res = await fetch("/api/site_settings");
    const data = await res.json();
    setSiteData(data.message);
  }

  function Timeout() {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }

  useEffect(() => {
    Timeout();
    fetchSiteSettings();
  }, []);

  if (loading) {
    return null;
  }
  return (
    <Sidebar collapsible="icon" className="bg-card">
      <SidebarHeader className="flex items-center justify-center">
        <Link
          href={"/"}
          className="group-data-[collapsible=icon]:hidden text-2xl pt-5 flex-none font-bold truncate"
        >
          {siteData.map((data) => data.name)}
        </Link>
        <Image
          alt=""
          className="group-data-[collapsible=icon]:block hidden"
          src={
            "https://cdn.discordapp.com/attachments/1362055620785733662/1376177224763441293/Untitled.png?ex=685e906a&is=685d3eea&hm=4a5353fc0a23b3395b4ada9bdab66fa2ba6b5533e34e02c4f14cdf7625d9d1d7&"
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
                  ? `flex flex-row items-center justify-center decoration-primary gap-2 underline underline-offset-8 bg rounded-2xl`
                  : "flex flex-row items-center justify-center gap-2"
              }
              href={link.url}
              onClick={() => {
                setOpenMobile(false);
              }}
            >
              <link.icon /> {link.title}
            </Link>
          ))}

          {session?.user.role == "Owner" ? (
            <div className="flex flex-col gap-4">
              <div className="flex justify-center py-2">
                <div className="h-[2px] w-[80%] bg-secondary" />
              </div>
              {DropDownList.map((dList, dIndex) => (
                <Collapsible className="flex flex-col" key={dIndex}>
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
                                onClick={() => {
                                  setOpenMobile(false);
                                }}
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
              {DropDownList.map((dList, dIndex) => (
                <Collapsible className="flex flex-col" key={dIndex}>
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
