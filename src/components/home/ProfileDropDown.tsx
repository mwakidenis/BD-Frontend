import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// import { categories } from "./DynamicCategories";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

// https://i.ibb.co.com/jsFdJL6/riaz.webp

export function ProfileDropDown({
  user,
  handleLogOut,
}: {
  user: { name: string; role: string };
  handleLogOut: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="border-[1px] bg-background border-white cursor-pointer w-9 h-9">
          <AvatarImage src="https://github.com/shadcn.png" alt={user.name} />
          <AvatarFallback>
            {user.name && (
              <div className="hidden md:flex items-center">
                <Badge>{user.name.toUpperCase()}</Badge>
              </div>
            )}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          <p className="text-center group flex">{user.name.toUpperCase()}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {user.role === "user" ? (
            <>
              {[
                {
                  title: "Profile",
                  link: "/user/profile",
                },
                {
                  title: "Orders",
                  link: "/user/orders",
                },
                {
                  title: "Update Profile",
                  link: "/user/update-profile",
                },
                {
                  title: "Change Password",
                  link: "/user/change-password",
                },
              ].map((item, idx) => (
                <DropdownMenuItem key={idx} className="cursor-pointer group ">
                  <Link href={item.link}>{item.title}</Link>
                </DropdownMenuItem>
              ))}
            </>
          ) : (
            <>
              {[
                {
                  title: "Dashboard",
                  link: "/admin/dashboard",
                },
                {
                  title: "Products",
                  link: "/admin/medicines",
                },
                {
                  title: "Create Product",
                  link: "/admin/create-medicine",
                },
                {
                  title: "Orders",
                  link: "/admin/orders",
                },
                {
                  title: "Users",
                  link: "/admin/users",
                },
                {
                  title: "Prescriptions review",
                  link: "/admin/prescription-review",
                },
              ].map((item, idx) => (
                <DropdownMenuItem key={idx} className="cursor-pointer group">
                  <Link href={item.link}>{item.title}</Link>
                </DropdownMenuItem>
              ))}
            </>
          )}

          <DropdownMenuItem className="cursor-pointer">
            <Button
              onClick={handleLogOut}
              className="bg-amber-600 hover:bg-amber-600 cursor-pointer"
            >
              Logout
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
