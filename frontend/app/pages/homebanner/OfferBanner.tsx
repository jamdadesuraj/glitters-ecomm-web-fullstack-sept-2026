"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import type { Settings } from "react-slick";
import { useGetOfferBannerQuery } from "@/store/offerBannerApi";

const OfferBannerSkeleton = () => {
  return (
    <section className="w-full bg-white py-4 dark:bg-[#111]">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
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
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className={`
                  ${
                    index === 1
                      ? "hidden sm:block"
                      : index === 2
                        ? "hidden lg:block"
                        : ""
                  }
                `}
              >
                <div
                  className="
                    h-27.5
                    w-full
                    animate-pulse
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-200

                    dark:border-gray-700
                    dark:bg-gray-800

                    sm:h-30
                    lg:h-32.5
                  "
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const OfferBanner = () => {
  const { data: offers = [], isLoading, isError } = useGetOfferBannerQuery();

  const settings: Settings = {
    dots: true,
    infinite: offers.length > 3,

    speed: 600,

    slidesToShow: 3,
    slidesToScroll: 1,

    autoplay: offers.length > 1,
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
          infinite: offers.length > 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: offers.length > 1,
        },
      },
    ],
  };

  // loading
  if (isLoading) {
    return <OfferBannerSkeleton />;
  }

  // error
  if (isError) {
    return null;
  }

  // empty
  if (!offers.length) {
    return null;
  }

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
              <div key={offer._id} className="px-1.5">
                <Link
                  href="/product-list"
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
                    src={offer.offerBannerImg}
                    alt={`Offer Banner ${offer._id}`}
                    fill
                    priority={false}
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
