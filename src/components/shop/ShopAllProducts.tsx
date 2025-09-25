"use client";

import React, { useState } from "react";

import { usePathname } from "next/navigation";
import { TProductResponse } from "@/types/product";
import { IMeta } from "@/types/meta";
import ProductCard from "./ProductCard";

const ShopAllProducts = ({
  products,
  meta,
}: {
  products: TProductResponse[];
  meta: IMeta;
}) => {
  const pathname = usePathname();

  return (
    <div className={``}>
      <div
        className={`grid grid-cols-1 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2 md:gap-4`}
      >
        {products.map((product: TProductResponse, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ShopAllProducts;
