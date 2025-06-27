import { AppSidebar } from "@/components/ui/app-siddebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  const session = await auth();
  if (!session?.user) redirect("/");
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <main className="flex flex-row w-screen h-screen max-h-full">
        <div className="h-full">
          <AppSidebar />
        </div>

        <div className="w-full h-full">
          <SidebarTrigger />
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
