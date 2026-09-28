import React from "react";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import ProductTabs from "./ProductTabs";

const ProductDetails = () => {
  return (
    <section className="bg-white py-6 dark:bg-[#0a0a0a] sm:py-8 lg:py-10">
      <div className="mx-auto w-full max-w-362.5 px-4 sm:px-6 lg:px-8">
        {/* Top Product Section */}
        <div
          className="
            grid
            grid-cols-1
            gap-6
            lg:grid-cols-[0.9fr_1.1fr]
            lg:gap-10
            xl:grid-cols-[1fr_1fr]
          "
        >
          {/* Product Images */}
          <div>
            <ProductImages />
          </div>

          {/* Product Information */}
          <div>
            <ProductInfo />
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-8 sm:mt-10 lg:mt-12">
          <div>
            <ProductTabs />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
