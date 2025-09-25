export const dynamic = "force-dynamic";

import TablePagination from "@/components/dashboard/DashboardComponent/TablePagination/TablePagination";
import FilterProductSidebar from "@/components/shop/FilterProduct";
import ShopAllProducts from "@/components/shop/ShopAllProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllProduct } from "@/services/product";
import React, { Suspense } from "react";

const AllProductsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ searchItem: string }>;
}) => {
  const resolvedSearchParams = await searchParams;

  const searchParamsWithLimit = { ...resolvedSearchParams };

  const { data: products, meta } = await getAllProduct(searchParamsWithLimit);

  return (
    <div className="px-4 md:px-8 py-6 bg-background min-h-screen my-16">
      <div className="flex flex-col md:flex-row gap-8 mt-2">
        {/* Left Sidebar Filter */}
        <div className="md:w-[280px] w-full md:sticky md:top-24 self-start">
          <FilterProductSidebar />
        </div>

        {/* Product Grid or Fallback */}
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <TablePagination totalPage={meta?.totalPage} />
            {/* <LimitDropDown /> */}
          </div>
          <Suspense
            fallback={
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="flex flex-col space-y-3">
                    <Skeleton className="h-[125px] w-full rounded-xl bg-[#ebeff1d3]" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full bg-[#ebeff1d3]" />
                      <Skeleton className="h-4 w-3/4 bg-[#ebeff1d3]" />
                    </div>
                  </div>
                ))}
              </div>
            }
          >
            {products?.length ? (
              <ShopAllProducts products={products} meta={meta} />
            ) : (
              <p className="text-center text-3xl text-red-600 my-12">
                No products found
              </p>
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default AllProductsPage;
