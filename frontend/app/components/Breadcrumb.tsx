"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiChevronRight, FiHome } from "react-icons/fi";

type BreadcrumbProps = {
  customLabels?: Record<string, string>;
  className?: string;
};

const formatLabel = (value: string) => {
  return decodeURIComponent(value)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const Breadcrumb = ({ customLabels = {}, className = "" }: BreadcrumbProps) => {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  if (pathname === "/") return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={`
        w-full
        border-b
        border-gray-100
        bg-white
        dark:border-gray-800
        dark:bg-[#111]    bg-linear-to-r
            from-[#fff8d9]
            via-[#fffdf1]
            to-[#fff3c7]
        ${className}
      `}
    >
      <div
        className="
          mx-auto
          flex
          min-h-11
          w-full
          max-w-[1600px]
          items-center
          overflow-x-auto
          px-3
          sm:px-5
          lg:min-h-12
          lg:px-8
          xl:px-10
        "
      >
        <div className="flex min-w-max items-center gap-1.5">
          {/* HOME */}
          <Link
            href="/"
            className="
              flex
              items-center
              gap-1.5
              text-[10px]
              font-semibold
              text-gray-500
              transition
              hover:text-[#b58b00]

              sm:text-[11px]

              dark:text-gray-400
              dark:hover:text-[#ffd83d]
            "
          >
            <FiHome className="h-3.5 w-3.5" />

            <span>Home</span>
          </Link>

          {segments.map((segment, index) => {
            const href = "/" + segments.slice(0, index + 1).join("/");

            const isLast = index === segments.length - 1;

            const label = customLabels[segment] || formatLabel(segment);

            return (
              <React.Fragment key={href}>
                <FiChevronRight
                  className="
                    h-3
                    w-3
                    shrink-0
                    text-gray-300

                    dark:text-gray-600
                  "
                />

                {isLast ? (
                  <span
                    className="
                      max-w-45
                      truncate
                      text-[10px]
                      font-bold
                      text-black

                      sm:max-w-70
                      sm:text-[11px]

                      lg:max-w-100

                      dark:text-white
                    "
                    title={label}
                  >
                    {label}
                  </span>
                ) : (
                  <Link
                    href={href}
                    className="
                      max-w-35
                      truncate
                      text-[10px]
                      font-semibold
                      text-gray-500
                      transition
                      hover:text-[#b58b00]

                      sm:max-w-50
                      sm:text-[11px]

                      dark:text-gray-400
                      dark:hover:text-[#ffd83d]
                    "
                  >
                    {label}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Breadcrumb;
