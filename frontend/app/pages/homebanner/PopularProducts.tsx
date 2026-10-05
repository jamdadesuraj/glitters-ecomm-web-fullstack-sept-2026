"use client";

import React, { useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ProductCard from "@/app/components/ProductCard";
import { useGetTopSaleBannerQuery } from "@/store/topSaleBannerApi";
import { useGetProductsQuery } from "@/store/productsApi";

const PopularProducts = () => {
  const {
    data: products = [],
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useGetProductsQuery();

  const popularProducts = useMemo(() => {
    return products.filter((product) => {
      if (!product.section) return false;

      const sections = Array.isArray(product.section)
        ? product.section
        : [product.section];

      return sections.some(
        (section) =>
          typeof section === "string" &&
          section.toLowerCase().replace(/\s+/g, "") === "popularproducts",
      );
    });
  }, [products]);

  const sliderRef = useRef<Slider | null>(null);

  const {
    data: topSaleBanner = [],
    isLoading,
    isError,
  } = useGetTopSaleBannerQuery();

  const firstBanner = topSaleBanner?.[0]?.offerBannerImg1 || "";
  const secondBanner = topSaleBanner?.[0]?.offerBannerImg2 || "";

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 550,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    swipe: true,
    swipeToSlide: true,
    draggable: true,
    cssEase: "ease-in-out",

    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1.5,
        },
      },
    ],
  };

  // Keep hooks above conditional returns
  if (isLoading) {
    return (
      <section className="w-full bg-white py-5 dark:bg-[#111]">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div className="h-75 animate-pulse rounded-2xl bg-gray-100 dark:bg-[#171717]" />
        </div>
      </section>
    );
  }

  if (isError) {
    return null;
  }

  if (isProductsLoading) {
    return (
      <section className="w-full bg-white py-5 dark:bg-[#111]">
        <p className="text-center text-sm text-gray-500">Loading...</p>
      </section>
    );
  }

  if (isProductsError) {
    return (
      <section className="w-full bg-white py-5 dark:bg-[#111]">
        <p className="text-center text-sm text-red-500">Something went wrong</p>
      </section>
    );
  }

  return (
    <section className="w-full bg-white py-5 dark:bg-[#111]">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        {/* MAIN LAYOUT */}
        <div
          className="
            grid
            grid-cols-1
            gap-5
            xl:grid-cols-[minmax(0,1fr)_220px]
            xl:items-stretch
          "
        >
          {/* PRODUCTS */}
          <div className="min-w-0 h-full">
            <div
              className="
                h-full
                overflow-hidden
                rounded-2xl
                border
                border-gray-100
                bg-white
                p-4
                dark:border-gray-800
                dark:bg-[#171717]
                sm:p-5
              "
            >
              {/* HEADER */}
              <div className="mb-4 flex items-end justify-between gap-4">
                <div>
                  <h2
                    className="
                      font-serif
                      text-[14px]
                      font-extrabold
                      text-[#151515]
                      sm:text-[22px]
                      dark:text-white
                    "
                  >
                    Popular Products
                  </h2>

                  <p className="mt-1 text-xs text-gray-500">
                    Discover our latest products and exclusive deals
                  </p>
                </div>

                {/* SLIDER CONTROLS */}
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    aria-label="Previous products"
                    onClick={() => sliderRef.current?.slickPrev()}
                    className="
                      flex h-9 w-9 cursor-pointer
                      items-center justify-center
                      rounded-lg border border-gray-200
                      bg-white text-gray-600
                      transition
                      hover:border-[#ffd83d]
                      hover:bg-[#fff8dc]
                      hover:text-black
                      dark:border-gray-700
                      dark:bg-[#222]
                      dark:text-white
                    "
                  >
                    <FiChevronLeft size={17} />
                  </button>

                  <button
                    type="button"
                    aria-label="Next products"
                    onClick={() => sliderRef.current?.slickNext()}
                    className="
                      flex h-9 w-9 cursor-pointer
                      items-center justify-center
                      rounded-lg
                      bg-[#ffd83d]
                      text-black
                      transition
                      hover:bg-[#ffcf0f]
                    "
                  >
                    <FiChevronRight size={17} />
                  </button>
                </div>
              </div>

              <div className="mb-4 border-b border-dashed border-[#ead77d]" />

              {/* SLIDER */}
              <div className="-mx-2">
                <Slider
                  ref={sliderRef}
                  {...settings}
                  className="new-offer-slider"
                >
                  {popularProducts.map((product) => (
                    <div key={product._id} className="px-2 pb-3">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>

          {/* DESKTOP RIGHT BANNER */}
          {firstBanner && (
            <div className="hidden h-full xl:block">
              <Link
                href="/product-list"
                className="
                  relative
                  block
                  h-full
                  min-h-full
                  w-full
                  overflow-hidden
                  rounded-2xl
                  bg-gray-100
                "
              >
                <Image
                  src={firstBanner}
                  alt="Right Offer Banner"
                  fill
                  className="object-fill"
                  sizes="220px"
                />
              </Link>
            </div>
          )}
        </div>

        {/* MOBILE BANNERS */}
        <div className="mt-4 grid grid-cols-2 gap-3 xl:hidden">
          {firstBanner && (
            <Link
              href="/product-list"
              className="
                relative
                block
                h-37.5
                overflow-hidden
                rounded-xl
                bg-gray-100
              "
            >
              <Image
                src={firstBanner}
                alt="Offer Banner"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </Link>
          )}

          {secondBanner && (
            <Link
              href="/product-list"
              className="
                relative
                block
                h-37.5
                overflow-hidden
                rounded-xl
                bg-gray-100
              "
            >
              <Image
                src={secondBanner}
                alt="Offer Banner"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;
