"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  FiShoppingBag,
  FiX,
  FiMinus,
  FiPlus,
  FiTrash2,
  FiPackage,
  FiTruck,
  FiShield,
  FiArrowRight,
  FiBox,
  FiCheckCircle,
  FiArrowRightCircle,
} from "react-icons/fi";
import ThemeBtnOne from "./ThemeBtnOne";

const MyCartSideDrawer = () => {
  const [open, setOpen] = useState(false);

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Apple iPhone 16 Pro Max",
      image: "",
      size: "256 GB",
      color: "Natural Titanium",
      colorCode: "#c8c3b8",
      qty: 1,
      price: 4899,
    },
    {
      id: 2,
      name: "Samsung Galaxy S25 Ultra",
      image: "",
      size: "512 GB",
      color: "Titanium Black",
      colorCode: "#292929",
      qty: 1,
      price: 4499,
    },
  ]);

  const increaseQty = (id: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item,
      ),
    );
  };

  const decreaseQty = (id: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item,
      ),
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const totalQty = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );

  return (
    <>
      {/* CART HEADER BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="
          group flex min-h-10.5 items-center gap-2.5 cursor-pointer
          text-left text-[#202020]
          transition-all
          hover:text-[#d8a900]
          dark:text-white
        "
      >
        <div className="relative">
          <FiShoppingBag
            size={27}
            strokeWidth={1.6}
            className="transition-transform duration-200 group-hover:scale-105"
          />

          <span
            className="
              absolute -right-2.5 -top-2
              flex h-4.5 min-w-4.5
              items-center justify-center
              rounded-full
              bg-[#ffd83d]
              px-1
              text-[9px] font-bold text-black
              shadow-sm
            "
          >
            {totalQty}
          </span>
        </div>

        <div className="leading-tight">
          <p className="text-[11px] font-bold">My Cart</p>

          <p className="mt-0.5 text-[10px] text-gray-500 dark:text-gray-400">
            AED {subtotal.toLocaleString()}
          </p>
        </div>
      </button>

      {/* OVERLAY */}
      <div
        onClick={() => setOpen(false)}
        className={`
          fixed inset-0 z-9998
          bg-black/25 backdrop-blur-[2px]
          transition-all duration-300
          ${
            open
              ? "visible opacity-100"
              : "invisible pointer-events-none opacity-0"
          }
        `}
      />

      {/* DRAWER */}
      <aside
        className={`
          fixed right-0 top-0 z-9999
          flex h-dvh w-full max-w-115
          flex-col
          bg-[#ffffff]
          shadow-[-16px_0_45px_rgba(0,0,0,0.08)]
          transition-transform duration-300 ease-out
          dark:bg-[#111]
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* HEADER */}
        <div
          className="
            relative flex min-h-20.5
            shrink-0 items-center
            justify-between
            overflow-hidden
            border-b border-[#eeeeee]
            bg-linear-to-r
            from-[#fffdf3]
            via-white
            to-[#fff9df]
            px-6
            dark:border-gray-800
            dark:from-[#161616]
            dark:via-[#111]
            dark:to-[#181818]
          "
        >
          {/* LIGHT VECTOR BG */}
          <FiShoppingBag
            className="
              pointer-events-none
              absolute -bottom-7 -right-3
              text-[#ffd83d]/15
              dark:text-white/5
            "
            size={110}
            strokeWidth={1}
          />

          <div className="relative z-10 flex items-center gap-3">
            <div
              className="
                flex h-11 w-11
                items-center justify-center
                rounded-xl
                bg-[#fff4bc]
                text-[#bd8f00]
                dark:bg-[#25200e]
                dark:text-[#ffd83d]
              "
            >
              <FiShoppingBag size={21} />
            </div>

            <div>
              <h2 className="text-[16px] font-bold text-[#181818] dark:text-white">
                Shopping Cart
              </h2>

              <p className="mt-0.5 text-[11px] text-gray-500 dark:text-gray-400">
                {totalQty} {totalQty === 1 ? "item" : "items"} added
              </p>
            </div>
          </div>

          <button
            onClick={() => setOpen(false)}
            aria-label="Close cart"
            className="
              relative z-10
              flex h-9 w-9
              cursor-pointer
              items-center justify-center
              rounded-full
              border border-gray-200
              bg-white
              text-gray-600
              shadow-sm
              transition-all
              hover:border-red-200
              hover:bg-red-50
              hover:text-red-500
              dark:border-gray-700
              dark:bg-[#1d1d1d]
              dark:text-white
            "
          >
            <FiX size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto bg-[#fcfcfc] px-5 py-4 dark:bg-[#111]">
          {cartItems.length > 0 ? (
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="
                    rounded-2xl
                    border border-[#eeeeee]
                    bg-white
                    p-3.5
                    shadow-[0_3px_15px_rgba(0,0,0,0.025)]
                    transition
                    hover:border-[#eadb95]
                    hover:shadow-[0_5px_20px_rgba(0,0,0,0.045)]
                    dark:border-gray-800
                    dark:bg-[#171717]
                  "
                >
                  <div className="flex gap-3.5">
                    {/* PRODUCT IMAGE */}
                    <div
                      className="
                        flex h-26.25 w-23
                        shrink-0 items-center
                        justify-center
                        overflow-hidden
                        rounded-xl
                        border border-[#eeeeee]
                        bg-[#f8f8f8]
                        dark:border-gray-800
                        dark:bg-[#202020]
                      "
                    >
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={92}
                          height={105}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-1.5 text-gray-300 dark:text-gray-600">
                          <FiBox size={32} strokeWidth={1.3} />
                          <span className="text-[9px]">Product</span>
                        </div>
                      )}
                    </div>

                    {/* PRODUCT DETAILS */}
                    <div className="min-w-0 flex-1">
                      {/* NAME + PRICE */}
                      <div className="flex items-start justify-between gap-3">
                        <h3
                          className="
                            line-clamp-2 flex-1
                            text-[13px] font-bold
                            leading-4.75
                            text-[#222]
                            dark:text-white
                          "
                        >
                          {item.name}
                        </h3>

                        <div className="shrink-0 text-right">
                          <p className="text-[13px] font-bold text-[#111] dark:text-white">
                            AED {(item.price * item.qty).toLocaleString()}
                          </p>

                          {item.qty > 1 && (
                            <p className="mt-0.5 text-[9px] text-black font-semibold">
                              AED {item.price.toLocaleString()} each
                            </p>
                          )}
                        </div>
                      </div>

                      {/* VARIANTS */}
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        {/* SIZE */}
                        <div
                          className="
                            flex items-center gap-1.5
                            rounded-lg
                            border border-[#eeeeee]
                            bg-[#fafafa]
                            px-2 py-1.5
                            text-[10px]
                            text-gray-600
                            dark:border-gray-700
                            dark:bg-[#202020]
                            dark:text-gray-300
                          "
                        >
                          <FiPackage size={11} />

                          <span>
                            Size:
                            <strong className="ml-1 font-semibold text-[#333] dark:text-white">
                              {item.size}
                            </strong>
                          </span>
                        </div>

                        {/* COLOR */}
                        <div
                          className="
                            flex items-center gap-1.5
                            rounded-lg
                            border border-[#eeeeee]
                            bg-[#fafafa]
                            px-2 py-1.5
                            text-[10px]
                            text-gray-600
                            dark:border-gray-700
                            dark:bg-[#202020]
                            dark:text-gray-300
                          "
                        >
                          <span
                            className="h-2.5 w-2.5 rounded-full border border-black/10"
                            style={{
                              backgroundColor: item.colorCode,
                            }}
                          />

                          <span>{item.color}</span>
                        </div>
                      </div>

                      {/* QTY & DELETE */}
                      <div className="mt-3.5 flex items-center justify-between">
                        {/* QTY */}
                        <div
                          className="
                            flex h-8
                            items-center
                            overflow-hidden
                            rounded-lg
                            border border-[#e5e5e5]
                            bg-white
                            dark:border-gray-700
                            dark:bg-[#1c1c1c]
                          "
                        >
                          <button
                            onClick={() => decreaseQty(item.id)}
                            className="
                              flex h-full w-8
                              cursor-pointer
                              items-center justify-center
                              text-gray-500
                              transition
                              hover:bg-[#fff8db]
                              hover:text-black
                              dark:hover:bg-[#292929]
                            "
                          >
                            <FiMinus size={11} />
                          </button>

                          <span
                            className="
                              flex h-full min-w-9
                              items-center justify-center
                              border-x border-[#e5e5e5]
                              text-[11px] font-bold
                              text-[#222]
                              dark:border-gray-700
                              dark:text-white
                            "
                          >
                            {item.qty}
                          </span>

                          <button
                            onClick={() => increaseQty(item.id)}
                            className="
                              flex h-full w-8
                              cursor-pointer
                              items-center justify-center
                              text-gray-500
                              transition
                              hover:bg-[#fff8db]
                              hover:text-black
                              dark:hover:bg-[#292929]
                            "
                          >
                            <FiPlus size={11} />
                          </button>
                        </div>

                        {/* REMOVE */}
                        <button
                          onClick={() => removeItem(item.id)}
                          aria-label="Remove product"
                          className="
                            flex h-8 w-8
                            cursor-pointer
                            items-center justify-center
                            rounded-lg
                            bg-[#fff2f2]
                            text-[#e26a6a]
                            transition-all
                            hover:bg-[#ffe2e2]
                            hover:text-red-600
                            dark:bg-red-500/10
                            dark:text-red-400
                          "
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* FREE SHIPPING INFO */}
              <div
                className="
                  mt-4 flex items-center
                  gap-3 rounded-xl
                  border border-[#e8f4ec]
                  bg-[#f5fbf7]
                  p-3
                  dark:border-green-900/30
                  dark:bg-green-900/10
                "
              >
                <div
                  className="
                    flex h-9 w-9
                    shrink-0 items-center
                    justify-center
                    rounded-full
                    bg-[#e6f6eb]
                    text-[#4b9b65]
                    dark:bg-green-500/10
                    dark:text-green-400
                  "
                >
                  <FiTruck size={17} />
                </div>

                <div>
                  <p className="text-[11px] font-bold text-[#345d41] dark:text-green-300">
                    Free Shipping Available
                  </p>

                  <p className="mt-0.5 text-[9px] text-[#71917b] dark:text-gray-400">
                    Your order qualifies for free delivery
                  </p>
                </div>

                <FiCheckCircle size={17} className="ml-auto text-[#5ba874]" />
              </div>
            </div>
          ) : (
            /* EMPTY CART */
            <div className="flex h-full flex-col items-center justify-center px-8 py-16 text-center">
              {/* VECTOR */}
              <div className="relative">
                <div
                  className="
                    absolute inset-0
                    scale-125 rounded-full
                    bg-[#fff8d7]
                    blur-xl
                    dark:bg-yellow-500/5
                  "
                />

                <div
                  className="
                    relative flex h-24 w-24
                    items-center justify-center
                    rounded-full
                    bg-[#fff9df]
                    text-[#d3ad20]
                    dark:bg-[#201d12]
                    dark:text-yellow-400
                  "
                >
                  <FiShoppingBag size={40} strokeWidth={1.2} />
                </div>
              </div>

              <h3 className="mt-7 text-[17px] font-bold text-[#222] dark:text-white">
                Your cart is empty
              </h3>

              <p className="mt-2 max-w-62.5 text-[11px] leading-5 text-gray-500">
                Looks like you haven&apos;t added anything to your cart yet.
              </p>

              <button
                onClick={() => setOpen(false)}
                className="
                  mt-6 flex h-10
                  items-center gap-2
                  rounded-lg
                  bg-[#ffd83d]
                  px-5
                  text-[11px] font-bold
                  text-black
                  transition
                  hover:bg-[#f6c900]
                "
              >
                Start Shopping
                <FiArrowRight size={14} />
              </button>
            </div>
          )}
        </div>

        {/* FOOTER */}
        {cartItems.length > 0 && (
          <div
            className="
              shrink-0
              border-t border-[#eeeeee]
              bg-white
              px-5 pb-5 pt-4
              dark:border-gray-800
              dark:bg-[#151515]
            "
          >
            {/* PRICE SUMMARY */}
            <div className="rounded-xl bg-[#fafafa] p-3.5 dark:bg-[#1d1d1d]">
              <div className="flex items-center justify-between">
                <span className="text-[11px]  font-semibold">Items</span>

                <span className="text-[11px] font-semibold text-gray-700 dark:text-gray-200">
                  {totalQty}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between">
                <span className="text-[11px]  font-semibold">Shipping</span>

                <span className="text-[10px] font-bold text-green-600 ">
                  FREE
                </span>
              </div>

              <div className="my-3 h-px bg-gray-200 dark:bg-gray-700" />

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[13px] font-bold text-[#222] dark:text-white font-serif tracking-wider">
                    Subtotal
                  </p>

                  <p className="mt-0.5 text-[9px] text-black dark:text-gray-400">
                    VAT calculated at checkout
                  </p>
                </div>

                <p className="text-[18px] font-bold text-[#111] dark:text-white font-serif tracking-wider">
                  AED {subtotal.toLocaleString()}
                </p>
              </div>
            </div>

            {/* CHECKOUT */}
            <ThemeBtnOne
              text="Proceed to Checkout"
              url="/checkout"
              icon={<FiArrowRightCircle size={16} />}
              className="
                group mt-4
                flex h-12 w-full
                items-center justify-center
                gap-2 rounded-xl
                bg-[#ffd83d]
                text-[11px] font-bold
                 capitalize
                text-black
                shadow-[0_5px_15px_rgba(255,216,61,0.22)]
                transition font-serif
                hover:bg-[#f8cb00]
              "
            />

            {/* VIEW CART */}
            <Link
              href="/cart"
              onClick={() => setOpen(false)}
              className="
                mt-2.5 flex h-11 w-full
                items-center justify-center
                rounded-xl
                border border-[#e5e5e5]
                bg-white
                text-[11px] font-bold
                text-[#333]
                transition
                hover:border-gray-300
                hover:bg-[#fafafa]
                dark:border-gray-700
                dark:bg-[#1b1b1b]
                dark:text-white font-serif tracking-wider
              "
            >
              View Shopping Cart
            </Link>

            {/* SECURE CHECKOUT */}
            <div className="mt-3 flex items-center justify-center gap-1.5 text-[9px]  tracking-wider">
              <FiShield size={12} />
              Secure & protected checkout
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default MyCartSideDrawer;
