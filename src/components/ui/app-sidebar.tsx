"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut, User } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import { format } from "date-fns";
// import { logoutUser } from "@/services/auth"; // Uncomment when available

type TItem = {
  title: string;
  url: string;
  icon: React.ElementType;
};

export function AppSidebar({ items }: { items: TItem[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const userContext = useUser();

  // Safely destructure with fallbacks
  const user = userContext?.user || null;
  const setUser = userContext?.setUser || (() => {});
  const setIsLoading = userContext?.setIsLoading || (() => {});

  // Temporarily disabled lastLogin until user type includes iat
  // const lastLogin = user?.iat ? new Date(Number(user.iat) * 1000) : null;
  const lastLogin = null;

  const handleLogout = async () => {
    try {
      setIsLoading(true);

      // Call logout API if available
      // await logoutUser();

      setUser(null);
      toast.success("Logged out successfully", { duration: 1400 });
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-semibold py-6">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              SoptokBD
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-4 bg-black/5 py-4 rounded-lg">
              {items.map((item: TItem) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={`${
                        pathname === item.url
                          ? "text-primary font-semibold bg-primary/10"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      } transition-colors duration-200`}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Enhanced User Section */}
      <SidebarFooter className="border-t border-gray-200 dark:border-gray-700 p-4">
        {user ? (
          <SidebarGroup>
            <div className="space-y-4">
              {/* User Avatar and Basic Info */}
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
                  <AvatarImage alt={user?.name || "User"} />
                  <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/40 text-primary font-semibold">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user?.email || "No email"}
                  </p>
                </div>
              </div>

              {/* User Details */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Role:
                  </span>
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-full capitalize font-medium">
                    {user?.role || "User"}
                  </span>
                </div>

                {lastLogin && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Last Login:
                    </span>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {format(lastLogin, "MMM dd, HH:mm")}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Status:
                  </span>
                  <span className="text-green-600 flex items-center gap-1 font-medium">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Online
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                {/* Logout Button */}
                <SidebarMenuButton
                  onClick={handleLogout}
                  className="cursor-pointer w-full bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 border border-red-200 dark:border-red-800 rounded-md transition-colors duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="font-medium">Logout</span>
                </SidebarMenuButton>
              </div>
            </div>
          </SidebarGroup>
        ) : (
          /* Guest User State */
          <SidebarGroup>
            <div className="space-y-3 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Not signed in
              </p>
              <div className="space-y-2">
                <SidebarMenuButton asChild className="w-full">
                  <Link
                    href="/login"
                    className="flex items-center justify-center gap-2 px-3 py-2 text-sm bg-primary text-white hover:bg-primary/90 rounded-md transition-colors"
                  >
                    Login
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuButton asChild className="w-full">
                  <Link
                    href="/signup"
                    className="flex items-center justify-center gap-2 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
                  >
                    Sign Up
                  </Link>
                </SidebarMenuButton>
              </div>
            </div>
          </SidebarGroup>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
