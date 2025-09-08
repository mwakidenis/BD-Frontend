// export const dynamic = "force-dynamic";

import Banner from "@/components/home/Banner";
import BestSellingProducts from "@/components/home/BestSellingProducts";
import Categories from "@/components/home/Categories";
import ExploreNow from "@/components/home/ExploreNow";
import NewArrivalsSection from "@/components/home/NewArrivals";
import ProductSection from "@/components/home/Products";
import ProductShowcase from "@/components/home/ProductShowcase";
import ShopNow from "@/components/home/ShopWithLogin";
import React from "react";

const HomePage = async () => {
  return (
    <main>
      <div>
        <Banner />
      </div>
      <div>
        <ProductShowcase />
      </div>
      <div>
        <Categories />
      </div>
      <div>
        <ProductSection />
      </div>
      <div>
        <ShopNow />
      </div>
      <div>
        <NewArrivalsSection />
      </div>
      <div>
        <BestSellingProducts />
      </div>
      <div>
        <ExploreNow />
      </div>
    </main>
  );
};

export default HomePage;
