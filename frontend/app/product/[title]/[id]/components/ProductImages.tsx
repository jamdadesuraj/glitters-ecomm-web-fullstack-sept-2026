"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiMaximize2,
  FiX,
} from "react-icons/fi";

interface ProductImage {
  id: number;
  src: string;
  alt: string;
}

const productImages: ProductImage[] = [
  {
    id: 1,
    src: "/img/products/product-1.png",
    alt: "Product front view",
  },
  {
    id: 2,
    src: "/img/products/product-2.png",
    alt: "Product side view",
  },
  {
    id: 3,
    src: "/img/products/product-3.png",
    alt: "Product back view",
  },
  {
    id: 4,
    src: "/img/products/product-4.png",
    alt: "Product detail view",
  },
  {
    id: 5,
    src: "/img/products/product-5.png",
    alt: "Product close view",
  },
  {
    id: 6,
    src: "/img/products/product-6.png",
    alt: "Product additional view",
  },
];

const ProductImages = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeImage = productImages[activeIndex];

  const showPrevious = () => {
    setActiveIndex((prev) =>
      prev === 0 ? productImages.length - 1 : prev - 1,
    );
  };

  const showNext = () => {
    setActiveIndex((prev) =>
      prev === productImages.length - 1 ? 0 : prev + 1,
    );
  };

  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }

      if (event.key === "ArrowLeft") {
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  return (
    <>
      <div className="w-full">
        {/* Main Gallery */}
        <div className="flex flex-col gap-3 md:flex-row">
          {/* Main Image */}
          <div
            className="
              group
              relative
              order-1
              flex
              min-h-95
              flex-1
              cursor-zoom-in
              items-center
              justify-center
              overflow-hidden
              rounded-2xl
              border
              border-gray-200
              bg-[#f8f8f8]
              dark:border-white/10
              dark:bg-[#0d0d0d]
              sm:min-h-120
              lg:min-h-140
            "
            onClick={() => setIsModalOpen(true)}
          >
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 45vw"
              className="
                object-contain
                p-5
                transition-transform
                duration-500
                group-hover:scale-[1.03]
                sm:p-8
                lg:p-10
              "
            />

            {/* Zoom Icon */}
            <button
              type="button"
              aria-label="Open image"
              onClick={(event) => {
                event.stopPropagation();
                setIsModalOpen(true);
              }}
              className="
                absolute
                right-4
                top-4
                z-10
                flex
                h-10
                w-10
                cursor-pointer
                items-center
                justify-center
                rounded-full
                border
                border-gray-200
                bg-white/95
                text-gray-700
                shadow-sm
                backdrop-blur
                transition
                hover:scale-105
                hover:bg-[#ffd83d]
                hover:text-black
                dark:border-white/10
                dark:bg-black/75
                dark:text-white
              "
            >
              <FiMaximize2 size={17} />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-4 rounded-full bg-black/70 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur">
              {activeIndex + 1} / {productImages.length}
            </div>
          </div>

          {/* Thumbnail Slider */}
          <div
            className="
              order-2
              flex
              w-full
              gap-2
              overflow-x-auto
              pb-1
              md:h-140
              md:w-22
              md:flex-col
              md:overflow-x-hidden
              md:overflow-y-auto
              md:pb-0
              md:pr-1
            "
          >
            {productImages.map((image, index) => {
              const active = activeIndex === index;

              return (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`View image ${index + 1}`}
                  className={`
                    relative
                    h-19
                    w-19
                    shrink-0
                    cursor-pointer
                    overflow-hidden
                    rounded-xl
                    border-2
                    bg-[#f8f8f8]
                    transition-all
                    duration-200
                    dark:bg-[#0d0d0d]

                    md:h-20.5
                    md:w-full

                    ${
                      active
                        ? "border-[#ffd83d] shadow-[0_4px_14px_rgba(255,216,61,0.18)]"
                        : "border-gray-200 hover:border-gray-400 dark:border-white/10 dark:hover:border-white/30"
                    }
                  `}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="90px"
                    className="object-contain p-2"
                  />

                  {active && (
                    <span className="absolute inset-x-2 bottom-1 h-0.5 rounded-full bg-[#ffd83d]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Hint */}
        <p className="mt-3 text-center text-[11px] font-medium text-gray-400 dark:text-gray-500">
          Click the image to view full screen
        </p>
      </div>

      {/* Full Screen Modal */}
      {isModalOpen && (
        <div
          className="
            fixed
            inset-0
            z-9999
            flex
            items-center
            justify-center
            bg-black/90
            p-3
            backdrop-blur-sm
            sm:p-6
          "
          onClick={() => setIsModalOpen(false)}
        >
          {/* Modal Content */}
          <div
            className="
              relative
              flex
              h-full
              max-h-225
              w-full
              max-w-312.5
              flex-col
              overflow-hidden
              rounded-2xl
              bg-white
              dark:bg-[#0c0c0c]
            "
            onClick={(event) => event.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex h-14 shrink-0 items-center justify-between border-b border-gray-100 px-4 dark:border-white/10 sm:px-5">
              <div>
                <p className="text-xs font-extrabold text-gray-900 dark:text-white">
                  Product Gallery
                </p>

                <p className="mt-0.5 text-[10px] text-gray-400">
                  Image {activeIndex + 1} of {productImages.length}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close gallery"
                className="
                  flex
                  h-9
                  w-9
                  cursor-pointer
                  items-center
                  justify-center
                  rounded-full
                  bg-gray-100
                  text-gray-700
                  transition
                  hover:bg-red-50
                  hover:text-red-500
                  dark:bg-white/10
                  dark:text-white
                  dark:hover:bg-red-500/10
                  dark:hover:text-red-400
                "
              >
                <FiX size={19} />
              </button>
            </div>

            {/* Large Modal Image */}
            <div className="relative min-h-0 flex-1 bg-[#fafafa] dark:bg-[#080808]">
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                sizes="100vw"
                className="object-contain p-5 sm:p-8 lg:p-12"
              />

              {/* Previous */}
              <button
                type="button"
                onClick={showPrevious}
                aria-label="Previous image"
                className="
                  absolute
                  left-3
                  top-1/2
                  z-10
                  flex
                  h-11
                  w-11
                  -translate-y-1/2
                  cursor-pointer
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-gray-200
                  bg-white/95
                  text-gray-900
                  shadow-lg
                  backdrop-blur
                  transition
                  hover:bg-[#ffd83d]
                  dark:border-white/10
                  dark:bg-black/70
                  dark:text-white
                  dark:hover:bg-[#ffd83d]
                  dark:hover:text-black
                  sm:left-5
                "
              >
                <FiChevronLeft size={22} />
              </button>

              {/* Next */}
              <button
                type="button"
                onClick={showNext}
                aria-label="Next image"
                className="
                  absolute
                  right-3
                  top-1/2
                  z-10
                  flex
                  h-11
                  w-11
                  -translate-y-1/2
                  cursor-pointer
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-gray-200
                  bg-white/95
                  text-gray-900
                  shadow-lg
                  backdrop-blur
                  transition
                  hover:bg-[#ffd83d]
                  dark:border-white/10
                  dark:bg-black/70
                  dark:text-white
                  dark:hover:bg-[#ffd83d]
                  dark:hover:text-black
                  sm:right-5
                "
              >
                <FiChevronRight size={22} />
              </button>
            </div>

            {/* Modal Bottom Thumbnails */}
            <div className="shrink-0 border-t border-gray-100 bg-white p-3 dark:border-white/10 dark:bg-[#0c0c0c]">
              <div className="mx-auto flex max-w-full justify-start gap-2 overflow-x-auto sm:justify-center">
                {productImages.map((image, index) => (
                  <button
                    key={image.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`
                      relative
                      h-14
                      w-14
                      shrink-0
                      cursor-pointer
                      overflow-hidden
                      rounded-lg
                      border-2
                      bg-gray-50
                      transition
                      dark:bg-white/5
                      ${
                        activeIndex === index
                          ? "border-[#ffd83d]"
                          : "border-gray-200 dark:border-white/10"
                      }
                    `}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="56px"
                      className="object-contain p-1.5"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductImages;
