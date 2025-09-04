"use client";

import Navbar from "@/components/home/Navbar";
import Footer from "@/components/Shared/Footer";
import React from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <div>
        <Navbar />
      </div>

      <div className=" relative">{children}</div>
      <div>
        <Footer />
      </div>
    </main>
  );
};

export default CommonLayout;
