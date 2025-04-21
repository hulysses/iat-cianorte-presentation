"use client";

import {
  Users,
  Home,
  SmilePlus,
  ShoppingBasket,
  ShoppingCart,
  Truck,
  ArrowLeftRight,
  LogOut,
} from "lucide-react";
import Logo from "../assets/logo.png";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "./ui/button";

const items = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "Usuários",
    url: "/homes",
    icon: Users,
  },
];

export function AppSidebar() {
  const handleLogout = () => {
    localStorage.removeItem("authToken");
  };

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="bg-white">
        <SidebarHeader className="h-[140px] bg-blue flex items-center justify-center transition-all duration-500 ease-in-out group-data-[collapsible=icon]:h-[47px] overflow-hidden">
          <div className="w-full h-full flex items-center justify-center transition-all duration-500 ease-in-out group-data-[collapsible=icon]:w-[80px] group-data-[collapsible=icon]:h-[80px]">
            <Image
              src={Logo}
              alt="Logo"
              className="max-w-full max-h-full object-contain transition-all duration-500 ease-in-out opacity-100 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:scale-75 absolute"
            />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="gap-7">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <button className="text-xl text-blue flex items-center">
                        <item.icon />
                        <span>{item.title}</span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <Button
            onClick={handleLogout}
            className="flex justify-center items-center text-xl text-red-800 cursor-pointer"
          >
            <LogOut className="flex-shrink-0 w-4" />
            <span className="group-data-[collapsible=icon]:hidden">Sair</span>
          </Button>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}
