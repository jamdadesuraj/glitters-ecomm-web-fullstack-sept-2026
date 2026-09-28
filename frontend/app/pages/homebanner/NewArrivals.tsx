"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiHeart, FiBox, FiShoppingBag } from "react-icons/fi";
import ThemeBtnOne from "@/app/components/ThemeBtnOne";

type Product = {
  id: number;
  name: string;
  category: string;
  image?: string;
  href: string;
  price: number;
  oldPrice?: number;
};

const products: Product[] = [
  {
    id: 1,
    name: "Baseus USB-C to USB-C 100W Cable (2m)",
    category: "Accessories",
    image: "/img/products/cable.png",
    href: "/product/baseus-usb-c-cable",
    price: 59,
    oldPrice: 79,
  },
  {
    id: 2,
    name: "UAG Protective Case for iPhone 15",
    category: "Accessories",
    image: "/img/products/iphone-case.png",
    href: "/product/uag-iphone-case",
    price: 129,
    oldPrice: 149,
  },
  {
    id: 3,
    name: "WIWU Magnetic Phone Stand 360° Rotation",
    category: "Accessories",
    image: "/img/products/phone-stand.png",
    href: "/product/magnetic-phone-stand",
    price: 89,
    oldPrice: 109,
  },
  {
    id: 4,
    name: "Anker MagGo Power Bank 10,000mAh",
    category: "Mobile Phones",
    image: "/img/products/power-bank.png",
    href: "/product/anker-maggo-power-bank",
    price: 249,
    oldPrice: 299,
  },
  {
    id: 5,
    name: "Nothing Ear (2) Wireless Earbuds",
    category: "Audio",
    image: "/img/products/earbuds.png",
    href: "/product/nothing-ear-2",
    price: 599,
    oldPrice: 649,
  },
  {
    id: 6,
    name: "Baseus Car Charger Dual USB-C 65W",
    category: "Accessories",
    image: "/img/products/car-charger.png",
    href: "/product/baseus-car-charger",
    price: 119,
    oldPrice: 139,
  },
];

const categories = [
  "All",
  "Mobile Phones",
  "Accessories",
  "Audio",
  "Smart Watches",
];

