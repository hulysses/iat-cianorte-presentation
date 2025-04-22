"use client";

import { Users, Home, LogOut } from "lucide-react";
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
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const items = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "Usuários",
    url: "/users",
    icon: Users,
  },
];

export function AppSidebar() {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error("Erro ao sair do sistema.");
      console.log(error.message);
      return;
    }
    if (!error) {
      router.push("/users");
    }
  };

  return (
    <Sidebar collapsible="icon" className="bg-white">
      <SidebarHeader
        className="h-[70px] bg-blue flex items-center justify-center transition-all duration-500 ease-in-out
        group-data-[collapsible=icon]:h-[47px] overflow-hidden"
      >
        <Image
          src={Logo}
          alt="Logo"
          className="w-14 object-contain transition-all duration-500 ease-in-out opacity-100 
          group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:scale-75 absolute"
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    onClick={() => router.push(item.url)}
                  >
                    <a className="text-primary">
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
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
          className="flex justify-center items-center bg-transparent text-red-800 cursor-pointer hover:bg-transparent"
        >
          <LogOut className="flex-shrink-0 w-4" />
          <span className="group-data-[collapsible=icon]:hidden">Sair</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
