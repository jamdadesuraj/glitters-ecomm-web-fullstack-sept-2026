"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiArrowRight,
  FiBox,
  FiPercent,
  FiShoppingBag,
  FiStar,
} from "react-icons/fi";
import ThemeBtnOne from "@/app/components/ThemeBtnOne";

type DealProduct = {
  name: string;
  description: string;
  image: string;
  href: string;
  price: number;
  oldPrice: number;
  rating: number;
  reviews: number;
  discount: number;
};

type DealOfTheDayProps = {
  product?: DealProduct | null;
};

const defaultProduct: DealProduct = {
  name: "Belkin 3-in-1 Wireless Charging Station",
  description: "For iPhone, Apple Watch & AirPods",
  image: "/img/products/wireless-charger.png",
  href: "/product/wireless-charger",
  price: 349,
  oldPrice: 699,
  rating: 4.9,
  reviews: 430,
  discount: 50,
};

const DealOfTheDay = ({ product = defaultProduct }: DealOfTheDayProps) => {
  const [time, setTime] = useState({
    hours: 12,
    minutes: 36,
    seconds: 24,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds -= 1;
        } else {
          seconds = 59;

          if (minutes > 0) {
            minutes -= 1;
          } else {
            minutes = 59;

            if (hours > 0) {
              hours -= 1;
            } else {
              hours = 12;
              minutes = 36;
              seconds = 24;
            }
          }
        }

        return {
          hours,
          minutes,
          seconds,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full bg-white py-3 dark:bg-[#111]">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div
          className="
            grid
            overflow-hidden
            rounded-xl
            border
            border-[#f4ead0]
            bg-white
            shadow-[0_1px_5px_rgba(0,0,0,0.03)]
            lg:h-25
            lg:grid-cols-[305px_minmax(0,1fr)_265px]
          "
        >
          {/* LEFT: DEAL TIMER */}
          <div
            className="
              relative
              flex
              min-h-25
              flex-col
              justify-center
              overflow-hidden
              bg-linear-to-r
              from-[#fff8d9]
              via-[#fffbea]
              to-[#fffdf6]
              px-5
            "
          >
            <div
              className="
                pointer-events-none
                absolute
                -right-10
                -top-12
                h-30
                w-30
                rounded-full
                bg-[#ffe576]/20
                blur-2xl
              "
            />

            <h2
              className="
                relative
                font-serif
                text-[20px]
                font-extrabold
                leading-none
                tracking-[-0.4px]
                text-[#181818]
              "
            >
              Deal of the Day
            </h2>

            <div className="relative mt-4 flex items-center gap-3">
              <span className="shrink-0 text-[10px] font-semibold text-[#555]">
                Ends in
              </span>

              <span className="h-5 w-px bg-[#ddd5b8]" />

              <div className="flex items-center gap-2 font-serif">
                <TimeBox value={time.hours} label="Hours" />

                <span className="text-[15px] font-bold text-[#cbb341]">:</span>

                <TimeBox value={time.minutes} label="Minutes" />

                <span className="text-[15px] font-bold text-[#cbb341]">:</span>

                <TimeBox value={time.seconds} label="Seconds" />
              </div>
            </div>
          </div>

          {/* CENTER */}
          {product ? (
            <div
              className="
                relative
                flex
                min-h-25
                items-center
                border-y
                border-[#f3ead5]
                bg-white
                px-4.5
                lg:border-x
                lg:border-y-0
              "
            >
              {/* PRODUCT IMAGE */}
              <Link
                href={product.href}
                className="relative h-22.5 w-36.25 shrink-0"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain"
                  sizes="145px"
                />
              </Link>

              {/* PRODUCT INFO */}
              <div className="min-w-0 flex-1 pl-3">
                <Link
                  href={product.href}
                  className="
                    line-clamp-1
                    font-serif
                    text-[11px]
                    font-extrabold
                    leading-3.75
                    text-[#161616]
                    transition
                    hover:text-[#c49b00]
                  "
                >
                  {product.name}
                </Link>

                <p
                  className="
                    mt-px
                    line-clamp-1
                    text-[9px]
                    font-medium
                    text-[#555]
                  "
                >
                  {product.description}
                </p>

                {/* RATING */}
                <div className="mt-1.25 flex items-center">
                  <div className="flex items-center gap-px">
                    {[1, 2, 3, 4].map((star) => (
                      <FiStar
                        key={star}
                        size={10}
                        className="fill-[#ffbf00] text-[#ffbf00]"
                      />
                    ))}
                  </div>

                  <span className="ml-1 text-[8px] text-[#999]">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* PRICE */}
                <div className="mt-1.5 flex items-center gap-3">
                  <span
                    className="
                      font-serif
                      text-[14px]
                      font-extrabold
                      text-[#171717]
                    "
                  >
                    AED {product.price}
                  </span>

                  <span className="text-[9px] font-medium text-[#a2a2a2] line-through">
                    AED {product.oldPrice}
                  </span>
                </div>
              </div>

              {/* RIGHT ACTION */}
              <div
                className="
                  ml-3
                  hidden
                  h-full
                  min-w-31.25
                  shrink-0
                  flex-col
                  items-end
                  justify-between
                  py-2.5
                  sm:flex
                "
              >
                <span
                  className="
                    rounded-[5px]
                    bg-[#ff3b49]
                    px-2.5
                    py-1
                    text-[9px]
                    font-extrabold
                    leading-none
                    text-white
                  "
                >
                  {product.discount}% OFF
                </span>

                <ThemeBtnOne
                  text="Add to Cart"
                  url={product.href}
                  icon={<FiShoppingBag size={15} />}
                  className="
            mt-4 flex h-11
            w-full cursor-pointer
            items-center justify-center
            gap-2
            rounded-xl
            bg-[#ffd83d]
            text-[11px] font-bold
            text-black
            transition-all duration-200
            hover:bg-[#ffcc00] font-serif
            hover:shadow-[0_6px_18px_rgba(255,216,61,0.28)]
          "
                />
              </div>
            </div>
          ) : (
            <EmptyProduct />
          )}

          {/* RIGHT PROMO */}
          <Link
            href="/product-list"
            className="
              group
              relative
              flex
              min-h-25
              items-center
              overflow-hidden
              bg-linear-to-r
              from-[#fff4b7]
              via-[#fff9dd]
              to-[#fffdf5]
              px-5
            "
          >
            {/* BACKGROUND SHAPE 1 */}
            <div
              className="
                absolute
                -left-6.25
                -top-4.5
                h-30
                w-30
                rotate-16
                rounded-[28px]
                bg-[#ffdc39]/35
              "
            />

            {/* BACKGROUND SHAPE 2 */}
            <div
              className="
                absolute
                left-6
                top-4
                h-16
                w-16
                rotate-[-10deg]
                rounded-[17px]
                bg-[#ffd21c]/30
              "
            />

            {/* PERCENT ICON */}
            <div
              className="
                relative
                z-10
                flex
                h-14.5
                w-13.25
                shrink-0
                rotate-[-8deg]
                items-center
                justify-center
                rounded-[10px]
                bg-[#ffd01a]
                shadow-[0_5px_12px_rgba(215,163,0,0.16)]
              "
            >
              <FiPercent size={27} strokeWidth={3} className="text-[#151515]" />
            </div>

            {/* TEXT */}
            <div className="relative z-10 ml-5 min-w-0">
              <h3
                className="
                  whitespace-nowrap
                  font-serif
                  text-[13px]
                  font-extrabold
                  leading-tight
                  text-[#171717]
                "
              >
                Don&apos;t Miss Out!
              </h3>

              <p className="mt-1 whitespace-nowrap text-[8px] text-[#555]">
                Great deals. Every day.
              </p>

              <span
                className="
                  mt-3
                  flex
                  items-center
                  gap-2
                  whitespace-nowrap
                  text-[9px]
                  font-extrabold
                  text-[#222]
                "
              >
                Shop Daily Deals
                <FiArrowRight
                  size={12}
                  className="
                    transition-transform
                    duration-200
                    group-hover:translate-x-0.75
                  "
                />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

const TimeBox = ({ value, label }: { value: number; label: string }) => {
  return (
    <div
      className="
        flex
        h-10.5
        w-12.5
        flex-col
        items-center
        justify-center
        rounded-md
        bg-[#ffe066]
        shadow-[0_2px_4px_rgba(221,179,0,0.08)]
      "
    >
      <span
        className="
          text-[13px]
          font-extrabold
          leading-none
          text-[#151515]
        "
      >
        {String(value).padStart(2, "0")}
      </span>

      <span
        className="
          mt-1
          text-[7px]
          font-semibold
          leading-none
          text-[#6f5a00]
        "
      >
        {label}
      </span>
    </div>
  );
};

const EmptyProduct = () => {
  return (
    <div
      className="
        relative
        flex
        min-h-25
        items-center
        justify-center
        overflow-hidden
        border-y
        border-[#f3ead5]
        bg-[#fcfcfc]
        lg:border-x
        lg:border-y-0
      "
    >
      {/* CROSS LINE */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-px
          w-[125%]
          -translate-x-1/2
          -translate-y-1/2
          rotate-11
          bg-[#edf0f4]
        "
      />

      {/* CROSS LINE */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-px
          w-[125%]
          -translate-x-1/2
          -translate-y-1/2
          rotate-[-11deg]
          bg-[#edf0f4]
        "
      />

      {/* CENTER VECTOR */}
      <div
        className="
          relative
          z-10
          flex
          items-center
          gap-2.5
          rounded-[10px]
          bg-[#fcfcfc]
          px-4.5
          py-2.5
        "
      >
        <FiBox size={30} strokeWidth={1.45} className="text-[#cbd3dd]" />

        <div>
          <p
            className="
              text-[11px]
              font-semibold
              leading-none
              text-[#c1cad5]
            "
          >
            Product
          </p>

          <p className="mt-1 text-[8px] text-[#d0d6de]">No deal available</p>
        </div>
      </div>
    </div>
  );
};

export default DealOfTheDay;
