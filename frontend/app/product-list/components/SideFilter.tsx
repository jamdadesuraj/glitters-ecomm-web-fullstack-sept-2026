"use client";

import ThemeBtnOne from "@/app/components/ThemeBtnOne";
import React, { useState } from "react";
import { FiChevronDown, FiChevronUp, FiRotateCcw } from "react-icons/fi";

const colors = [
  { name: "Black", className: "bg-black" },
  { name: "White", className: "bg-white border border-gray-300" },
  { name: "Blue", className: "bg-blue-500" },
  { name: "Red", className: "bg-red-500" },
  { name: "Green", className: "bg-green-500" },
  { name: "Yellow", className: "bg-yellow-400" },
  { name: "Gray", className: "bg-gray-400" },
  { name: "Purple", className: "bg-purple-500" },
];

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

const SideFilter = () => {
  const [priceOpen, setPriceOpen] = useState(true);
  const [colorOpen, setColorOpen] = useState(true);
  const [sizeOpen, setSizeOpen] = useState(true);
  const [availabilityOpen, setAvailabilityOpen] = useState(true);

  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("5000");

  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [inStock, setInStock] = useState(false);
  const [onSale, setOnSale] = useState(false);

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color)
        ? prev.filter((item) => item !== color)
        : [...prev, color],
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size)
        ? prev.filter((item) => item !== size)
        : [...prev, size],
    );
  };

  const clearFilters = () => {
    setMinPrice("0");
    setMaxPrice("5000");
    setSelectedColors([]);
    setSelectedSizes([]);
    setInStock(false);
    setOnSale(false);
  };

  return (
    <div
      className="
        w-full
        overflow-hidden
        rounded-2xl
        border
        border-gray-200
        bg-white
        shadow-[0_4px_20px_rgba(0,0,0,0.04)]

        dark:border-gray-800
        dark:bg-[#161616]
      "
    >
      {/* HEADER */}
      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-gray-100
          px-4
          py-4

          dark:border-gray-800
        "
      >
        <div>
          <h3 className="text-[15px] font-extrabold text-black dark:text-white font-serif">
            Filters
          </h3>

          <p className="mt-0.5 text-[10px] text-gray-400">
            Refine your results
          </p>
        </div>

        <button
          type="button"
          onClick={clearFilters}
          className="
            flex
            cursor-pointer
            items-center
            gap-1
            
            px-2
            py-1.5
            text-[9px]
            font-bold
            text-white
            transition

            hover:bg-gray-100
            hover:text-black

            dark:hover:bg-[#222] bg-rose-400 rounded-lg
            dark:hover:text-white
          "
        >
          <FiRotateCcw size={11} />
          Clear
        </button>
      </div>

      {/* PRICE RANGE */}
      <div className="border-b border-gray-100 dark:border-gray-800">
        <button
          type="button"
          onClick={() => setPriceOpen((prev) => !prev)}
          className="
            flex
            w-full
            cursor-pointer
            items-center
            justify-between
            px-4
            py-3.5
            text-left
          "
        >
          <span className="text-[12px] font-bold text-black dark:text-white">
            Price Range
          </span>

          {priceOpen ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
        </button>

        {priceOpen && (
          <div className="px-4 pb-4">
            {/* RANGE */}
            <input
              type="range"
              min="0"
              max="5000"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="
                h-1.5
                w-full
                cursor-pointer
                accent-[#ffd83d]
              "
            />

            {/* VALUES */}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div>
                <label className="mb-1 block text-[9px] font-medium text-gray-900">
                  Min Price
                </label>

                <div
                  className="
                    flex
                    h-9
                    items-center
                    rounded-lg
                    border
                    border-gray-200
                    bg-[#fafafa]
                    px-2.5

                    dark:border-gray-700
                    dark:bg-[#1d1d1d]
                  "
                >
                  <span className="mr-1 text-[10px] text-gray-400">AED</span>

                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="
                      min-w-0
                      flex-1
                      bg-transparent
                      text-[11px]
                      font-semibold
                      text-black
                      outline-none

                      dark:text-white
                    "
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-[9px] font-medium text-gray-900">
                  Max Price
                </label>

                <div
                  className="
                    flex
                    h-9
                    items-center
                    rounded-lg
                    border
                    border-gray-200
                    bg-[#fafafa]
                    px-2.5

                    dark:border-gray-700
                    dark:bg-[#1d1d1d]
                  "
                >
                  <span className="mr-1 text-[10px] text-gray-400">AED</span>

                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="
                      min-w-0
                      flex-1
                      bg-transparent
                      text-[11px]
                      font-semibold
                      text-black
                      outline-none

                      dark:text-white
                    "
                  />
                </div>
              </div>
            </div>

            <ThemeBtnOne
              text="    Apply Price"
              className="
                mt-3
                h-9
                w-full
                cursor-pointer
                rounded-lg
                bg-[#ffd83d]
                text-[10px]
                font-extrabold
                text-black
                transition

                hover:bg-[#ffce18]
              "
            />
          </div>
        )}
      </div>

      {/* COLORS */}
      <div className="border-b border-gray-100 dark:border-gray-800">
        <button
          type="button"
          onClick={() => setColorOpen((prev) => !prev)}
          className="
            flex
            w-full
            cursor-pointer
            items-center
            justify-between
            px-4
            py-3.5
          "
        >
          <span className="text-[12px] font-bold text-black dark:text-white">
            Colors
          </span>

          {colorOpen ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
        </button>

        {colorOpen && (
          <div className="flex flex-wrap gap-2 px-4 pb-4">
            {colors.map((color) => {
              const selected = selectedColors.includes(color.name);

              return (
                <button
                  key={color.name}
                  type="button"
                  title={color.name}
                  onClick={() => toggleColor(color.name)}
                  className={`
                    relative
                    flex
                    h-8
                    w-8
                    cursor-pointer
                    items-center
                    justify-center
                    rounded-full
                    border
                    transition-all

                    ${
                      selected
                        ? "scale-105 border-black ring-2 ring-[#ffd83d] ring-offset-2"
                        : "border-gray-200 hover:scale-105"
                    }

                    dark:border-gray-700
                    dark:ring-offset-[#161616]
                  `}
                >
                  <span
                    className={`
                      h-5
                      w-5
                      rounded-full
                      ${color.className}
                    `}
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* SIZE */}
      <div className="border-b border-gray-100 dark:border-gray-800">
        <button
          type="button"
          onClick={() => setSizeOpen((prev) => !prev)}
          className="
            flex
            w-full
            cursor-pointer
            items-center
            justify-between
            px-4
            py-3.5
          "
        >
          <span className="text-[12px] font-bold text-black dark:text-white">
            Size
          </span>

          {sizeOpen ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
        </button>

        {sizeOpen && (
          <div className="grid grid-cols-3 gap-2 px-4 pb-4">
            {sizes.map((size) => {
              const selected = selectedSizes.includes(size);

              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={`
                    h-9
                    cursor-pointer
                    rounded-lg
                    border
                    text-[10px]
                    font-bold
                    transition-all

                    ${
                      selected
                        ? "border-[#ffd83d] bg-[#ffd83d] text-black"
                        : "border-gray-200 bg-white text-gray-600 hover:border-[#ffd83d]"
                    }

                    dark:border-gray-700
                    dark:bg-[#1d1d1d]
                    dark:text-gray-300

                    ${
                      selected
                        ? "dark:border-[#ffd83d] dark:bg-[#ffd83d] dark:text-black"
                        : ""
                    }
                  `}
                >
                  {size}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* AVAILABILITY */}
      <div>
        <button
          type="button"
          onClick={() => setAvailabilityOpen((prev) => !prev)}
          className="
            flex
            w-full
            cursor-pointer
            items-center
            justify-between
            px-4
            py-3.5
          "
        >
          <span className="text-[12px] font-bold text-black dark:text-white">
            Availability
          </span>

          {availabilityOpen ? (
            <FiChevronUp size={14} />
          ) : (
            <FiChevronDown size={14} />
          )}
        </button>

        {availabilityOpen && (
          <div className="space-y-3 px-4 pb-4">
            <label className="flex cursor-pointer items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold text-gray-700 dark:text-gray-300">
                  In Stock
                </p>

                <p className="mt-0.5 text-[9px] text-gray-400">
                  Available products only
                </p>
              </div>

              <input
                type="checkbox"
                checked={inStock}
                onChange={(e) => setInStock(e.target.checked)}
                className="
                  h-4
                  w-4
                  cursor-pointer
                  accent-[#ffd83d]
                "
              />
            </label>

            <label className="flex cursor-pointer items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold text-gray-700 dark:text-gray-300">
                  On Sale
                </p>

                <p className="mt-0.5 text-[9px] text-gray-400">
                  Discounted items
                </p>
              </div>

              <input
                type="checkbox"
                checked={onSale}
                onChange={(e) => setOnSale(e.target.checked)}
                className="
                  h-4
                  w-4
                  cursor-pointer
                  accent-[#ffd83d]
                "
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideFilter;