const NewArrivals = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") {
      return products;
    }

    return products.filter((product) => product.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="w-full bg-white py-5 dark:bg-[#111]">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div
          className="
            mb-4
            flex
            flex-col
            gap-3
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          {/* TITLE */}
          <div className="shrink-0">
            <h2
              className="
                font-serif
              text-[14px]
                font-extrabold
                text-[#151515]
                sm:text-[22px]
                dark:text-white
              "
            >
              New Arrivals
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Discover our latest products and exclusive deals
            </p>
          </div>

          {/* CATEGORY FILTER */}
          <div
            className="
              no-scrollbar
              flex
              items-center
              gap-2
              overflow-x-auto
              pb-1
              lg:justify-center
              lg:pb-0
            "
          >
            {categories.map((category) => {
              const active = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`
                    shrink-0
                    cursor-pointer
                    rounded-full
                    px-4
                    py-2
                    font-serif
                    text-[9px]
                    font-semibold
                    tracking-wider
                    transition-all
                    duration-200
                    ${
                      active
                        ? "bg-[#ffd51c] text-black"
                        : "bg-[#f5f5f5] text-black hover:bg-[#ececec] dark:bg-[#222] dark:text-gray-300"
                    }
                  `}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* MOBILE VIEW ALL */}
        <div className="mb-3 flex justify-end lg:hidden">
          <Link
            href="/product-list"
            className="
              flex
              items-center
              gap-1
              text-[10px]
              font-bold
              text-[#c89b00]
            "
          >
            View All
            <FiArrowRight size={12} />
          </Link>
        </div>

        {/* PRODUCTS */}
        {filteredProducts.length > 0 ? (
          <div
            className="
              no-scrollbar
              flex
              gap-2
              overflow-x-auto
              pb-2

              sm:gap-3

              lg:grid
              lg:grid-cols-4
              lg:overflow-visible

              xl:grid-cols-5

              2xl:grid-cols-6
            "
          >
            {filteredProducts.map((product) => (
              <NewArrivalCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <NoProducts />
        )}
      </div>
    </section>
  );
};

const NewArrivalCard = ({ product }: { product: Product }) => {
  const [wishlist, setWishlist] = useState(false);
  const [imageError, setImageError] = useState(false);

  const hasImage = Boolean(product.image?.trim()) && !imageError;

  const oldPrice = product.oldPrice ?? product.price;

  const hasSaving = oldPrice > product.price;

  const productName =
    product.name.length > 50 ? `${product.name.slice(0, 50)}...` : product.name;

  return (
    <article
      className="
        group
        relative
        flex
        w-38.75
        shrink-0
        flex-col
        overflow-hidden
        rounded-xl
        border
        border-[#ececec]
        bg-white
        transition-all
        duration-300

        hover:border-[#ffe076]
        hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)]

        min-[380px]:w-41.25

        sm:w-45

        lg:w-auto

        dark:border-gray-800
        dark:bg-[#171717]
      "
    >
      {/* IMAGE */}
      <div
        className="
          relative
          h-28.75
          w-full
          overflow-hidden
          bg-white

          sm:h-31.25

          dark:bg-[#171717]
        "
      >
        <Link
          href={product.href}
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
          "
        >
          {hasImage ? (
            <Image
              src={product.image ?? ""}
              alt={product.name}
              fill
              sizes="
                (max-width: 480px) 155px,
                (max-width: 640px) 165px,
                (max-width: 1024px) 180px,
                16vw
              "
              onError={() => setImageError(true)}
              className="
                object-contain
                p-3
                transition-transform
                duration-300
                group-hover:scale-105

                sm:p-4
              "
            />
          ) : (
            <div
              className="
                flex
                h-15
                w-15
                flex-col
                items-center
                justify-center
                rounded-xl
                border
                border-gray-200
                bg-[#fafafa]
                text-gray-300

                dark:border-gray-700
                dark:bg-[#222]
              "
            >
              <FiBox size={24} strokeWidth={1.4} />

              <span className="mt-1 text-[8px]">Product</span>
            </div>
          )}
        </Link>

        {/* WISHLIST */}
        <button
          type="button"
          onClick={() => setWishlist((prev) => !prev)}
          aria-label={wishlist ? "Remove from wishlist" : "Add to wishlist"}
          className={`
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
            border-white
            bg-white
            shadow-[0_3px_12px_rgba(0,0,0,0.08)]
            transition-all
            duration-200
            hover:scale-105

            sm:right-3
            sm:top-3
            sm:h-8
            sm:w-8

            ${wishlist ? "text-red-500" : "text-gray-400 hover:text-red-500"}

            dark:border-gray-700
            dark:bg-[#292929]
          `}
        >
          <FiHeart
            className="h-3.5 w-3.5 sm:h-4 sm:w-4"
            fill={wishlist ? "currentColor" : "none"}
          />
        </button>
      </div>

      {/* CONTENT */}
      <div
        className="
          flex
          flex-1
          flex-col
          p-2.5
          sm:p-3
        "
      >
        {/* PRODUCT NAME */}
        <Link href={product.href} className="block">
          <h3
            className="
              line-clamp-2
              min-h-8
              font-serif
              text-[9px]
              font-semibold
              leading-3.75
              text-[#222]
              transition
              hover:text-[#b58b00]

              sm:text-[10px]

              dark:text-white
            "
          >
            {productName}
          </h3>
        </Link>

        {/* DIVIDER */}
        <div
          className="
            my-2
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
              text-[7px]
              text-gray-500
              sm:text-[8px]
              dark:text-gray-400
            "
          >
            Special Price
          </p>

          <div
            className="
              mt-1
              flex
              flex-wrap
              items-baseline
              gap-x-2
              gap-y-1
            "
          >
            <span
              className="
                whitespace-nowrap
                font-serif
                text-[13px]
                font-bold
                text-black

                sm:text-[15px]

                dark:text-white
              "
            >
              AED {product.price.toLocaleString()}
            </span>

            {hasSaving && (
              <span
                className="
                  whitespace-nowrap
                  font-serif
                  text-[8px]
                  text-gray-400
                  line-through
                "
              >
                AED {oldPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* SAVING */}
          {hasSaving && (
            <span
              className="
                mt-1.5
                inline-flex
                w-fit
                rounded
                bg-green-50
                px-1.5
                py-0.5
                text-[7px]
                font-bold
                text-green-600

                sm:text-[8px]

                dark:bg-green-500/10
              "
            >
              Save AED {(oldPrice - product.price).toLocaleString()}
            </span>
          )}
        </div>

        {/* ADD TO CART */}
        <ThemeBtnOne
          text="Add to Cart"
          url={product.href}
          icon={<FiShoppingBag className="h-3.5 w-3.5" />}
          className="
            mt-3
            flex
            h-9
            w-full
            cursor-pointer
            items-center
            justify-center
            gap-1.5
            rounded-lg
            bg-[#ffd83d]
            font-serif
            text-[9px]
            font-bold
            text-black
            transition-all
            duration-200

            hover:bg-[#ffcc00]
            hover:shadow-[0_6px_18px_rgba(255,216,61,0.28)]

            sm:h-10
            sm:text-[10px]
          "
        />
      </div>
    </article>
  );
};

const NoProducts = () => {
  return (
    <div
      className="
        relative
        flex
        min-h-45
        items-center
        justify-center
        overflow-hidden
        rounded-xl
        border
        border-gray-200
        bg-[#fafafa]

        dark:border-gray-800
        dark:bg-[#181818]
      "
    >
      {/* CROSS */}
      <span
        className="
          absolute
          left-1/2
          top-1/2
          h-px
          w-[120%]
          -translate-x-1/2
          -translate-y-1/2
          rotate-[8deg]
          bg-gray-200

          dark:bg-gray-800
        "
      />

      <span
        className="
          absolute
          left-1/2
          top-1/2
          h-px
          w-[120%]
          -translate-x-1/2
          -translate-y-1/2
          rotate-[-8deg]
          bg-gray-200

          dark:bg-gray-800
        "
      />

      <div
        className="
          relative
          z-10
          flex
          flex-col
          items-center
          rounded-xl
          bg-[#fafafa]
          px-8
          py-4

          dark:bg-[#181818]
        "
      >
        <FiBox size={32} strokeWidth={1.4} className="text-gray-300" />

        <span className="mt-2 text-[11px] text-gray-400">
          No products found
        </span>
      </div>
    </div>
  );
};

export default NewArrivals;
