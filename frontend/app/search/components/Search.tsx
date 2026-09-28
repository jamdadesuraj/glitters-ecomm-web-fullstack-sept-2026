"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiSearch, FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Image from "next/image";

const categories = [
  {
    id: 1,
    name: "Mobile Phones",
    href: "/product-list",
    image: "/img/categories/mobile/2.webp",
  },
  {
    id: 2,
    name: "Smart Watches",
    href: "/product-list",
    image: "/img/categories/watch/2.jpg",
  },
  {
    id: 3,
    name: "Audio",
    href: "/product-list",
    image: "/img/categories/audio/3.jpg",
  },
  {
    id: 4,
    name: "Cases & Protection",
    href: "/product-list",
    image: "/img/categories/case/1.jpg",
  },
  {
    id: 5,
    name: "Power & Cables",
    href: "/product-list",
    image: "/img/categories/assocessories/1.webp",
  },
  {
    id: 6,
    name: "Screen Protection",
    href: "/product-list",
    image: "/img/categories/assocessories/3.jpg",
  },
  {
    id: 7,
    name: "Car Accessories",
    href: "/product-list",
    image: "/img/categories/chargers/3.jpg",
  },
  {
    id: 8,
    name: "Gadgets",
    href: "/product-list",
    image: "/img/categories/chargers/2.jpg",
  },
];

