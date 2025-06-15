import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/admin/admin-home/app-sidebar"


export default function Layout({
  children,
}) {
  return (
      <SidebarProvider>
      <AppSidebar />
      <main className="min-w-screen min-h-screen flex flex-col">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}



