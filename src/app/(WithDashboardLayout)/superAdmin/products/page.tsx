export const dynamic = "force-dynamic";

import ManageProductBySuperAdmin from "@/components/dashboard/superAdmin/ManageProducts/ManageProductsBySuperAdmin";
import { getAllProduct } from "@/services/product";
import React from "react";

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ searchItem: string }>;
}) => {
  const resolvedSearchParams = await searchParams;

  // Merge searchParams with a default 'limit' if not present
  const searchParamsWithLimit = { ...resolvedSearchParams };

  const { data: products, meta } = await getAllProduct(searchParamsWithLimit);

  return (
    <div className=" w-full">
      <ManageProductBySuperAdmin data={products} meta={meta} />
    </div>
  );
};

export default ProductsPage;
