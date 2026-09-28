"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiHeart, FiStar, FiShoppingBag, FiCheckCircle } from "react-icons/fi";

import ThemeBtnOne from "./ThemeBtnOne";

type ListViewCardProps = {
  id: number | string;
  name: string;
  image: string;
  href?: string;
  brand?: string;
  price: number;
  oldPrice?: number;
  rating?: number;
  reviews?: number;
  discount?: number;
  inStock?: boolean;
  description?: string;
};

const ListViewCard = ({
  id,
  name,
  image,
  brand,
  price,
  oldPrice,
  rating = 0,
  reviews = 0,
  discount = 0,
  inStock = true,
  description,
}: ListViewCardProps) => {
  const hasSaving = typeof oldPrice === "number" && oldPrice > price;

  const savingAmount = hasSaving ? oldPrice - price : 0;

  // SAME ROUTE AS GRID PRODUCT CARD
  const productSlug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const productHref = `/product/${productSlug}/${id}`;

  return (
    <article
      className="
        group
        relative
        w-full
        overflow-hidden
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-3
        shadow-[0_3px_16px_rgba(0,0,0,0.04)]
        transition-all
        duration-200

        hover:border-gray-300
        hover:shadow-[0_8px_28px_rgba(0,0,0,0.07)]

        sm:p-4

        dark:border-gray-800
        dark:bg-[#181818]
      "
    >
      <div
        className="
          flex
          flex-col
          gap-3

          sm:flex-row
          sm:items-stretch
          sm:gap-4
        "
      >
        {/* PRODUCT IMAGE */}
        <div
          className="
            relative
            flex
            h-45
            w-full
            shrink-0
            items-center
            justify-center
            overflow-hidden
            rounded-xl
            bg-[#fafafa]

            sm:h-42.5
            sm:w-45

            lg:h-47.5
            lg:w-52.5

            dark:bg-[#202020]
          "
        >
          {/* DISCOUNT */}
          {discount > 0 && (
            <span
              className="
                absolute
                left-2
                top-2
                z-10
                rounded-full
                bg-[#ffd83d]
                px-2
                py-1
                text-[9px]
                font-extrabold
                text-black
              "
            >
              -{discount}%
            </span>
          )}

          {/* WISHLIST */}
          <button
            type="button"
            aria-label="Add to wishlist"
            className="
              absolute
              right-2
              top-2
              z-10
              flex
              h-8
              w-8
              cursor-pointer
              items-center
              justify-center
              rounded-full
              border
              border-gray-100
              bg-white
              text-gray-500
              shadow-sm
              transition

              hover:text-red-500

              dark:border-gray-700
              dark:bg-[#181818]
              dark:text-gray-300
            "
          >
            <FiHeart size={15} />
          </button>

          {/* IMAGE LINK */}
          <Link
            href={productHref}
            className="
              relative
              flex
              h-full
              w-full
              items-center
              justify-center
              p-4
            "
          >
            <Image
              src={image}
              alt={name}
              width={240}
              height={240}
              className="
                h-full
                w-full
                object-contain
                transition-transform
                duration-300

                group-hover:scale-[1.04]
              "
            />
          </Link>
        </div>

        {/* PRODUCT CONTENT */}
        <div
          className="
            flex
            min-w-0
            flex-1
            flex-col
            justify-between
          "
        >
          <div>
            {/* BRAND + STOCK */}
            <div className="mb-1.5 flex items-center justify-between gap-2">
              {brand && (
                <span
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.5px]
                    text-gray-400
                  "
                >
                  {brand}
                </span>
              )}

              {inStock && (
                <span
                  className="
                    flex
                    shrink-0
                    items-center
                    gap-1
                    text-[7px]
                    font-semibold
                    text-green-600

                    min-[380px]:text-[8px]

                    sm:text-[9px]
                  "
                >
                  <FiCheckCircle className="h-2.5 w-2.5 sm:h-3 sm:w-3" />

                  <span className="hidden min-[340px]:inline">In Stock</span>
                </span>
              )}
            </div>

            {/* NAME */}
            <Link href={productHref}>
              <h3
                className="
                  line-clamp-2
                  font-serif
                  text-[14px]
                  font-bold
                  leading-5
                  text-black
                  transition

                  hover:text-[#b58b00]

                  sm:text-[15px]
                  lg:text-[16px]

                  dark:text-white
                "
              >
                {name}
              </h3>
            </Link>

            {/* RATING */}
            {rating > 0 && (
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FiStar
                      key={star}
                      className={
                        star <= Math.round(rating)
                          ? "fill-[#f4b400] text-[#f4b400]"
                          : "text-gray-300"
                      }
                      size={12}
                    />
                  ))}
                </div>

                <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300">
                  {rating}
                </span>

                <span className="text-[9px] text-gray-400">
                  ({reviews} reviews)
                </span>
              </div>
            )}

            {/* DESCRIPTION */}
            {description && (
              <p
                className="
                  mt-2
                  hidden
                  max-w-175
                  text-[10px]
                  leading-4.25
                  text-gray-500

                  md:line-clamp-2

                  dark:text-gray-400
                "
              >
                {description}
              </p>
            )}
          </div>

          {/* BOTTOM */}
          <div
            className="
              mt-3
              flex
              flex-wrap
              items-end
              justify-between
              gap-3
              border-t
              border-gray-100
              pt-3

              dark:border-gray-800
            "
          >
            {/* PRICE */}
            <div className="min-w-0">
              <div className="flex flex-wrap items-end gap-2">
                <span
                  className="
                    whitespace-nowrap
                    font-serif
                    text-[13px]
                    font-bold
                    text-black

                    min-[380px]:text-[15px]

                    sm:text-[17px]

                    dark:text-white
                  "
                >
                  AED {price.toLocaleString()}
                </span>

                {hasSaving && typeof oldPrice === "number" && (
                  <span
                    className="
                      whitespace-nowrap
                      font-serif
                      text-[8px]
                      text-gray-400
                      line-through

                      sm:text-[10px]
                    "
                  >
                    AED {oldPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {hasSaving && (
                <span
                  className="
                    mt-1.5
                    inline-flex
                    w-fit
                    rounded
                    bg-green-50
                    px-1.5
                    py-0.5
                    text-[7px]
                    font-bold
                    text-green-600

                    min-[380px]:text-[8px]

                    sm:rounded-md
                    sm:px-2
                    sm:py-1
                    sm:text-[9px]

                    dark:bg-green-500/10
                  "
                >
                  Save AED {savingAmount.toLocaleString()}
                </span>
              )}
            </div>

            {/* ADD TO CART */}
            <ThemeBtnOne
              text="Add to Cart"
              url="/cart"
              icon={<FiShoppingBag className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
              className="
                flex
                h-9
                cursor-pointer
                items-center
                justify-center
                gap-1.5
                rounded-lg
                bg-[#ffd83d]
                px-4
                font-serif
                text-[8px]
                font-bold
                text-black
                transition-all
                duration-200

                hover:bg-[#ffcc00]

                sm:h-11
                sm:gap-2
                sm:rounded-xl
                sm:px-5
                sm:text-[11px]
              "
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default ListViewCard;
