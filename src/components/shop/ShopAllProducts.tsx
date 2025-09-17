"use client";

import React, { useState } from "react";

import { usePathname } from "next/navigation";
import { TMedicineResponse } from "@/types/product";
import { IMeta } from "@/types/meta";
import MedicineCard from "./ProductCard";

const ShopAllProducts = ({
  medicines,
  meta,
}: {
  medicines: TMedicineResponse[];
  meta: IMeta;
}) => {
  const pathname = usePathname();

  return (
    <div className={``}>
      <div
        className={`grid grid-cols-1 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2 md:gap-4`}
      >
        {medicines.map((medicine: TMedicineResponse, index) => (
          <MedicineCard key={index} medicine={medicine} />
        ))}
      </div>
    </div>
  );
};

export default ShopAllProducts;