const Search = () => {
  const router = useRouter();

  const [search, setSearch] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const value = search.trim();

    if (!value) return;

    router.push(`/search?q=${encodeURIComponent(value)}`);
  };

  return (
    <main className="min-h-screen bg-[#f7f7f8] dark:bg-[#0f0f0f]">
      {/* TOP SEARCH AREA */}
      <section
        className="
          sticky
          top-0
          z-40
          border-b
          border-gray-200
          bg-white/95
          backdrop-blur-xl
          dark:border-gray-800
          dark:bg-[#111]/95
        "
      >
        <div
          className="
            mx-auto
            flex
            w-full
            max-w-300
            items-center
            gap-2
            px-3
            py-3

            sm:gap-3
            sm:px-5
            sm:py-4

            lg:px-8
          "
        >
          {/* BACK */}
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Go back"
            className="
              flex
              h-10
              w-10
              shrink-0
              cursor-pointer
              items-center
              justify-center
              rounded-full
              border
              border-gray-200
              bg-white
              text-black
              shadow-sm
              transition

              hover:bg-gray-50

              sm:h-11
              sm:w-11

              dark:border-gray-700
              dark:bg-[#191919]
              dark:text-white
            "
          >
            <FiArrowLeft className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
          </button>

          {/* SEARCH FORM */}
          <form
            onSubmit={handleSearch}
            className="
              flex
              h-11
              min-w-0
              flex-1
              overflow-hidden
              rounded-xl
              border
              border-gray-200
              bg-[#fafafa]
              shadow-[0_2px_12px_rgba(0,0,0,0.04)]
              transition-all
              duration-200

              focus-within:border-[#ffd83d]
              focus-within:bg-white
              focus-within:ring-2
              focus-within:ring-[#ffd83d]/20

              sm:h-12
              sm:rounded-2xl

              lg:h-13

              dark:border-gray-700
              dark:bg-[#191919]
            "
          >
            <div className="flex min-w-0 flex-1 items-center">
              <FiSearch
                className="
                  ml-3
                  shrink-0
                  text-gray-400

                  sm:ml-4
                "
                size={18}
              />

              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
                placeholder="Search products, brands and categories..."
                className="
                  h-full
                  min-w-0
                  flex-1
                  bg-transparent
                  px-2.5
                  text-[12px]
                  text-black
                  outline-none
                  placeholder:text-gray-400

                  sm:px-3
                  sm:text-[13px]

                  lg:text-[14px]

                  dark:text-white
                  dark:placeholder:text-gray-500
                "
              />
            </div>

            <button
              type="submit"
              aria-label="Search"
              className="
                flex
                w-11
                shrink-0
                cursor-pointer
                items-center
                justify-center
                bg-[#ffd83d]
                text-black
                transition

                hover:bg-[#ffce16]

                sm:w-13
                lg:w-14
              "
            >
              <FiSearch
                className="h-4.5 w-4.5 sm:h-5 sm:w-5"
                strokeWidth={2.2}
              />
            </button>
          </form>
        </div>
      </section>

      {/* CONTENT */}
      <div
        className="
          mx-auto
          w-full
          max-w-300
          px-3
          py-5

          sm:px-5
          sm:py-6

          lg:px-8
          lg:py-8
        "
      >
        {/* TITLE */}
        <div className="mb-4 sm:mb-5">
          <h1
            className="
              text-[17px]
              font-extrabold
              tracking-[-0.3px]
              text-[#151515]

              sm:text-[19px]
              lg:text-[22px]

              dark:text-white
            "
          >
            What are you looking for?
          </h1>

          <p
            className="
              mt-1
              text-[10px]
              text-gray-400

              sm:text-[11px]
              lg:text-[12px]
            "
          >
            Search products or explore popular categories
          </p>
        </div>

        {/* CATEGORY HEADER */}
        <div className="mb-2.5 flex items-center justify-between">
          <h2
            className="
              text-[13px]
              font-bold
              text-black

              sm:text-[14px]
              lg:text-[15px]
font-serif
              dark:text-white
            "
          >
            Shop by Category
          </h2>

          <Link
            href="/categories"
            className="
              text-[9px]
              font-bold
         px-3 py-2 
              transition
              hover:text-[#8d6c00]
bg-yellow-300 text-black rounded-full
              sm:text-[10px]
            "
          >
            View All
          </Link>
        </div>

        {/* CATEGORY GRID */}

        <div
          className="
    grid
    grid-cols-4
    gap-2

    sm:grid-cols-5
    sm:gap-3

    md:grid-cols-6

    lg:grid-cols-8
    lg:gap-4
  "
        >
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="
        group
        flex
        min-w-0
        flex-col
        items-center
        justify-center

        rounded-xl
        border
        border-gray-100
        bg-white

        px-1.5
        py-2.5

        shadow-[0_3px_14px_rgba(0,0,0,0.04)]

        transition-all
        duration-200

        hover:-translate-y-0.5
        hover:border-[#ffe177]
        hover:shadow-[0_6px_20px_rgba(0,0,0,0.07)]

        active:scale-[0.97]

        sm:rounded-2xl
        sm:py-3

        dark:border-gray-800
        dark:bg-[#191919]
      "
            >
              {/* CATEGORY IMAGE */}
              <div
                className="
          relative
          flex
          h-12
          w-full
          items-center
          justify-center

          sm:h-14.5
          lg:h-16.25
        "
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  width={70}
                  height={70}
                  className="
            h-11
            w-11
            object-contain
            transition-transform
            duration-200

            group-hover:scale-105

            sm:h-13
            sm:w-13

            lg:h-14.5
            lg:w-14.5
          "
                />
              </div>

              {/* CATEGORY NAME */}
              <p
                className="
          mt-1.5
          line-clamp-2
          w-full
          text-center

          text-[8px]
          font-semibold
          leading-2.75
          text-gray-700

          sm:text-[9px]
          sm:leading-3

          lg:text-[10px]

          dark:text-gray-300
        "
              >
                {category.name}
              </p>
            </Link>
          ))}
        </div>

        {/* EMPTY SEARCH STATE */}
        {!search && (
          <div
            className="
              mt-8
              rounded-2xl
              border
              border-dashed
              border-gray-200
              bg-white
              px-4
              py-8
              text-center

              sm:mt-10
              sm:py-10

              dark:border-gray-800
              dark:bg-[#171717]
            "
          >
            <div
              className="
                mx-auto
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-[#fff8d9]
                text-black

                sm:h-14
                sm:w-14
              "
            >
              <FiSearch className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>

            <h3
              className="
                mt-3
                text-[13px]
                font-bold
                text-black

                sm:text-[14px]

                dark:text-white
              "
            >
              Start your search
            </h3>

            <p
              className="
                mx-auto
                mt-1
                max-w-[320px]
                text-[10px]
                leading-4
                text-gray-400

                sm:text-[11px]
              "
            >
              Search for mobiles, smart watches, accessories, chargers and more.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Search;
