"use client";

import React, { useMemo, useRef } from "react";
import Slider, { Settings } from "react-slick";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { useGetProductsQuery } from "@/store/productsApi";
import ProductCard from "@/app/components/ProductCard";

const NewOffer = () => {
  const sliderRef = useRef<Slider | null>(null);

  const { data: products = [], isLoading, isError } = useGetProductsQuery();

  console.log("products", products);

  const newOfferProducts = useMemo(() => {
    return products.filter((product) => {
      if (!product.section) return false;

      const sections = Array.isArray(product.section)
        ? product.section
        : [product.section];

      return sections.some(
        (section) =>
          typeof section === "string" &&
          section.toLowerCase().replace(/\s+/g, "") === "newoffers",
      );
    });
  }, [products]);

  const SLIDES_TO_SHOW = 5;

  const settings: Settings = {
    dots: false,
    arrows: false,
    infinite: newOfferProducts.length > SLIDES_TO_SHOW,
    speed: 550,
    slidesToShow: SLIDES_TO_SHOW,
    slidesToScroll: 1,
    swipeToSlide: true,
    cssEase: "ease-in-out",

    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  if (isLoading) {
    return (
      <section className="w-full bg-white py-5 dark:bg-[#111]">
        <p className="text-center text-sm text-gray-500">Loading...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="w-full bg-white py-5 dark:bg-[#111]">
        <p className="text-center text-sm text-red-500">Something went wrong</p>
      </section>
    );
  }

  if (newOfferProducts.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-white py-5 dark:bg-[#111]">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        {/* HEADER */}
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-[14px] font-extrabold text-[#151515] sm:text-[22px] dark:text-white">
              New Offers
            </h2>

            <p className="mt-1 text-[11px] text-gray-500 sm:text-xs">
              Discover our latest products and exclusive deals
            </p>
          </div>

          {/* ARROWS */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              aria-label="Previous products"
              onClick={() => sliderRef.current?.slickPrev()}
              className="
                flex h-8 w-8 cursor-pointer items-center justify-center
                rounded-lg border border-gray-200 bg-white
                text-gray-600 shadow-sm transition-all
                hover:border-[#ffd83d]
                hover:bg-[#fff8dc]
                hover:text-black
                sm:h-9 sm:w-9
                lg:h-10 lg:w-10
                dark:border-gray-700
                dark:bg-[#1b1b1b]
                dark:text-white
              "
            >
              <FiChevronLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              aria-label="Next products"
              onClick={() => sliderRef.current?.slickNext()}
              className="
                flex h-8 w-8 cursor-pointer items-center justify-center
                rounded-lg bg-[#ffd83d] text-black
                shadow-[0_3px_10px_rgba(255,216,61,0.18)]
                transition-all
                hover:bg-[#ffcf0f]
                sm:h-9 sm:w-9
                lg:h-10 lg:w-10
              "
            >
              <FiChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="mb-5 border-b border-dashed border-[#f2d66b]" />

        {/* PRODUCTS */}
        <div className="-mx-2">
          <Slider ref={sliderRef} {...settings}>
            {newOfferProducts.map((product) => (
              <div key={product._id} className="px-2 pb-3">
                <ProductCard product={product} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewOffer;
