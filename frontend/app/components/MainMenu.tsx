"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useGetcategoryQuery } from "@/store/categoriesApi";

const MenuContent = () => {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");

  // apis
  const { data: menuItems } = useGetcategoryQuery();

  return (
    <div
      className="
        hide-scrollbar
        flex flex-1 items-center
        justify-center
        overflow-x-auto
        whitespace-nowrap
      "
    >
      <div
        className="
          flex items-center gap-1
          rounded-xl
          border border-gray-100
          bg-[#fafafa]
          p-1
          dark:border-gray-800
          dark:bg-[#181818] md:hidden lg:flex
        "
      >
        {menuItems?.map((item) => {
          const active = activeCategory === item._id;

          return (
            <Link
              key={item._id}
              href={`/product-list?category=${item._id}`}
              className={`
                relative shrink-0
                rounded-lg
                px-3.5 py-2
                text-[11px]
                font-bold font-serif tracking-wider
                transition-all duration-200
                ${
                  active
                    ? `
                      bg-white
                      text-black
                      shadow-[0_2px_8px_rgba(0,0,0,0.07)]
                      dark:bg-[#292929]
                      dark:text-white
                    `
                    : `
                      text-black
                      hover:bg-white
                      hover:text-black
                      dark:text-gray-300
                      dark:hover:bg-[#252525]
                      dark:hover:text-white
                    `
                }
              `}
            >
              {item.categoryName}

              {active && (
                <span
                  className="
                    absolute bottom-0
                    left-1/2 h-0.5
                    w-5 -translate-x-1/2
                    rounded-full
                    bg-[#ffd83d]
                  "
                />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

/* Suspense is required when using useSearchParams in Next.js */
const MainMenu = () => (
  <Suspense fallback={null}>
    <MenuContent />
  </Suspense>
);

export default MainMenu;
