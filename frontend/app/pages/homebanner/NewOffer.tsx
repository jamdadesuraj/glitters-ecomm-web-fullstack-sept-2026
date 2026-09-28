"use client";

import React, { useRef } from "react";
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

const NewOffer = () => {
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 550,

    slidesToShow: 5,
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

  return (
    <section className="w-full bg-white py-5 dark:bg-[#111]">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        {/* HEADER */}
        <div className="mb-5 flex items-end justify-between gap-4">
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
              New Offers
            </h2>

            <p className="mt-1 text-[11px]  text-gray-500">
              Discover our latest products and exclusive deals
            </p>
          </div>

          {/* SLIDER ARROWS */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              aria-label="Previous products"
              onClick={() => sliderRef.current?.slickPrev()}
              className="
      flex
      h-8
      w-8
      cursor-pointer
      items-center
      justify-center
      rounded-lg
      border
      border-gray-200
      bg-white
      text-gray-600
      shadow-sm
      transition-all
      duration-200

      hover:border-[#ffd83d]
      hover:bg-[#fff8dc]
      hover:text-black

      sm:h-9
      sm:w-9
      sm:rounded-xl

      lg:h-10
      lg:w-10

      dark:border-gray-700
      dark:bg-[#1b1b1b]
      dark:text-white
    "
            >
              <FiChevronLeft className="h-4 w-4 sm:h-4.25 sm:w-4.25 lg:h-4.5 lg:w-4.5" />
            </button>

            <button
              type="button"
              aria-label="Next products"
              onClick={() => sliderRef.current?.slickNext()}
              className="
      flex
      h-8
      w-8
      cursor-pointer
      items-center
      justify-center
      rounded-lg
      bg-[#ffd83d]
      text-black
      shadow-[0_3px_10px_rgba(255,216,61,0.18)]
      transition-all
      duration-200

      hover:bg-[#ffcf0f]
      hover:shadow-[0_6px_18px_rgba(255,216,61,0.30)]

      sm:h-9
      sm:w-9
      sm:rounded-xl

      lg:h-10
      lg:w-10
    "
            >
              <FiChevronRight className="h-4 w-4 sm:h-4.25 sm:w-4.25 lg:h-4.5 lg:w-4.5" />
            </button>
          </div>
        </div>

        {/* DOTTED LINE */}
        <div className="mb-5 border-b border-dashed border-[#f2d66b]" />

        {/* PRODUCT SLIDER */}
        <div className="-mx-2">
          <Slider ref={sliderRef} {...settings} className="new-offer-slider">
            {products.map((product) => (
              <div key={product.id} className="px-2 pb-3">
                <ProductCard {...product} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewOffer;
