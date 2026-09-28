"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import type { Settings } from "react-slick";

const offers = [
  {
    id: 1,
    image: "/img/offer-banner/1.png",
    href: "/product-list",
  },
  {
    id: 2,
    image: "/img/offer-banner/2.png",
    href: "/product-list",
  },
  {
    id: 3,
    image: "/img/offer-banner/3.png",
    href: "/product-list",
  },
  {
    id: 4,
    image: "/img/offer-banner/1.png",
    href: "/product-list",
  },
];

const OfferBanner = () => {
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    pauseOnHover: true,
    swipeToSlide: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="w-full bg-white py-4 dark:bg-[#111]">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        {/* OUTER BOX */}
        <div
          className="
            overflow-hidden
            rounded-2xl
            border
            border-gray-200
            bg-white
            p-2
            dark:border-gray-800
            dark:bg-[#161616]
            sm:p-3
          "
        >
          <Slider {...settings} className="offer-slider">
            {offers.map((offer) => (
              <div key={offer.id} className="px-1.5">
                <Link
                  href={offer.href}
                  className="
                    group
                    relative
                    block
                    h-27.5
                    w-full
                    overflow-hidden
                    rounded-xl
                    border
                    border-gray-200
                    bg-[#f7f7f7]
                    transition-all
                    duration-300
                    hover:border-gray-300
                    hover:shadow-[0_5px_18px_rgba(0,0,0,0.08)]
                    dark:border-gray-700
                    dark:bg-[#1b1b1b]
                    sm:h-30
                    lg:h-32.5
                  "
                >
                  <Image
                    src={offer.image}
                    alt={`Offer Banner ${offer.id}`}
                    fill
                    sizes="
                      (max-width: 640px) 100vw,
                      (max-width: 1024px) 50vw,
                      33vw
                    "
                    className="
                      object-cover
                      object-center
                      transition-transform
                      duration-500
                      group-hover:scale-[1.01]
                    "
                  />
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default OfferBanner;
