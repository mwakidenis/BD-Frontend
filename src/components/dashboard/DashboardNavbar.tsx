"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SidebarTrigger } from "../ui/sidebar";
import { logout } from "@/services/auth";
import { clearCart } from "@/redux/features/cartSlice";
import { useDispatch } from "react-redux";
import { protectedRoutes } from "@/constants";
import { useUser } from "@/context/UserContext";
import { ProfileDropDown } from "../home/ProfileDropDown";

const navItems = [
  { name: "Home", href: "/dashboard" },
  { name: "Orders", href: "/dashboard/orders" },
  { name: "Products", href: "/dashboard/products" },
  { name: "Settings", href: "/dashboard/settings" },
];

export function DashboardNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function formatPath(path: string) {
    const segments = path.split("/").filter(Boolean);
    const last = segments[segments.length - 1];
    return last ? last[0].toUpperCase() + last.slice(1) : "";
  }

  const dispatch = useDispatch();
  const router = useRouter();

  const { user, setUser, setIsLoading } = useUser();

  const handleLogOut = () => {
    setUser(null);
    logout();
    dispatch(clearCart());
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };
  return (
    <header className="w-full border-b bg-white dark:bg-zinc-900 dark:border-zinc-700 px-4 py-3 flex items-center justify-start space-x-8 sm:space-x-14">
      {/* Logo */}

      <p className="flex justify-items-start items-center gap-4  text-md font-semibold">
        <SidebarTrigger /> {formatPath(pathname)}
      </p>
      {/* <ThemeToggle /> */}
      {user?.email && (
        <ProfileDropDown user={user} handleLogOut={handleLogOut} />
      )}
    </header>
  );
}
