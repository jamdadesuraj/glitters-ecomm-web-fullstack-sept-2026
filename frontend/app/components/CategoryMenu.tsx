"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FiMenu,
  FiChevronDown,
  FiChevronRight,
  FiSmartphone,
  FiHeadphones,
  FiWatch,
  FiBatteryCharging,
  FiGrid,
  FiBox,
  FiArrowRight,
} from "react-icons/fi";
import Image from "next/image";

type SubCategory = {
  name: string;
  href: string;
  img: string;
};

type Category = {
  id: string;
  name: string;
  description: string;
  href: string;
  icon: React.ElementType;
  children: SubCategory[];
};

const categories: Category[] = [
  {
    id: "mobiles",
    name: "Mobile Phones",
    description: "Latest smartphones",
    href: "/mobile-phones",
    icon: FiSmartphone,
    children: [
      {
        name: "All Mobile Phones",
        href: "/mobile-phones",
        img: "/img/categories/mobile/1.jpg",
      },
      {
        name: "Apple iPhone",
        href: "/mobile-phones/apple",
        img: "/img/categories/mobile/2.webp",
      },
      {
        name: "Samsung Phones",
        href: "/mobile-phones/samsung",
        img: "/img/categories/mobile/1.jpg",
      },
      {
        name: "Google Pixel",
        href: "/mobile-phones/google-pixel",
        img: "/img/categories/mobile/3.webp",
      },
      {
        name: "Xiaomi",
        href: "/mobile-phones/xiaomi",
        img: "/img/categories/mobile/4.png",
      },
      {
        name: "OnePlus",
        href: "/mobile-phones/oneplus",
        img: "/img/categories/mobile/5.webp",
      },
      {
        name: "Oppo",
        href: "/mobile-phones/oppo",
        img: "/img/categories/mobile/6.webp",
      },
      {
        name: "Vivo",
        href: "/mobile-phones/vivo",
        img: "/img/categories/mobile/7.webp",
      },
      {
        name: "Nothing Phone",
        href: "/mobile-phones/nothing",
        img: "/img/categories/mobile/8.webp",
      },
    ],
  },

  {
    id: "accessories",
    name: "Accessories",
    description: "Mobile essentials",
    href: "/accessories",
    icon: FiGrid,
    children: [
      {
        name: "Power Banks",
        href: "/accessories/power-banks",
        img: "/img/categories/assocessories/1.webp",
      },
      {
        name: "Phone Holders",
        href: "/accessories/holders",
        img: "/img/categories/assocessories/2.jpg",
      },
      {
        name: "Screen Protectors",
        href: "/accessories/screen-protectors",
        img: "/img/categories/assocessories/3.jpg",
      },
      {
        name: "USB Cables",
        href: "/accessories/cables",
        img: "/img/categories/assocessories/4.jpg",
      },
      {
        name: "Adapters",
        href: "/accessories/adapters",
        img: "/img/categories/assocessories/5.jpg",
      },
    ],
  },

  {
    id: "watches",
    name: "Smart Watches",
    description: "Wearable technology",
    href: "/smart-watches",
    icon: FiWatch,
    children: [
      {
        name: "Apple Watch",
        href: "/smart-watches/apple",
        img: "/img/categories/watch/1.jpg",
      },
      {
        name: "Samsung Watch",
        href: "/smart-watches/samsung",
        img: "/img/categories/watch/2.jpg",
      },
      {
        name: "Fitness Bands",
        href: "/smart-watches/fitness-bands",
        img: "/img/categories/watch/2.jpg",
      },
      {
        name: "Kids Watches",
        href: "/smart-watches/kids",
        img: "/img/categories/watch/2.jpg",
      },
    ],
  },

  {
    id: "audio",
    name: "Audio",
    description: "Headphones & speakers",
    href: "/audio",
    icon: FiHeadphones,
    children: [
      {
        name: "Headphones",
        href: "/audio/headphones",
        img: "/img/categories/audio/2.jpg",
      },
      {
        name: "Bluetooth Speakers",
        href: "/audio/speakers",
        img: "/img/categories/audio/3.jpg",
      },
      {
        name: "Neckbands",
        href: "/audio/neckbands",
        img: "/img/categories/audio/4.jpg",
      },
    ],
  },

  {
    id: "chargers",
    name: "Chargers",
    description: "Fast charging",
    href: "/chargers",
    icon: FiBatteryCharging,
    children: [
      {
        name: "Wall Chargers",
        href: "/chargers/wall-chargers",
        img: "/img/categories/chargers/1.jpg",
      },
      {
        name: "Wireless Chargers",
        href: "/chargers/wireless",
        img: "/img/categories/chargers/2.jpg",
      },
      {
        name: "Car Chargers",
        href: "/chargers/car",
        img: "/img/categories/chargers/3.jpg",
      },
      {
        name: "Fast Chargers",
        href: "/chargers/fast",
        img: "/img/categories/chargers/4.jpg",
      },
    ],
  },

  {
    id: "cases",
    name: "Cases & Protection",
    description: "Protect your device",
    href: "/cases-protection",
    icon: FiBox,
    children: [
      {
        name: "Mobile Cases",
        href: "/cases-protection/mobile-cases",
        img: "/img/categories/case/1.jpg",
      },
      {
        name: "Screen Guards",
        href: "/cases-protection/screen-guards",
        img: "/img/categories/case/2.jpg",
      },
      {
        name: "Tablet Cases",
        href: "/cases-protection/tablet-cases",
        img: "/img/categories/case/.3",
      },
    ],
  },
];

