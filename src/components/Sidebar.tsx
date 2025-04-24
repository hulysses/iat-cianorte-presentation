"use client";

import { ReactNode } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";

export function Sidebar({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-w-screen min-h-screen">
        <AppSidebar />
        <SidebarInset>
          <div className="p-4">
            <SidebarTrigger className="mb-4" />
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
