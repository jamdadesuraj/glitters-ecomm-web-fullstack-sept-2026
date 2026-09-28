"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiChevronLeft,
  FiHeart,
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiTrash2,
  FiTruck,
  FiShield,
  FiTag,
  FiArrowRightCircle,
} from "react-icons/fi";
import ThemeBtnOne from "@/app/components/ThemeBtnOne";
import CouponsList from "./CouponsList";

type CartItem = {
  id: number;
  name: string;
  brand: string;
  image: string;
  price: number;
  oldPrice?: number;
  quantity: number;
  stock?: boolean;
  color?: string;
  size?: string;
};

const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: "Apple iPhone 16 Pro Max 256GB",
    brand: "Apple",
    image: "/img/products/iphone.png",
    price: 4899,
    oldPrice: 5299,
    quantity: 1,
    stock: true,
    color: "Black Titanium",
    size: "256GB",
  },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  const [coupon, setCoupon] = useState("");

  const updateQuantity = (id: number, type: "increase" | "decrease") => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) {
          return item;
        }

        const nextQuantity =
          type === "increase"
            ? item.quantity + 1
            : Math.max(1, item.quantity - 1);

        return {
          ...item,
          quantity: nextQuantity,
        };
      }),
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  }, [cartItems]);

  const shipping = subtotal >= 500 ? 0 : 25;

  const discount = 0;

  const total = subtotal + shipping - discount;

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <main
      className="
        min-h-screen
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
            mb-4
            flex
            items-end
            justify-between
            gap-4

            sm:mb-6
          "
        >
          <div>
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
              Shopping Cart
            </h1>

            <p
              className="
                mt-1
                text-[10px]
                text-gray-500

                sm:text-[11px]

                dark:text-gray-400
              "
            >
              {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          <Link
            href="/products"
            className="
              flex
              shrink-0
              items-center
              gap-1
              text-[10px]
              font-bold
              text-black
              transition

              hover:text-[#b58b00]

              sm:text-[11px]

              dark:text-white
              dark:hover:text-[#ffd83d]
            "
          >
            <FiChevronLeft size={14} />
            Continue Shopping
          </Link>
        </div>

        {cartItems.length > 0 ? (
          <div
            className="
              grid
              grid-cols-1
              gap-4

              lg:grid-cols-[minmax(0,1fr)_340px]

              xl:grid-cols-[minmax(0,1fr)_380px]
              xl:gap-6
            "
          >
            {/* LEFT */}
            <div className="min-w-0">
              <div className="space-y-3 sm:space-y-4">
                {cartItems.map((item) => {
                  const itemTotal = item.price * item.quantity;

                  return (
                    <article
                      key={item.id}
                      className="
                        rounded-2xl
                        border
                        border-gray-200
                        bg-white
                        p-3
                        shadow-[0_4px_18px_rgba(0,0,0,0.04)]

                        sm:p-4

                        dark:border-gray-800
                        dark:bg-[#181818]
                      "
                    >
                      <div
                        className="
                          flex
                          gap-3

                          sm:gap-4
                        "
                      >
                        {/* IMAGE */}
                        <Link
                          href={`/product/${item.id}`}
                          className="
                            relative
                            flex
                            h-26.25
                            w-23.75
                            shrink-0
                            items-center
                            justify-center
                            overflow-hidden
                            rounded-xl
                            bg-[#f8f8f8]
                            p-2

                            sm:h-32.5
                            sm:w-31.25

                            lg:h-36.25
                            lg:w-35

                            dark:bg-[#222]
                          "
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={160}
                            height={160}
                            className="
                              h-full
                              w-full
                              object-contain
                            "
                          />
                        </Link>

                        {/* CONTENT */}
                        <div
                          className="
                            flex
                            min-w-0
                            flex-1
                            flex-col
                          "
                        >
                          {/* BRAND */}
                          <p
                            className="
                              text-[8px]
                              font-bold
                              uppercase
                              tracking-[0.7px]
                              text-gray-400

                              sm:text-[9px]
                            "
                          >
                            {item.brand}
                          </p>

                          {/* NAME */}
                          <Link href={`/product/${item.id}`}>
                            <h2
                              className="
                                mt-1
                                line-clamp-2
                                font-serif
                                text-[11px]
                                font-bold
                                leading-4
                                text-black
                                transition

                                hover:text-[#b58b00]

                                sm:text-[14px]
                                sm:leading-5

                                dark:text-white
                              "
                            >
                              {item.name}
                            </h2>
                          </Link>

                          {/* ATTRIBUTES */}
                          <div className="mt-2 flex flex-wrap items-center gap-1.5">
                            {item.color && (
                              <span
                                className="
        inline-flex
        items-center
        gap-1.5
        rounded-full
        border
        border-gray-200
        bg-white
        px-2.5
        py-1
        text-[8px]
        font-semibold
        text-gray-600

        sm:text-[9px]

        dark:border-gray-700
        dark:bg-[#202020]
        dark:text-gray-300
      "
                              >
                                <span
                                  className="
          h-2
          w-2
          shrink-0
          rounded-full
          border
          border-black/10
          bg-gray-800
        "
                                />

                                {item.color}
                              </span>
                            )}

                            {item.size && (
                              <span
                                className="
        inline-flex
        items-center
        rounded-full
        border
        border-[#ffe177]
        bg-[#fff9df]
        px-2.5
        py-1
        text-[8px]
        font-bold
        text-[#8c6b00]

        sm:text-[9px]

        dark:border-[#6b5813]
        dark:bg-[#29240f]
        dark:text-[#ffd83d]
      "
                              >
                                {item.size}
                              </span>
                            )}
                          </div>

                          {/* PRICE / QTY */}
                          <div
                            className="
                              mt-auto
                              flex
                              flex-wrap
                              items-end
                              justify-between
                              gap-2
                              pt-3
                            "
                          >
                            {/* PRICE */}
                            <div>
                              <div className="flex flex-wrap items-baseline gap-1.5">
                                <span
                                  className="
                                    font-serif
                                    text-[14px]
                                    font-extrabold
                                    text-black

                                    sm:text-[17px]

                                    dark:text-white
                                  "
                                >
                                  AED {item.price.toLocaleString()}
                                </span>

                                {item.oldPrice &&
                                  item.oldPrice > item.price && (
                                    <span
                                      className="
                                        text-[8px]
                                        text-gray-400
                                        line-through

                                        sm:text-[9px]
                                      "
                                    >
                                      AED {item.oldPrice.toLocaleString()}
                                    </span>
                                  )}
                              </div>

                              {item.quantity > 1 && (
                                <p
                                  className="
                                    mt-0.5
                                    text-[8px]
                                    text-gray-400
                                  "
                                >
                                  Total: AED {itemTotal.toLocaleString()}
                                </p>
                              )}
                            </div>

                            {/* QUANTITY */}
                            <div
                              className="
                                flex
                                h-9
                                items-center
                                overflow-hidden
                                rounded-lg
                                border
                                border-gray-200
                                bg-white

                                sm:h-10

                                dark:border-gray-700
                                dark:bg-[#202020]
                              "
                            >
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(item.id, "decrease")
                                }
                                className="
                                  flex
                                  h-full
                                  w-8
                                  cursor-pointer
                                  items-center
                                  justify-center
                                  text-gray-500
                                  transition

                                  hover:bg-gray-50
                                  hover:text-black

                                  sm:w-9

                                  dark:hover:bg-[#292929]
                                  dark:hover:text-white
                                "
                              >
                                <FiMinus size={12} />
                              </button>

                              <span
                                className="
                                  flex
                                  h-full
                                  min-w-8
                                  items-center
                                  justify-center
                                  border-x
                                  border-gray-200
                                  px-1
                                  text-[10px]
                                  font-bold
                                  text-black

                                  sm:min-w-9

                                  dark:border-gray-700
                                  dark:text-white
                                "
                              >
                                {item.quantity}
                              </span>

                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(item.id, "increase")
                                }
                                className="
                                  flex
                                  h-full
                                  w-8
                                  cursor-pointer
                                  items-center
                                  justify-center
                                  text-gray-500
                                  transition

                                  hover:bg-gray-50
                                  hover:text-black

                                  sm:w-9

                                  dark:hover:bg-[#292929]
                                  dark:hover:text-white
                                "
                              >
                                <FiPlus size={12} />
                              </button>
                            </div>
                          </div>

                          {/* ACTIONS */}
                          <div
                            className="
                              mt-3
                              flex
                              items-center
                              gap-4
                              border-t
                              border-gray-100
                              pt-2.5

                              dark:border-gray-800
                            "
                          >
                            <Link
                              href={"/wishlist"}
                              className="
                                flex
                                cursor-pointer
                                items-center
                                gap-1
                                text-[8px]
                                font-semibold
                                text-gray-500
                                transition

                                hover:text-red-500

                                sm:text-[9px]
                              "
                            >
                              <FiHeart size={12} />
                              Save for later
                            </Link>

                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="
                                flex
                                cursor-pointer
                                items-center
                                gap-1
                                text-[8px]
                                font-semibold
                                text-white
                                transition
                                 bg-rose-400 rounded-full px-2 py-1
                                hover:text-black

                                sm:text-[9px]
                              "
                            >
                              <FiTrash2 size={12} />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* BENEFITS */}
              <div
                className="
                  mt-4
                  
                  grid-cols-1
                  gap-2
                  hidden md:grid
                  sm:grid-cols-3
                  sm:gap-3
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-2.5
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    p-3

                    dark:border-gray-800
                    dark:bg-[#181818]
                  "
                >
                  <FiTruck className="shrink-0 text-[#b58b00]" />

                  <div>
                    <p className="text-[12px] font-bold font-serif text-black dark:text-white">
                      Fast Delivery
                    </p>

                    <p className="mt-0.5 text-[12px] text-gray-400">
                      Quick & secure shipping
                    </p>
                  </div>
                </div>

                <div
                  className="
                    flex
                    items-center
                    gap-2.5
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    p-3

                    dark:border-gray-800
                    dark:bg-[#181818]
                  "
                >
                  <FiShield className="shrink-0 text-[#b58b00]" />

                  <div>
                    <p className="text-[12px] font-bold font-serif text-black dark:text-white">
                      Secure Payment
                    </p>

                    <p className="mt-0.5 text-[12px] text-gray-400">
                      Protected checkout
                    </p>
                  </div>
                </div>

                <div
                  className="
                    flex
                    items-center
                    gap-2.5
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    p-3

                    dark:border-gray-800
                    dark:bg-[#181818]
                  "
                >
                  <FiShoppingBag className="shrink-0 text-[#b58b00]" />

                  <div>
                    <p className="text-[12px] font-bold font-serif text-black dark:text-white">
                      Original Products
                    </p>

                    <p className="mt-0.5 text-[12px] text-gray-400">
                      100% genuine items
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ORDER SUMMARY */}
            <aside className="min-w-0">
              <div
                className="
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  p-4
                  shadow-[0_5px_24px_rgba(0,0,0,0.05)]

                  lg:sticky
                  lg:top-27.5

                  sm:p-5

                  dark:border-gray-800
                  dark:bg-[#181818]
                "
              >
                <h2
                  className="
                    font-serif
                    text-[16px]
                    font-extrabold
                    text-black

                    sm:text-[18px]

                    dark:text-white
                  "
                >
                  Order Summary
                </h2>

                {/* COUPON */}
                <div className="mt-4">
                  <label
                    className="
                      mb-1.5
                      block
                      text-[9px]
                      font-bold
                      text-gray-600

                      dark:text-gray-300
                    "
                  >
                    Have a coupon?
                  </label>

                  <div
                    className="
                      flex
                      h-10
                      overflow-hidden
                      rounded-xl
                      border
                      border-gray-200
                      transition

                      focus-within:border-[#ffd83d]

                      dark:border-gray-700
                    "
                  >
                    <div className="flex min-w-0 flex-1 items-center">
                      <FiTag
                        className="
                          ml-3
                          shrink-0
                          text-gray-400
                        "
                        size={14}
                      />

                      <input
                        type="text"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        placeholder="Enter coupon code"
                        className="
                          h-full
                          min-w-0
                          flex-1
                          bg-transparent
                          px-2
                          text-[10px]
                          text-black
                          outline-none
                          placeholder:text-gray-400

                          dark:text-white
                        "
                      />
                    </div>

                    <button
                      type="button"
                      className="
                        shrink-0
                        bg-[#ffd83d]
                        px-3
                        text-[9px]
                        font-bold
                        text-black
                        transition

                        hover:bg-[#ffcf12]
                      "
                    >
                      Apply
                    </button>
                  </div>
                </div>

                {/* coupons list start */}
                {/* coupons list start */}
                <div className="mt-5">
                  <CouponsList
                    onApply={(coupon) => {
                      console.log("Applied coupon:", coupon.code);
                    }}
                  />
                </div>
                {/* coupons list end */}
                {/* coupons list end */}

                {/* SUMMARY */}
                <div
                  className="
                    mt-5
                    space-y-3
                    border-y
                    border-gray-100
                    py-4

                    dark:border-gray-800
                  "
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-gray-900 font-semibold">
                      Subtotal
                    </span>

                    <span className="text-[10px] font-bold text-black dark:text-white">
                      AED {subtotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-gray-900 font-semibold">
                      Shipping
                    </span>

                    {shipping === 0 ? (
                      <span className="text-[10px] font-bold text-green-600">
                        FREE
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-black dark:text-white">
                        AED {shipping}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-gray-900 font-semibold">
                      Discount
                    </span>

                    <span className="text-[10px] font-bold text-green-600">
                      - AED {discount}
                    </span>
                  </div>
                </div>

                {/* TOTAL */}
                <div className="flex items-end justify-between py-4">
                  <div>
                    <p className="text-[11px] font-bold text-black dark:text-white">
                      Total
                    </p>

                    <p className="mt-0.5 text-[8px] text-gray-900">
                      Inclusive of VAT
                    </p>
                  </div>

                  <span
                    className="
                      font-serif
                      text-[20px]
                      font-extrabold
                      text-black

                      dark:text-white
                    "
                  >
                    AED {total.toLocaleString()}
                  </span>
                </div>

                {/* CHECKOUT */}

                <ThemeBtnOne
                  text=" Proceed to Checkout"
                  url="/checkout"
                  icon={<FiArrowRightCircle />}
                  className="
                    flex
                    h-11
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[#ffd83d]
                    text-[11px]
                    font-extrabold
                    text-black
                    transition-all

                    hover:bg-[#ffcf12]
                    hover:shadow-[0_6px_18px_rgba(255,216,61,0.28)]

                    active:scale-[0.99]

                    sm:h-12
                  "
                />

                <p
                  className="
                    mt-3
                    text-center
                    text-[8px]
                    leading-4
                    text-gray-400
                  "
                >
                  Secure checkout. Your payment information is protected.
                </p>
              </div>
            </aside>
          </div>
        ) : (
          /* EMPTY CART */
          <div
            className="
              flex
              min-h-105
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
                bg-[#fff7d1]
                text-black
              "
            >
              <FiShoppingBag size={26} />
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
              Your cart is empty
            </h2>

            <p
              className="
                mt-1
                max-w-[320px]
                text-[10px]
                leading-4
                text-gray-400
              "
            >
              Looks like you haven&apos;t added anything to your cart yet.
            </p>

            <Link
              href="/products"
              className="
                mt-5
                flex
                h-10
                items-center
                justify-center
                rounded-xl
                bg-[#ffd83d]
                px-5
                text-[10px]
                font-extrabold
                text-black
              "
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;
