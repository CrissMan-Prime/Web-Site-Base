import { AppSidebar } from "@/components/ui/app-siddebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cookies } from "next/headers"

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <main className="flex w-screen h-screen max-h-full">
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
