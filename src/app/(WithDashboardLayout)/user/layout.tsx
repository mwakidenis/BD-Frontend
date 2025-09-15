"use client";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Home,
  ContactRound,
  ShoppingBag,
  Book,
  User2,
  ShoppingCart,
  Pen,
  Shield,
} from "lucide-react";
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "User Profile",
    url: "/user/profile",
    icon: User2,
  },
  {
    title: "Orders",
    url: "/user/orders",
    icon: ShoppingBag,
  },
  {
    title: "Checkout",
    url: "/user/checkout",
    icon: ShoppingCart,
  },
  {
    title: "Update Profile",
    url: "/user/update-profile",
    icon: Pen,
  },
  {
    title: "Change Passoword",
    url: "/user/change-password",
    icon: Shield,
  },
];

export default function UserDashboardLayout({
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
        <div className="p-2 pt-0">{children}</div>
      </main>
    </SidebarProvider>
  );
}
