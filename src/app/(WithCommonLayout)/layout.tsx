"use client";

import Navbar from "@/components/home/Navbar";
import { usePathname } from "next/navigation";
import React from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className=" relative">{children}</div>
    </main>
  );
};

export default CommonLayout;
