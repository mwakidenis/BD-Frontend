"use client";

import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
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
} from "lucide-react";
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Admin Dashboard",
    url: "/admin/dashboard",
    icon: ShieldUser,
  },
  {
    title: "All Products",
    url: "/admin/medicines",
    icon: ShoppingBasket,
  },

  {
    title: "Create Product",
    url: "/admin/create-product",
    icon: Pen,
  },

  {
    title: "Manage Orders",
    url: "/admin/orders",
    icon: ShoppingBag,
  },
  {
    title: "Manage Users",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Prescriptions Review",
    url: "/admin/prescription-review",
    icon: Book,
  },
];

export default function AdminDashboardLayout({
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
