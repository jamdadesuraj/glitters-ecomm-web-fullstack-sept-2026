"use client";

import React, { useRef, useState } from "react";
import { FiPercent, FiLock, FiCheck, FiCopy } from "react-icons/fi";

type Coupon = {
  id: number;
  title: string;
  description: string;
  code: string;
  eligible?: boolean;
};

type CouponsListProps = {
  onApply?: (coupon: Coupon) => void;
};

const coupons: Coupon[] = [
  {
    id: 1,
    title: "Buy 1 Get 1 Free",
    description: "Add minimum 2 eligible products to avail this offer.",
    code: "BOGO1",
    eligible: false,
  },
  {
    id: 2,
    title: "Buy 2 Get 1 Free",
    description: "Add minimum 3 eligible products to avail this offer.",
    code: "BUY2GET1",
    eligible: true,
  },
  {
    id: 3,
    title: "10% Extra Off",
    description: "Get 10% extra discount on selected products.",
    code: "EXTRA10",
    eligible: true,
  },
  {
    id: 4,
    title: "AED 50 Off",
    description: "Save AED 50 on eligible orders.",
    code: "SAVE50",
    eligible: true,
  },
];

const CouponsList = ({ onApply }: CouponsListProps) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const [appliedCoupon, setAppliedCoupon] = useState<number | null>(null);

  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleScroll = () => {
    const slider = sliderRef.current;

    if (!slider) return;

    const firstCard = slider.firstElementChild as HTMLElement | null;

    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth;
    const gap = 10;

    const index = Math.round(slider.scrollLeft / (cardWidth + gap));

    setActiveIndex(Math.min(Math.max(index, 0), coupons.length - 1));
  };

  const scrollToCoupon = (index: number) => {
    const slider = sliderRef.current;

    if (!slider) return;

    const firstCard = slider.firstElementChild as HTMLElement | null;

    if (!firstCard) return;

    slider.scrollTo({
      left: index * (firstCard.offsetWidth + 10),
      behavior: "smooth",
    });

    setActiveIndex(index);
  };

  const handleApply = (coupon: Coupon) => {
    if (!coupon.eligible) return;

    setAppliedCoupon(coupon.id);

    onApply?.(coupon);
  };

  const handleCopy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);

      setCopiedCode(code);

      window.setTimeout(() => {
        setCopiedCode(null);
      }, 1500);
    } catch {
      setCopiedCode(null);
    }
  };

  return (
    <section className="w-full">
      {/* HEADING */}
      <div
        className="
          mb-2.5
          flex
          items-center
          justify-between
          gap-3
        "
      >
        <div>
          <h2
            className="
              font-serif
              text-[14px]
              font-extrabold
              tracking-wide
              text-black

              sm:text-[15px]

              dark:text-white
            "
          >
            Available Coupons
          </h2>

          <p
            className="
              mt-0.5
              text-[8px]
              text-gray-400

              sm:text-[9px]
            "
          >
            Apply an offer and save more
          </p>
        </div>

        <span
          className="
            rounded-full
            bg-[#fff8d7]
            px-2
            py-1
            text-[8px]
            font-bold
            text-[#8a6b00]

            dark:bg-[#2b260f]
            dark:text-[#ffd83d]
          "
        >
          {coupons.length} Offers
        </span>
      </div>

      {/* SLIDER */}
      <div
        ref={sliderRef}
        onScroll={handleScroll}
        className="
          scrollbar-hide
          flex
          w-full
          snap-x
          snap-mandatory
          gap-2.5
          overflow-x-auto
          pb-1
        "
      >
        {coupons.map((coupon) => {
          const isApplied = appliedCoupon === coupon.id;

          const isCopied = copiedCode === coupon.code;

          return (
            <article
              key={coupon.id}
              className="
                relative
                min-w-65
                snap-start
                overflow-hidden
                rounded-xl
                border
                border-gray-200
                bg-white
                p-3
                transition-all
                duration-200

                min-[390px]:min-w-70

                sm:min-w-75

                md:min-w-78.75

                lg:min-w-[320px]

                xl:min-w-82.5

                dark:border-gray-700
                dark:bg-[#181818]
              "
            >
              {/* TICKET CUTS */}
              <span
                className="
                  absolute
                  -left-1.5
                  top-1/2
                  h-3
                  w-3
                  -translate-y-1/2
                  rounded-full
                  border
                  border-gray-200
                  bg-[#f7f7f8]

                  dark:border-gray-700
                  dark:bg-[#0f0f0f]
                "
              />

              <span
                className="
                  absolute
                  -right-1.5
                  top-1/2
                  h-3
                  w-3
                  -translate-y-1/2
                  rounded-full
                  border
                  border-gray-200
                  bg-[#f7f7f8]

                  dark:border-gray-700
                  dark:bg-[#0f0f0f]
                "
              />

              {/* TOP */}
              <div
                className="
                  flex
                  items-start
                  justify-between
                  gap-2
                "
              >
                <div
                  className="
                    flex
                    min-w-0
                    flex-1
                    items-start
                    gap-2
                  "
                >
                  <div
                    className="
                      flex
                      h-7
                      w-7
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#ffd83d]
                      text-black
                    "
                  >
                    <FiPercent size={13} />
                  </div>

                  <div className="min-w-0">
                    <h3
                      className="
                        truncate
                        font-serif
                        text-[11px]
                        font-bold
                        text-black

                        sm:text-[12px]

                        dark:text-white
                      "
                    >
                      {coupon.title}
                    </h3>

                    <p
                      className="
                        mt-1
                        line-clamp-2
                        min-h-7
                        text-[8px]
                        leading-3.5
                        text-gray-500

                        sm:text-[9px]

                        dark:text-gray-400
                      "
                    >
                      {coupon.description}
                    </p>
                  </div>
                </div>

                {!coupon.eligible && (
                  <FiLock
                    size={12}
                    className="
                      mt-1
                      shrink-0
                      text-gray-300
                    "
                  />
                )}
              </div>

              {/* BOTTOM */}
              <div
                className="
                  mt-1
                  flex
                  items-center
                  justify-between
                  gap-2
                  border-t
                  border-dashed
                  border-gray-200
                  pt-2.5

                  dark:border-gray-700
                "
              >
                {/* CODE */}
                <button
                  type="button"
                  onClick={() => handleCopy(coupon.code)}
                  className="
                    flex
                    min-w-0
                    max-w-37.5
                    cursor-pointer
                    items-center
                    gap-1.5
                    rounded-lg
                    border
                    border-dashed
                    border-[#e3c437]
                    bg-[#fff9dd]
                    px-2
                    py-1.5
                    font-mono
                    text-[8px]
                    font-bold
                    tracking-[0.5px]
                    text-[#7a6100]
                    transition

                    hover:bg-[#fff4bd]

                    dark:bg-[#2b260f]
                    dark:text-[#ffd83d]
                  "
                >
                  <span className="truncate">
                    {isCopied ? "COPIED" : coupon.code}
                  </span>

                  <FiCopy size={10} className="shrink-0" />
                </button>

                {/* APPLY */}
                <button
                  type="button"
                  disabled={!coupon.eligible || isApplied}
                  onClick={() => handleApply(coupon)}
                  className={`
                    flex
                    h-8
                    min-w-17
                    shrink-0
                    items-center
                    justify-center
                    gap-1
                    rounded-lg
                    border
                    px-2.5
                    text-[8px]
                    font-extrabold
                    transition-all

                    sm:min-w-18
                    sm:text-[9px]

                    ${
                      isApplied
                        ? `
                          cursor-default
                          border-green-200
                          bg-green-50
                          text-green-600

                          dark:border-green-800
                          dark:bg-green-500/10
                        `
                        : coupon.eligible
                          ? `
                            cursor-pointer
                            border-[#ffd83d]
                            bg-[#ffd83d]
                            text-black

                            hover:bg-[#ffcf12]
                            active:scale-95
                          `
                          : `
                            cursor-not-allowed
                            border-gray-200
                            bg-gray-50
                            text-gray-300

                            dark:border-gray-700
                            dark:bg-[#222]
                            dark:text-gray-600
                          `
                    }
                  `}
                >
                  {isApplied ? (
                    <>
                      <FiCheck size={11} />
                      Applied
                    </>
                  ) : (
                    <>
                      {!coupon.eligible && <FiLock size={10} />}
                      Apply
                    </>
                  )}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* DOTS */}
      <div
        className="
          mt-2
          flex
          items-center
          justify-center
          gap-1
        "
      >
        {coupons.map((coupon, index) => (
          <button
            key={coupon.id}
            type="button"
            aria-label={`Go to coupon ${index + 1}`}
            onClick={() => scrollToCoupon(index)}
            className={`
              h-1.5
              rounded-full
              transition-all
              duration-300

              ${activeIndex === index ? "w-5 bg-gray-400" : "w-1.5 bg-gray-200"}
            `}
          />
        ))}
      </div>
    </section>
  );
};

export default CouponsList;
