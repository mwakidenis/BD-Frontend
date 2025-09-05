// export const dynamic = "force-dynamic";

import Banner from "@/components/home/Banner";
import Categories from "@/components/home/Categories";
import ExploreNow from "@/components/home/ExploreNow";
import ProductSection from "@/components/home/Products";
import ProductShowcase from "@/components/home/ProductShowcase";
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
        <ExploreNow />
      </div>
    </main>
  );
};

export default HomePage;
