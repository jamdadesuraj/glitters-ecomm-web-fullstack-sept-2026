"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ProductCard from "@/app/components/ProductCard";

const products = [
  {
    id: 1,
    name: "Apple iPhone 16 Pro Max 256GB",
    image: "/img/products/iphone.png",
    href: "/product/iphone-16-pro-max",
    brand: "Apple",
    price: 4899,
    oldPrice: 5299,
    rating: 4.9,
    reviews: 186,
    discount: 8,
  },
  {
    id: 2,
    name: "Samsung Galaxy S25 Ultra 512GB",
    image: "/img/products/samsung.png",
    href: "/product/samsung-s25-ultra",
    brand: "Samsung",
    price: 4499,
    oldPrice: 4999,
    rating: 4.8,
    reviews: 142,
    discount: 10,
  },
  {
    id: 3,
    name: "Apple Watch Series 10 GPS",
    image: "/img/products/watch.png",
    href: "/product/apple-watch-series-10",
    brand: "Apple",
    price: 1599,
    oldPrice: 1799,
    rating: 4.7,
    reviews: 96,
    discount: 11,
  },
  {
    id: 4,
    name: "AirPods Pro 2nd Generation",
    image: "/img/products/airpods.png",
    href: "/product/airpods-pro",
    brand: "Apple",
    price: 849,
    oldPrice: 999,
    rating: 4.8,
    reviews: 211,
    discount: 15,
  },
  {
    id: 5,
    name: "Samsung Galaxy Buds 3 Pro",
    image: "/img/products/buds.png",
    href: "/product/galaxy-buds-3",
    brand: "Samsung",
    price: 699,
    oldPrice: 799,
    rating: 4.6,
    reviews: 88,
    discount: 13,
  },
  {
    id: 6,
    name: "Google Pixel 9 Pro",
    image: "/img/products/pixel.png",
    href: "/product/google-pixel-9-pro",
    brand: "Google",
    price: 3299,
    oldPrice: 3599,
    rating: 4.7,
    reviews: 75,
    discount: 9,
  },
];

const PopularProducts = () => {
  const sliderRef = useRef<Slider | null>(null);

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
          {/* CENTER */}
          <div className="min-w-0 h-full">
            {/* PRODUCTS BOX */}
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
              dark:text-white"
                  >
                    Popular Products
                  </h2>

                  <p className="mt-1 text-xs text-gray-500">
                    Discover our latest products and exclusive deals
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    aria-label="Previous products"
                    onClick={() => sliderRef.current?.slickPrev()}
                    className="
              flex h-9 w-9 cursor-pointer items-center justify-center
              rounded-lg border border-gray-200 bg-white text-gray-600
              transition hover:border-[#ffd83d] hover:bg-[#fff8dc]
              hover:text-black dark:border-gray-700 dark:bg-[#222]
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
              flex h-9 w-9 cursor-pointer items-center justify-center
              rounded-lg bg-[#ffd83d] text-black transition
              hover:bg-[#ffcf0f]
            "
                  >
                    <FiChevronRight size={17} />
                  </button>
                </div>
              </div>

              <div className="mb-4 border-b border-dashed border-[#ead77d]" />

              <div className="-mx-2">
                <Slider
                  ref={sliderRef}
                  {...settings}
                  className="new-offer-slider"
                >
                  {products.map((product) => (
                    <div key={product.id} className="px-2 pb-2">
                      <ProductCard {...product} />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>

          {/* RIGHT BANNER */}
          <div className="hidden xl:block h-full">
            <Link
              href="/shop"
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
                src="/img/offer-banner/9.png"
                alt="Right Offer Banner"
                fill
                className="object-fill"
                sizes="220px"
              />
            </Link>
          </div>
        </div>

        {/* MOBILE SIDE BANNERS */}
        <div className="mt-4 grid grid-cols-2 gap-3 xl:hidden">
          <Link
            href="/shop"
            className="relative block h-37.5 overflow-hidden rounded-xl bg-gray-100"
          >
            <Image
              src="/img/banners/left-banner.jpg"
              alt="Offer Banner"
              fill
              className="object-cover"
            />
          </Link>

          <Link
            href="/shop"
            className="relative block h-37.5 overflow-hidden rounded-xl bg-gray-100"
          >
            <Image
              src="/img/banners/right-banner.jpg"
              alt="Offer Banner"
              fill
              className="object-cover"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;
