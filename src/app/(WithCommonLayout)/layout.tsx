"use client";

import Navbar from "@/components/home/Navbar";
import { usePathname } from "next/navigation";
import React from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Navbar />
      <div className=" relative">{children}</div>
    </main>
  );
};

export default CommonLayout;