const CategoryMenu = () => {
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("mobiles");

  const selectedCategory =
    categories.find((category) => category.id === activeCategory) ??
    categories[0];

  return (
    <div className="relative shrink-0 ">
      {/* ALL CATEGORY BUTTON */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="
          group flex h-11 min-w-51.25
          cursor-pointer items-center justify-between
          rounded-xl bg-[#ffd83d]
          px-4 text-black font-serif
          shadow-[0_4px_18px_rgba(255,216,61,0.18)]
          transition-all duration-200
          hover:bg-[#ffcf0f]
        "
      >
        <span className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/5">
            <FiMenu size={18} />
          </span>

          <span className="text-[12px] font-bold">All Categories</span>
        </span>

        <FiChevronDown
          size={14}
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <>
          {/* BACKDROP */}
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[-1]"
          />

          {/* MEGA MENU */}
          <div
            className="
              absolute left-0 top-13.5
              flex w-190
              overflow-hidden
              rounded-2xl
              border border-gray-100
              bg-white
              shadow-[0_20px_60px_rgba(0,0,0,0.13)]
              dark:border-gray-800
              dark:bg-[#171717]
            "
          >
            {/* ================= LEFT CATEGORY SIDEBAR ================= */}
            <div
              className="
                w-65 shrink-0
                border-r border-gray-100
                bg-[#fafafa]
                p-3
                dark:border-gray-800
                dark:bg-[#141414]
              "
            >
              <div className="mb-2 px-3 py-2">
                <p className="text-[10px] font-bold uppercase tracking-[1.4px] text-gray-400">
                  Shop by category
                </p>
              </div>

              <div className="space-y-1">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const active = activeCategory === category.id;

                  return (
                    <div
                      key={category.id}
                      onMouseEnter={() => setActiveCategory(category.id)}
                    >
                      <Link
                        href={category.href}
                        onClick={() => setOpen(false)}
                        className={`
                          group flex min-h-14
                          items-center gap-3
                          rounded-xl px-3
                          transition-all
                       
                          ${
                            active
                              ? "bg-white shadow-[0_3px_12px_rgba(0,0,0,0.06)] dark:bg-[#222]"
                              : "hover:bg-white dark:hover:bg-[#202020]"
                          }
                        `}
                      >
                        {/* ICON */}
                        <span
                          className={`
                            flex h-9 w-9 shrink-0
                            items-center justify-center
                            rounded-xl transition-all
                            ${
                              active
                                ? "bg-[#ffd83d] text-black"
                                : "bg-[#eeeeee] text-gray-500 dark:bg-[#242424] dark:text-gray-300"
                            }
                          `}
                        >
                          <Icon size={16} />
                        </span>

                        {/* TEXT */}
                        <div className="min-w-0 flex-1">
                          <p
                            className={`
                              text-[11px] font-bold
                              ${
                                active
                                  ? "text-black dark:text-white"
                                  : "text-gray-600 dark:text-gray-300"
                              }
                            `}
                          >
                            {category.name}
                          </p>

                          <p className="mt-0.5 truncate text-[9px] text-gray-400">
                            {category.description}
                          </p>
                        </div>

                        <FiChevronRight
                          size={13}
                          className={
                            active
                              ? "text-black dark:text-white"
                              : "text-gray-300"
                          }
                        />
                      </Link>
                    </div>
                  );
                })}
              </div>

              {/* ALL */}
              <Link
                href="/categories"
                onClick={() => setOpen(false)}
                className="
                  mt-3 flex items-center
                  justify-between
                  rounded-xl
                  border border-gray-200
                  bg-white
                  px-4 py-3
                  text-[10px] font-bold
                  text-gray-600
                  transition
                  hover:border-[#ffd83d]
                  hover:text-black
                  dark:border-gray-700
                  dark:bg-[#1d1d1d]
                  dark:text-gray-300
                "
              >
                View All Categories
                <FiArrowRight size={13} />
              </Link>
            </div>

            {/* ================= RIGHT CONTENT ================= */}
            <div className="flex-1 bg-white p-5 dark:bg-[#171717]">
              {/* HEADING */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-medium text-gray-400">
                    Explore
                  </p>

                  <h3 className="mt-0.5 text-[17px] font-bold text-[#181818] dark:text-white">
                    {selectedCategory.name}
                  </h3>
                </div>

                <Link
                  href={selectedCategory.href}
                  onClick={() => setOpen(false)}
                  className="
                    flex items-center gap-1
                    text-[10px] font-bold
                    text-gray-500
                    transition
                    hover:text-black
                    dark:hover:text-white
                  "
                >
                  View All
                  <FiArrowRight size={12} />
                </Link>
              </div>

              {/* DIVIDER */}
              <div className="my-4 h-px bg-gray-100 dark:bg-gray-800" />

              {/* SUB CATEGORIES */}
              <div className="grid grid-cols-3 gap-3">
                {selectedCategory.children.map((item) => {
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="
                        group
                        flex min-h-25
                        flex-col
                        justify-between
                        rounded-2xl
                        border border-gray-100
                        bg-[#fafafa]
                        p-3.5
                        transition-all duration-200
                        hover:-translate-y-0.5
                        hover:border-[#ffe06a]
                        hover:bg-[#fffbea]
                        hover:shadow-[0_8px_20px_rgba(0,0,0,0.05)]
                        dark:border-gray-800
                        dark:bg-[#202020]
                        dark:hover:bg-[#25210d]
                      "
                    >
                      <span
                        className="
    relative flex h-19.5 w-full
    shrink-0 items-center justify-center
    overflow-hidden rounded-xl
    border border-[#eeeeee]
    bg-linear-to-br from-white via-[#fffef8] to-[#fff8dc]
    shadow-[0_3px_12px_rgba(0,0,0,0.04)]
    transition-all duration-300
    group-hover:border-[#ffe16a]
    group-hover:shadow-[0_8px_20px_rgba(255,216,61,0.14)]
    dark:border-gray-700
    dark:from-[#292929]
    dark:via-[#242424]
    dark:to-[#201d12]
  "
                      >
                        {/* LIGHT DECORATION */}
                        <span className="pointer-events-none absolute -right-4 -top-4 h-12 w-12 rounded-full bg-[#ffd83d]/15" />

                        <span className="pointer-events-none absolute -bottom-5 -left-5 h-14 w-14 rounded-full bg-[#ffd83d]/10" />

                        <Image
                          src={item.img}
                          alt={item.name}
                          width={70}
                          height={70}
                          className="
      relative z-10
      h-16 w-16
      object-contain
      mix-blend-multiply
      transition-transform duration-300
      group-hover:scale-110
      dark:mix-blend-normal
    "
                        />
                      </span>

                      <div className="mt-3 flex items-center justify-between gap-1">
                        <span
                          className="
                            text-[10px] font-bold
                            text-gray-700
                            transition
                            group-hover:text-black
                            dark:text-gray-200
                          "
                        >
                          {item.name}
                        </span>

                        <FiChevronRight
                          size={11}
                          className="
                            shrink-0 text-gray-300
                            transition-transform
                            group-hover:translate-x-0.5
                            group-hover:text-black
                          "
                        />
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* PROMO SECTION */}
              <div
                className="
                  relative mt-5
                  overflow-hidden
                  rounded-2xl
                  bg-[#171717]
                  px-5 py-4
                  text-white
                  dark:bg-[#ffd83d]
                  dark:text-black
                "
              >
                <div className="relative z-10">
                  <p className="text-[9px] font-medium opacity-60">
                    Featured Collection
                  </p>

                  <p className="mt-1 text-[13px] font-bold">
                    Explore latest {selectedCategory.name}
                  </p>

                  <Link
                    href={selectedCategory.href}
                    onClick={() => setOpen(false)}
                    className="
                      mt-3 inline-flex
                      items-center gap-1.5
                      text-[9px] font-bold
                    "
                  >
                    Shop Now
                    <FiArrowRight size={11} />
                  </Link>
                </div>

                {/* DECORATION */}
                <selectedCategory.icon
                  size={100}
                  strokeWidth={0.8}
                  className="
                    absolute -bottom-6
                    right-4
                    opacity-[0.08]
                  "
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryMenu;
