"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  FiHeart,
  FiShoppingBag,
  FiTrash2,
  FiStar,
  FiCheckCircle,
  FiArrowLeft,
} from "react-icons/fi";
import ThemeBtnOne from "@/app/components/ThemeBtnOne";

type WishlistItem = {
  id: number;
  name: string;
  brand: string;
  image: string;
  href: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  rating?: number;
  reviews?: number;
  inStock?: boolean;
  color?: string;
  size?: string;
};

const initialWishlistItems: WishlistItem[] = [
  {
    id: 1,
    name: "Apple iPhone 16 Pro Max 256GB",
    brand: "Apple",
    image: "/img/products/iphone.png",
    href: "/product/apple-iphone-16-pro-max/1",
    price: 4899,
    oldPrice: 5299,
    discount: 8,
    rating: 4.9,
    reviews: 186,
    inStock: true,
    color: "Black Titanium",
    size: "256GB",
  },
  {
    id: 2,
    name: "Samsung Galaxy S25 Ultra 512GB",
    brand: "Samsung",
    image: "/img/products/samsung.png",
    href: "/product/samsung-galaxy-s25-ultra/2",
    price: 4499,
    oldPrice: 4999,
    discount: 10,
    rating: 4.8,
    reviews: 143,
    inStock: true,
    color: "Titanium Gray",
    size: "512GB",
  },
  {
    id: 3,
    name: "Apple AirPods Pro 2nd Generation",
    brand: "Apple",
    image: "/img/products/airpods.png",
    href: "/product/apple-airpods-pro-2/3",
    price: 899,
    oldPrice: 1099,
    discount: 18,
    rating: 4.8,
    reviews: 215,
    inStock: true,
    color: "White",
  },
  {
    id: 4,
    name: "Samsung Galaxy Watch Ultra",
    brand: "Samsung",
    image: "/img/products/galaxy-watch.png",
    href: "/product/samsung-galaxy-watch-ultra/4",
    price: 1299,
    oldPrice: 1499,
    discount: 13,
    rating: 4.7,
    reviews: 96,
    inStock: false,
    color: "Titanium Gray",
    size: "47mm",
  },
  {
    id: 5,
    name: "Apple Watch Series 10 GPS",
    brand: "Apple",
    image: "/img/products/apple-watch.png",
    href: "/product/apple-watch-series-10/5",
    price: 1599,
    oldPrice: 1799,
    discount: 11,
    rating: 4.7,
    reviews: 98,
    inStock: true,
    color: "Jet Black",
    size: "46mm",
  },
  {
    id: 6,
    name: "Anker 10000mAh Fast Charging Power Bank",
    brand: "Anker",
    image: "/img/products/powerbank.png",
    href: "/product/anker-power-bank/6",
    price: 169,
    oldPrice: 219,
    discount: 23,
    rating: 4.6,
    reviews: 321,
    inStock: true,
    color: "Black",
  },
];

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] =
    useState<WishlistItem[]>(initialWishlistItems);

  const totalItems = useMemo(() => wishlistItems.length, [wishlistItems]);

  const removeItem = (id: number) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  const getColorHex = (color?: string) => {
    const value = color?.toLowerCase() || "";

    if (value.includes("black")) return "#171717";
    if (value.includes("white")) return "#ffffff";
    if (value.includes("gray")) return "#9ca3af";
    if (value.includes("grey")) return "#9ca3af";
    if (value.includes("blue")) return "#3b82f6";
    if (value.includes("green")) return "#22c55e";
    if (value.includes("red")) return "#ef4444";
    if (value.includes("gold")) return "#d4af37";

    return "#737373";
  };

  return (
    <main
      className="
        min-h-screen
        bg-[#f7f7f8]
        py-4
        sm:py-6
        lg:py-8
        dark:bg-[#0f0f0f]
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1600px]
          px-3
          sm:px-5
          lg:px-8
          xl:px-10
        "
      >
        {/* HEADER */}
        <div
          className="
            mb-5
            flex
            items-end
            justify-between
            gap-3
          "
        >
          <div>
            <div className="flex items-center gap-2">
              <h1
                className="
                  font-serif
                  text-[20px]
                  font-extrabold
                  text-black
                  sm:text-[24px]
                  lg:text-[28px]
                  dark:text-white
                "
              >
                My Wishlist
              </h1>
            </div>

            <p
              className="
                mt-1.5
                text-[9px]
                text-gray-900
                sm:text-[12px]
                dark:text-gray-400
              "
            >
              {totalItems} {totalItems === 1 ? "item" : "items"} saved
            </p>
          </div>

          <Link
            href="/products"
            className="
              flex
              items-center
              gap-1.5
              text-[12px]
              font-serif
              tracking-wider
              font-bold
              text-gray9600
              transition
              hover:text-black
              sm:text-[10px]
              dark:text-gray-300
              dark:hover:text-white
            "
          >
            <FiArrowLeft size={13} />
            Continue Shopping
          </Link>
        </div>

        {wishlistItems.length > 0 ? (
          <>
            {/* TOP INFO */}
            <div
              className="
                mb-4
                flex
                flex-wrap
                items-center
                justify-between
                gap-3
                rounded-xl
                border
                border-gray-200
                bg-white
                px-3
                py-2.5
                sm:px-4
                dark:border-gray-800
                dark:bg-[#181818]
              "
            >
              <div>
                <p className="text-[12px] font-bold text-black dark:text-white">
                  Saved Products
                </p>

                <p className="mt-0.5 text-[10px] text-gray-900 dark:text-white">
                  Products stay here until you remove them
                </p>
              </div>

              <button
                type="button"
                onClick={() => setWishlistItems([])}
                className="
                  cursor-pointer
                  rounded-lg
                  border
                  border-gray-200
                  bg-rose-500
                  px-3
                  py-1.5
                  text-[8px]
                  font-bold
                  text-white
                  transition
                  hover:border-gray-300
                  hover:bg-gray-50
                  hover:text-black
                  dark:border-gray-700
                  dark:bg-[#202020]
                  dark:text-gray-300
                  dark:hover:text-white
                "
              >
                Clear Wishlist
              </button>
            </div>

            {/* GRID */}
            <div
              className="
                grid
                grid-cols-2
                gap-2.5
                sm:gap-3
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-6
              "
            >
              {wishlistItems.map((item) => {
                const hasSaving =
                  typeof item.oldPrice === "number" &&
                  item.oldPrice > item.price;

                return (
                  <article
                    key={item.id}
                    className="
                      group
                      flex
                      h-full
                      min-w-0
                      flex-col
                      overflow-hidden
                      rounded-xl
                      border
                      border-gray-200
                      bg-white
                      transition-all
                      duration-300
                      hover:border-[#ffe177]
                      hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]
                      sm:rounded-2xl
                      dark:border-gray-800
                      dark:bg-[#181818]
                    "
                  >
                    {/* IMAGE */}
                    <div
                      className="
                        relative
                        aspect-square
                        overflow-hidden
                        bg-[#f8f8f8]
                        dark:bg-[#202020]
                      "
                    >
                      {item.discount && item.discount > 0 && (
                        <span
                          className="
                              absolute
                              left-2
                              top-2
                              z-20
                              rounded-md
                              bg-[#ffd83d]
                              px-2
                              py-1
                              text-[7px]
                              font-extrabold
                              text-black
                              sm:left-3
                              sm:top-3
                              sm:text-[8px]
                            "
                        >
                          {item.discount}% OFF
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        aria-label="Remove from wishlist"
                        className="
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
                          border-gray-200
                          bg-rose-500
                          text-white
                          shadow-sm
                          transition
                          hover:border-gray-300
                          hover:text-black
                          sm:right-3
                          sm:top-3
                          sm:h-8
                          sm:w-8
                          dark:border-gray-700
                          dark:bg-[#292929]
                          dark:text-gray-300
                        "
                        title="Remove from wishlist"
                      >
                        <FiTrash2 size={12} />
                      </button>

                      <Link
                        href={item.href}
                        className="
                          absolute
                          inset-0
                          flex
                          items-center
                          justify-center
                          p-3
                          sm:p-4
                        "
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={250}
                          height={250}
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
                          gap-1.5
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
                            sm:text-[8px]
                          "
                        >
                          {item.brand}
                        </span>

                        {item.inStock ? (
                          <span
                            className="
                              flex
                              shrink-0
                              items-center
                              gap-1
                              text-[7px]
                              font-semibold
                              text-green-600
                              sm:text-[8px]
                            "
                          >
                            <FiCheckCircle size={10} />
                            <span className="hidden min-[360px]:inline">
                              In Stock
                            </span>
                          </span>
                        ) : (
                          <span
                            className="
                              shrink-0
                              text-[7px]
                              font-semibold
                              text-gray-400
                              sm:text-[8px]
                            "
                          >
                            Out of Stock
                          </span>
                        )}
                      </div>

                      {/* NAME */}
                      <Link href={item.href}>
                        <h2
                          className="
                            mt-1.5
                            line-clamp-2
                            min-h-4
                            font-serif
                            text-[10px]
                            font-bold
                            leading-4
                            text-black
                            transition
                            hover:text-[#b58b00]
                            sm:text-[12px]
                            sm:leading-5
                            dark:text-white
                          "
                        >
                          {item.name.slice(0, 25)}...
                        </h2>
                      </Link>

                      {/* RATING */}
                      <div
                        className="
                          mt-1.5
                          flex
                          min-w-0
                          items-center
                          gap-1.5
                        "
                      >
                        <span
                          className="
                            flex
                            shrink-0
                            items-center
                            gap-1
                            rounded-md
                            bg-[#fff7d5]
                            px-1.5
                            py-1
                            text-[10px]
                            font-bold
                            text-[#a77f00]
                          "
                        >
                          <FiStar size={9} fill="currentColor" />
                          {item.rating}
                        </span>

                        <span
                          className="
                            truncate
                            text-[10px]
                            text-gray-900
                            sm:text-[10px]
                          "
                        >
                          {item.reviews} Reviews
                        </span>
                      </div>

                      {/* OPTIONS */}
                      {(item.color || item.size) && (
                        <div
                          className="
                            mt-2
                            flex
                            flex-wrap
                            gap-1
                          "
                        >
                          {item.color && (
                            <span
                              className="
                                inline-flex
                                items-center
                                gap-1
                                rounded-full
                                border
                                border-gray-200
                                px-1.5
                                py-0.5
                                text-[8px]
                                font-semibold
                                text-gray-900
                                dark:border-gray-700
                                dark:text-gray-400
                              "
                            >
                              <span
                                className="
                                  h-1.5
                                  w-1.5
                                  rounded-full
                                  border
                                  border-black/10
                                "
                                style={{
                                  backgroundColor: getColorHex(item.color),
                                }}
                              />

                              {item.color}
                            </span>
                          )}

                          {item.size && (
                            <span
                              className="
                                rounded-full
                                bg-[#fff8d8]
                                px-1.5
                                py-0.5
                                text-[10px]
                                font-bold
                                text-[#806400]
                                dark:bg-[#29240f]
                                dark:text-[#ffd83d]
                              "
                            >
                              {item.size}
                            </span>
                          )}
                        </div>
                      )}

                      {/* DIVIDER */}
                      <div
                        className="
                          my-2.5
                          border-b
                          border-dashed
                          border-gray-200
                          dark:border-gray-700
                        "
                      />

                      {/* PRICE */}
                      <div className="mt-auto">
                        <p
                          className="
                            text-[10px]
                            text-gray-900
                          "
                        >
                          Special Price
                        </p>

                        <div
                          className="
                            mt-0.5
                            flex
                            flex-wrap
                            items-baseline
                            gap-x-1.5
                          "
                        >
                          <span
                            className="
                              font-serif
                              text-[13px]
                              font-extrabold
                              text-black
                              sm:text-[15px]
                              dark:text-white
                            "
                          >
                            AED {item.price.toLocaleString()}
                          </span>

                          {hasSaving && item.oldPrice && (
                            <span
                              className="
                                  text-[7px]
                                  text-gray-400
                                  line-through
                                  sm:text-[8px]
                                "
                            >
                              AED {item.oldPrice.toLocaleString()}
                            </span>
                          )}
                        </div>

                        {hasSaving && item.oldPrice && (
                          <span
                            className="
                                mt-1
                                inline-flex
                                rounded
                                bg-green-50
                                px-1.5
                                py-0.5
                                text-[6px]
                                font-bold
                                text-green-600
                                sm:text-[7px]
                                dark:bg-green-500/10
                              "
                          >
                            Save AED{" "}
                            {(item.oldPrice - item.price).toLocaleString()}
                          </span>
                        )}
                      </div>

                      {/* ACTIONS */}
                      <div className="mt-3 space-y-2">
                        <ThemeBtnOne
                          text={`${item.inStock ? "Move to Cart" : "Out of Stock"}`}
                          icon={<FiShoppingBag size={12} />}
                          url="/cart"
                          className={`
                            flex
                            h-9
                            w-full
                            items-center
                            justify-center
                            gap-1.5
                            rounded-lg
                            text-[8px]
                            font-extrabold
                            transition-all
                            sm:h-10
                            sm:text-[9px]

                            ${
                              item.inStock
                                ? `
                                  bg-[#ffd83d]
                                  text-black
                                  hover:bg-[#ffcf12]
                                  hover:shadow-[0_5px_14px_rgba(255,216,61,0.24)]
                                `
                                : `
                                  pointer-events-none
                                  bg-gray-100
                                  text-gray-400
                                  dark:bg-[#252525]
                                `
                            }
                          `}
                        />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        ) : (
          /* EMPTY */
          <div
            className="
              flex
              min-h-107.5
              flex-col
              items-center
              justify-center
              rounded-2xl
              border
              border-dashed
              border-gray-200
              bg-white
              px-4
              text-center
              dark:border-gray-800
              dark:bg-[#181818]
            "
          >
            <div
              className="
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-full
                bg-[#fff6ce]
                text-[#8b6a00]
                dark:bg-[#2b260f]
                dark:text-[#ffd83d]
              "
            >
              <FiHeart size={25} />
            </div>

            <h2
              className="
                mt-4
                font-serif
                text-[18px]
                font-extrabold
                text-black
                dark:text-white
              "
            >
              Your wishlist is empty
            </h2>

            <p
              className="
                mt-1
                max-w-[320px]
                text-[10px]
                leading-4
                text-gray-900
              "
            >
              Save products you like and come back to them anytime.
            </p>

            <ThemeBtnOne
              text=" Start Shopping"
              url="/product-list"
              icon={<FiShoppingBag size={12} />}
              className="
                mt-5
                flex
                h-10
                items-center
                justify-center
                gap-1.5
                rounded-xl
                bg-[#ffd83d]
                px-5
                text-[9px]
                font-extrabold
                text-black
                transition
                hover:bg-[#ffcf12]
              "
            />
          </div>
        )}
      </div>
    </main>
  );
};

export default Wishlist;
