"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../lib/utils";

type NavigationLinkProps = {
  path: string;
  route: string;
};

export default function NavigationLink({ path, route }: NavigationLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <Link
      href={path}
      className={cn(
        "text-[#1F2937] hover:text-[#19053e] transition-colors",
        isActive && "text-[#1c0474] font-semibold"
      )}
    >
      {route}
    </Link>
  );
}
