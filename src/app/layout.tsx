import { AppSidebar } from "@/app/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import Header from "./header/header";

export default function Layout() {
  const sidebar_state = `${document.cookie}`.split(`sidebar_state=`);
  const def = sidebar_state.length > 1 ? sidebar_state[1] === "true" : false;

  return (
    <SidebarProvider defaultOpen={def}>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="p-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
