// export const dynamic = "force-dynamic";

import Banner from "@/components/home/Banner";
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
    </main>
  );
};

export default HomePage;
