"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiHeart,
  FiShoppingBag,
  FiStar,
  FiCheckCircle,
  FiBox,
} from "react-icons/fi";

import ThemeBtnOne from "./ThemeBtnOne";

type ProductCardProps = {
  id?: number | string;
  name?: string;
  brand?: string;
  image?: string;
  href?: string;
  price?: number;
  oldPrice?: number;
  rating?: number;
  reviews?: number;
  discount?: number;
};

const ProductCard = ({
  id,
  name = "",
  brand = "",
  image = "",
  price = 0,
  oldPrice,
  rating = 0,
  reviews = 0,
  discount = 0,
}: ProductCardProps) => {
  const [wishlist, setWishlist] = useState(false);
  const [imageError, setImageError] = useState(false);

  const hasImage = Boolean(image.trim()) && !imageError;

  const hasSaving = typeof oldPrice === "number" && oldPrice > price;

  const savingAmount = hasSaving ? oldPrice - price : 0;

  const productSlug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const productHref = `/product/${productSlug}${id ? `/${id}` : ""}`;

  return (
    <article
      className="
        group
        flex
        h-full
        w-full
        min-w-0
        flex-col
        overflow-hidden
        rounded-xl
        border
        border-[#ededed]
        bg-white
        transition-all
        duration-300

        hover:border-[#ffe27a]
        hover:shadow-[0_10px_28px_rgba(0,0,0,0.07)]

        sm:rounded-2xl

        dark:border-gray-800
        dark:bg-[#171717]
      "
    >
      {/* IMAGE AREA */}
      <div
        className="
          relative
          aspect-square
          w-full
          overflow-hidden
          bg-[#f8f8f8]

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
              z-20
              rounded
              bg-[#ffd83d]
              px-1.5
              py-0.5
              text-[8px]
              font-bold
              text-black

              sm:left-3
              sm:top-3
              sm:rounded-md
              sm:px-2.5
              sm:py-1
              sm:text-[9px]
            "
          >
            {discount}% OFF
          </span>
        )}

        {/* WISHLIST */}
        <button
          type="button"
          onClick={() => setWishlist((prev) => !prev)}
          aria-label={wishlist ? "Remove from wishlist" : "Add to wishlist"}
          className={`
            absolute
            right-2
            top-2
            z-20
            flex
            h-7
            w-7
            cursor-pointer
            items-center
            justify-center
            rounded-full
            border
            border-white
            bg-white
            shadow-[0_3px_12px_rgba(0,0,0,0.08)]
            transition-all
            duration-200

            hover:scale-105

            sm:right-3
            sm:top-3
            sm:h-9
            sm:w-9

            ${wishlist ? "text-red-500" : "text-gray-500 hover:text-red-500"}

            dark:border-gray-700
            dark:bg-[#292929]
          `}
        >
          <FiHeart
            className="h-3.5 w-3.5 sm:h-4 sm:w-4"
            fill={wishlist ? "currentColor" : "none"}
          />
        </button>

        {/* PRODUCT IMAGE */}
        <Link
          href={productHref}
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
          "
        >
          {hasImage ? (
            <Image
              src={image}
              alt={name || "Product"}
              fill
              sizes="
                (max-width: 480px) 50vw,
                (max-width: 768px) 33vw,
                (max-width: 1024px) 25vw,
                (max-width: 1280px) 25vw,
                20vw
              "
              onError={() => setImageError(true)}
              className="
                object-contain
                p-3
                transition-transform
                duration-500

                group-hover:scale-[1.04]

                min-[380px]:p-4

                sm:p-5

                lg:p-6
              "
            />
          ) : (
            <div
              className="
                flex
                h-[46%]
                w-[46%]
                flex-col
                items-center
                justify-center
                rounded-xl
                border
                border-[#e5e7eb]
                bg-[#fafafa]
                text-[#cbd2dc]
                transition-all
                duration-300

                group-hover:border-[#ffe27a]
                group-hover:bg-[#fffdf5]

                sm:rounded-2xl

                dark:border-gray-700
                dark:bg-[#242424]
                dark:text-gray-600
              "
            >
              <FiBox
                className="
                  h-6
                  w-6

                  sm:h-8
                  sm:w-8

                  lg:h-9
                  lg:w-9
                "
                strokeWidth={1.4}
              />

              <span
                className="
                  mt-1
                  text-[8px]
                  font-medium

                  sm:mt-2
                  sm:text-[10px]
                "
              >
                Product
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* CONTENT */}
      <div
        className="
          flex
          flex-1
          flex-col
          p-2.5

          min-[380px]:p-3

          sm:p-4
        "
      >
        {/* BRAND + STOCK */}
        <div
          className="
            flex
            min-w-0
            items-center
            justify-between
            gap-1
          "
        >
          <span
            className="
              min-w-0
              truncate
              text-[7px]
              font-bold
              uppercase
              tracking-[0.8px]
              text-gray-400

              min-[380px]:text-[8px]

              sm:text-[9px]
              sm:tracking-[1.2px]
            "
          >
            {brand}
          </span>

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
        </div>

        {/* NAME */}
        <Link href={productHref} className="block min-w-0">
          <h3
            className="
              mt-1.5
              line-clamp-2
              min-h-5
              font-serif
              text-[10px]
              font-bold
              leading-4
              tracking-wide
              text-[#202020]
              transition-colors

              hover:text-[#b58b00]

              min-[380px]:text-[11px]

              sm:mt-2
              sm:min-h-6.25
              sm:text-[13px]
              sm:leading-5

              dark:text-white
            "
          >
            {name || "Product Name"}
          </h3>
        </Link>

        {/* RATING */}
        <div
          className="
            mt-1.5
            flex
            min-w-0
            items-center
            gap-1

            sm:gap-1.5
          "
        >
          <div
            className="
              flex
              shrink-0
              items-center
              gap-1
              rounded
              bg-[#fff7d5]
              px-1.5
              py-0.5
              text-[#be9100]

              sm:rounded-md
              sm:px-2
              sm:py-1
            "
          >
            <FiStar className="h-2.5 w-2.5" fill="currentColor" />

            <span className="text-[8px] font-bold sm:text-[9px]">{rating}</span>
          </div>

          <span
            className="
              truncate
              text-[7px]
              text-black

              min-[380px]:text-[8px]

              sm:text-[9px]

              dark:text-gray-300
            "
          >
            {reviews} Reviews
          </span>
        </div>

        {/* DIVIDER */}
        <div
          className="
            my-2
            border-b
            border-dashed
            border-gray-200

            sm:my-3

            dark:border-gray-700
          "
        />

        {/* PRICE */}
        <div
          className="
            mt-auto
            flex
            min-w-0
            flex-col
            gap-1.5

            sm:gap-2

            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          <div className="min-w-0">
            <p
              className="
                text-[7px]
                text-black

                min-[380px]:text-[8px]

                sm:text-[9px]

                dark:text-gray-300
              "
            >
              Special Price
            </p>

            <div
              className="
                mt-0.5
                flex
                min-w-0
                flex-wrap
                items-baseline
                gap-x-1.5
                gap-y-0

                sm:gap-x-2
              "
            >
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
          </div>

          {/* SAVING */}
          {hasSaving && (
            <span
              className="
                w-fit
                shrink-0
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
            mt-3
            flex
            h-9
            w-full
            cursor-pointer
            items-center
            justify-center
            gap-1.5
            rounded-lg
            bg-[#ffd83d]
            font-serif
            text-[8px]
            font-bold
            text-black
            transition-all
            duration-200

            hover:bg-[#ffcc00]
            hover:shadow-[0_6px_18px_rgba(255,216,61,0.28)]

            sm:mt-4
            sm:h-11
            sm:gap-2
            sm:rounded-xl
            sm:text-[11px]
          "
        />
      </div>
    </article>
  );
};

export default ProductCard;
