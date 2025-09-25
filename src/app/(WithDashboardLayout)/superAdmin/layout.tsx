"use client";

import { DashboardNavbar } from "@/components/dashboard/DashboardComponent/DashboardNabbar/DashboardNavbar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Home,
  Pill,
  Pen,
  ShoppingBag,
  Users,
  Book,
  BookCopy,
  ShieldUser,
  ShoppingBasket,
  Image,
} from "lucide-react";
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Super Admin Dashboard",
    url: "/superAdmin/dashboard",
    icon: ShieldUser,
  },
  {
    title: "Update UI",
    url: "/superAdmin/updateBanner",
    icon: Image,
  },
  {
    title: "Manage Products",
    url: "/superAdmin/products",
    icon: ShoppingBasket,
  },

  {
    title: "Manage Orders",
    url: "/superAdmin/orders",
    icon: ShoppingBag,
  },
  {
    title: "Manage Users",
    url: "/superAdmin/users",
    icon: Users,
  },
];

export default function SuperAdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="min-h-screen">
      <AppSidebar items={items} />
      <main className="bg-white w-full dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
        <div className="flex justify-start gap-6 items-center">
          <DashboardNavbar />
        </div>
        <div className="p-4 pt-0">{children}</div>
      </main>
    </SidebarProvider>
  );
}
