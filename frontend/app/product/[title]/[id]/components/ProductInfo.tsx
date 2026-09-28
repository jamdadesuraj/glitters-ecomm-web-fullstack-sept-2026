"use client";

import ThemeBtnOne from "@/app/components/ThemeBtnOne";
import React, { useState } from "react";
import {
  FiCheck,
  FiHeart,
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiShield,
  FiTruck,
  FiRefreshCw,
  FiStar,
} from "react-icons/fi";

const colors = [
  { id: "black", name: "Black", value: "#111111" },
  { id: "blue", name: "Blue", value: "#2563eb" },
  { id: "silver", name: "Silver", value: "#c7c9cc" },
  { id: "red", name: "Red", value: "#dc2626" },
];

const sizes = ["S", "M", "L", "XL", "XXL"];

const ProductInfo = () => {
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);

  const selectedColorName =
    colors.find((color) => color.id === selectedColor)?.name || "";

  return (
    <div className="w-full">
      {/* Brand + Stock */}
      <div className="flex flex-wrap items-center justify-between gap-1">
        <span className="rounded-md bg-[#fff7d6] px-2.5 py-1 text-[8px] font-extrabold uppercase tracking-[0.16em] text-[#9b7900] dark:bg-[#ffd83d]/10 dark:text-[#ffd83d]">
          Apple
        </span>

        <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 dark:border-green-500/20 dark:bg-green-500/10">
          <span className="h-2 w-2 rounded-full bg-green-500" />

          <span className="text-[11px] font-bold text-green-700 dark:text-green-400">
            In Stock
          </span>
        </div>
      </div>

      {/* Product Name */}
      <h1 className="mt-2 text-2xl font-black font-serif leading-tight tracking-tight text-gray-950 dark:text-white sm:text-3xl">
        Apple iPhone 16 Pro Max 256GB
      </h1>

      {/* Rating */}
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <FiStar
              key={star}
              size={15}
              className="fill-[#f5b301] text-[#f5b301]"
            />
          ))}
        </div>

        <span className="text-[12px] font-extrabold text-gray-900 dark:text-white">
          4.8
        </span>

        <span className="h-4 w-px bg-gray-200 dark:bg-white/10" />

        <button
          type="button"
          className="cursor-pointer text-xs font-semibold text-gray-500 transition hover:text-[#a88400] dark:text-gray-400 dark:hover:text-[#ffd83d]"
        >
          186 customer reviews
        </button>
      </div>

      {/* Price Box */}
      <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-white/10 dark:bg-white/3 sm:p-5">
        <div className="flex flex-wrap items-end gap-x-3 gap-y-2">
          <span className="text-xl font-serif font-black tracking-tight text-gray-950 dark:text-white">
            AED 1,199
          </span>

          <del className="pb-1 text-sm font-semibold text-gray-400">
            AED 1,399
          </del>

          <span className="mb-0.5 rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-extrabold text-green-700 dark:bg-green-500/10 dark:text-green-400">
            Save AED 200
          </span>
        </div>

        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Inclusive of all taxes
        </p>
      </div>

      {/* Description */}
      <p className="mt-5 text-[12px] leading-7 text-gray-500 dark:text-gray-400">
        Experience premium performance with a titanium design, powerful
        processor, advanced camera system and all-day battery life.
      </p>

      <div className="my-6 h-px bg-gray-100 dark:bg-white/10" />

      {/* Color */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-gray-950 dark:text-white">
            Select Color
          </h3>

          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
            {selectedColorName}
          </span>
        </div>

        <div className="flex flex-wrap gap-3">
          {colors.map((color) => {
            const active = selectedColor === color.id;

            return (
              <button
                key={color.id}
                type="button"
                onClick={() => setSelectedColor(color.id)}
                title={color.name}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2 transition ${
                  active
                    ? "border-[#ffd83d] bg-[#fffbea] ring-2 ring-[#ffd83d]/20 dark:bg-[#ffd83d]/5"
                    : "border-gray-200 bg-white hover:border-gray-300 dark:border-white/10 dark:bg-[#151515]"
                }`}
              >
                <span
                  className="h-5 w-5 rounded-full border border-black/10"
                  style={{ backgroundColor: color.value }}
                />

                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  {color.name}
                </span>

                {active && (
                  <FiCheck
                    size={13}
                    className="text-[#a88400] dark:text-[#ffd83d]"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Size */}
      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-gray-950 dark:text-white">
            Select Size
          </h3>

          <button
            type="button"
            className="cursor-pointer text-xs font-bold text-[#a88400] hover:underline dark:text-[#ffd83d]"
          >
            Size Guide
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => {
            const active = selectedSize === size;

            return (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`flex h-11 min-w-12 cursor-pointer items-center justify-center rounded-xl border px-4 text-xs font-extrabold transition ${
                  active
                    ? "border-[#ffd83d] bg-[#ffd83d] text-black shadow-sm"
                    : "border-gray-200 bg-white text-gray-700 hover:border-[#ffd83d] dark:border-white/10 dark:bg-[#151515] dark:text-gray-300"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quantity */}
      <div className="mt-6">
        <h3 className="mb-3 text-sm font-extrabold text-gray-950 dark:text-white">
          Quantity
        </h3>

        <div className="inline-flex h-12 items-center overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/10 dark:bg-[#151515]">
          <button
            type="button"
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            disabled={quantity === 1}
            className="flex h-full w-11 cursor-pointer items-center justify-center text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30 dark:text-gray-300 dark:hover:bg-white/5"
          >
            <FiMinus size={15} />
          </button>

          <span className="flex h-full min-w-12 items-center justify-center border-x border-gray-200 px-3 text-sm font-extrabold text-gray-950 dark:border-white/10 dark:text-white">
            {quantity}
          </span>

          <button
            type="button"
            onClick={() => setQuantity((prev) => prev + 1)}
            className="flex h-full w-11 cursor-pointer items-center justify-center text-gray-600 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
          >
            <FiPlus size={15} />
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-7 flex gap-3">
        <ThemeBtnOne
          text="Add to Cart"
          url="/cart"
          icon={<FiShoppingBag size={17} />}
          className="flex h-12 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#ffd83d] px-5 text-sm font-extrabold text-black shadow-[0_8px_20px_rgba(255,216,61,0.2)] transition-all hover:-translate-y-0.5 hover:bg-[#ffcf12] hover:shadow-[0_10px_25px_rgba(255,216,61,0.28)] active:translate-y-0"
        />

        <button
          type="button"
          onClick={() => setWishlist((prev) => !prev)}
          aria-label="Toggle wishlist"
          title="Add to wishlist"
          className={`flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-xl border transition ${
            wishlist
              ? "border-red-200 bg-red-50 text-red-500 dark:border-red-500/20 dark:bg-red-500/10"
              : "border-gray-200 bg-white text-gray-600 hover:border-red-200 hover:bg-red-50 hover:text-red-500 dark:border-white/10 dark:bg-[#151515] dark:text-gray-300"
          }`}
        >
          <FiHeart size={18} className={wishlist ? "fill-current" : ""} />
        </button>
      </div>

      {/* Benefits */}
      <div className="mt-6 grid grid-cols-1 gap-3 border-t border-gray-100 pt-6 dark:border-white/10 sm:grid-cols-3">
        <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3 dark:bg-white/3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-gray-700 shadow-sm dark:bg-white/5 dark:text-gray-300">
            <FiTruck size={16} />
          </div>

          <div>
            <p className="text-[11px] font-extrabold text-gray-900 dark:text-white">
              Fast Delivery
            </p>
            <p className="mt-0.5 text-[10px] text-gray-500">Quick shipping</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3 dark:bg-white/3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-gray-700 shadow-sm dark:bg-white/5 dark:text-gray-300">
            <FiRefreshCw size={16} />
          </div>

          <div>
            <p className="text-[11px] font-extrabold text-gray-900 dark:text-white">
              Easy Returns
            </p>
            <p className="mt-0.5 text-[10px] text-gray-500">Hassle-free</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3 dark:bg-white/3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-gray-700 shadow-sm dark:bg-white/5 dark:text-gray-300">
            <FiShield size={16} />
          </div>

          <div>
            <p className="text-[11px] font-extrabold text-gray-900 dark:text-white">
              Secure Payment
            </p>
            <p className="mt-0.5 text-[10px] text-gray-500">100% protected</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
