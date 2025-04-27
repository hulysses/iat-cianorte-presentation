import { ReactNode } from "react";
import { Sidebar } from "@/components/sidebar";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <Sidebar>{children}</Sidebar>;
}
