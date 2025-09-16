export const dynamic = "force-dynamic";

import ManageProduct from "@/components/dashboard/admin/ManageProducts/ManageProducts";
import { getAllMedicine } from "@/services/product";
import React from "react";

const MedicinesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ searchItem: string }>;
}) => {
  const resolvedSearchParams = await searchParams;

  // Merge searchParams with a default 'limit' if not present
  const searchParamsWithLimit = { ...resolvedSearchParams };

  const { data: medicines, meta } = await getAllMedicine(searchParamsWithLimit);

  return (
    <div className=" w-full">
      <ManageProduct data={medicines} meta={meta} />
    </div>
  );
};

export default MedicinesPage;
