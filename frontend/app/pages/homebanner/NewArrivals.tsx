/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { FiArrowRight, FiBox, FiHeart, FiShoppingBag } from "react-icons/fi";
import { toast } from "react-toastify";

import { useGetcategoryQuery } from "@/store/categoriesApi";
import { useGetProductsQuery } from "@/store/productsApi";
import { useAddToCartMutation } from "@/store/addToCartApi";
import ThemeBtnOne from "@/app/components/ThemeBtnOne";
import {
  useAddToWishlistMutation,
  useGetWishlistQuery,
  useRemoveWishlistByProductMutation,
} from "@/store/wishlistApi";
import { useAuthUser } from "@/hooks/useAuthUser";
import { openAccountMenu } from "@/lib/authPopover";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

type ApiVariant = {
  price: number;
  delPrice?: number;
  stock?: number;
  image?: string;
};

type ApiProduct = {
  _id: string;
  productName: string;
  category: string | { _id: string } | null;
  section?: string | string[];
  variants: ApiVariant[];
  status?: string;
  isDeleted?: boolean;
};

type ApiCategory = {
  _id: string;
  categoryName: string;
};

type Product = {
  id: string;
  productId: string;
  name: string;
  categoryId: string;
  image?: string;
  href: string;
  price: number;
  oldPrice?: number;
  stock: number;
};

type Tab = { id: string; label: string };

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

const ALL_TAB: Tab = { id: "all", label: "All" };

const normalize = (value: string) => value.toLowerCase().replace(/\s+/g, "");

/** Same slug rule as the cart page, so links open the same product route */
const slugify = (name: string) =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const getCategoryId = (category: ApiProduct["category"]) =>
  typeof category === "string" ? category : (category?._id ?? "");

const isVisible = (p: ApiProduct) =>
  p.status === "active" && !p.isDeleted && p.variants?.length > 0;

const isNewArrival = ({ section }: ApiProduct) => {
  if (!section) return false;
  const sections = Array.isArray(section) ? section : [section];
  return sections.some(
    (s) => typeof s === "string" && normalize(s) === "newarrivals",
  );
};

const toProduct = (p: ApiProduct): Product => {
  const variant = p.variants.find((v) => (v.stock ?? 0) > 0) ?? p.variants[0];

  return {
    id: p._id,
    productId: p._id,
    name: p.productName,
    categoryId: getCategoryId(p.category),
    image: variant.image,
    href: `/product/${slugify(p.productName)}/${p._id}`,
    price: variant.price,
    oldPrice: variant.delPrice,
    stock: Number(variant.stock ?? 0),
  };
};

/** Reads the readable message out of an RTK Query error */
const getApiErrorMessage = (error: unknown, fallback: string) =>
  (error as any)?.data?.message || fallback;

/** Wishlist item can hold product as an id string or a populated object */
const getWishlistProductId = (item: any): string => {
  const product = item?.product ?? item?.productId;
  return typeof product === "string" ? product : (product?._id ?? "");
};

/* -------------------------------------------------------------------------- */
/*  NewArrivals (main section)                                                */
/* -------------------------------------------------------------------------- */

const NewArrivals = () => {
  const [activeTab, setActiveTab] = useState(ALL_TAB.id);

  const { data: categories = [] } = useGetcategoryQuery();
  const { data: products = [], isLoading, isError } = useGetProductsQuery();

  // API products -> UI products (only active, non-deleted "New Arrivals")
  const newArrivals = useMemo<Product[]>(
    () =>
      (products as ApiProduct[])
        .filter((p) => isVisible(p) && isNewArrival(p))
        .map(toProduct),
    [products],
  );

  // "All" + every category from the API
  const tabs = useMemo<Tab[]>(
    () => [
      ALL_TAB,
      ...(categories as ApiCategory[]).map((c) => ({
        id: c._id,
        label: c.categoryName,
      })),
    ],
    [categories],
  );

  const visibleProducts = useMemo(
    () =>
      activeTab === ALL_TAB.id
        ? newArrivals
        : newArrivals.filter((p) => p.categoryId === activeTab),
    [newArrivals, activeTab],
  );

  return (
    <section className="w-full bg-white py-5 dark:bg-[#111]">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="shrink-0">
            <h2 className="font-serif text-[14px] font-extrabold text-[#151515] sm:text-[22px] dark:text-white">
              New Arrivals
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Discover our latest products and exclusive deals
            </p>
          </div>

          <CategoryTabs
            tabs={tabs}
            active={activeTab}
            onChange={setActiveTab}
          />
        </div>

        {/* MOBILE VIEW ALL */}
        <div className="mb-3 flex justify-end lg:hidden">
          <Link
            href="/product-list"
            className="flex items-center gap-1 text-[10px] font-bold text-[#c89b00]"
          >
            View All
            <FiArrowRight size={12} />
          </Link>
        </div>

        {/* PRODUCTS */}
        {isLoading ? (
          <Message>Loading...</Message>
        ) : isError ? (
          <Message error>Something went wrong</Message>
        ) : visibleProducts.length === 0 ? (
          <NoProducts />
        ) : (
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2 sm:gap-3 lg:grid lg:grid-cols-4 lg:overflow-visible xl:grid-cols-5 2xl:grid-cols-6">
            {visibleProducts.map((product) => (
              <NewArrivalCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/*  Category tabs                                                             */
/* -------------------------------------------------------------------------- */

type CategoryTabsProps = {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
};

const CategoryTabs = ({ tabs, active, onChange }: CategoryTabsProps) => (
  <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1 lg:justify-center lg:pb-0">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        type="button"
        onClick={() => onChange(tab.id)}
        className={`shrink-0 cursor-pointer rounded-full px-4 py-2 font-serif text-[9px] font-semibold tracking-wider transition-all duration-200 ${
          active === tab.id
            ? "bg-[#ffd51c] text-black"
            : "bg-[#f5f5f5] text-black hover:bg-[#ececec] dark:bg-[#222] dark:text-gray-300"
        }`}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

/* -------------------------------------------------------------------------- */
/*  Product card                                                              */
/* -------------------------------------------------------------------------- */

const NewArrivalCard = ({ product }: { product: Product }) => {
  const [imageError, setImageError] = useState(false);

  // auth
  const { user, authLoading } = useAuthUser();

  // api add to cart
  const [addToCart, { isLoading: isAdding }] = useAddToCartMutation();

  // wishlist (only fetched when logged in)
  const { data: wishlistItems = [] } = useGetWishlistQuery(undefined, {
    skip: !user,
  });
  const [addToWishlist, { isLoading: isAddingToWishlist }] =
    useAddToWishlistMutation();
  const [removeFromWishlist, { isLoading: isRemovingFromWishlist }] =
    useRemoveWishlistByProductMutation();

  const isWishlisted =
    Boolean(user) &&
    (wishlistItems as any[]).some(
      (item) => getWishlistProductId(item) === product.productId,
    );
  const isWishlistBusy = isAddingToWishlist || isRemovingFromWishlist;

  const handleWishlistToggle = async () => {
    // Wait until Firebase has restored the session
    if (authLoading) return;

    // Not logged in -> open login popover
    if (!user) {
      toast.info("Please login to use your wishlist");
      openAccountMenu();
      return;
    }

    try {
      if (isWishlisted) {
        await removeFromWishlist(product.productId).unwrap();
        toast.success("Removed from wishlist");
      } else {
        await addToWishlist({ product: product.productId }).unwrap();
        toast.success("Added to wishlist");
      }
    } catch (error) {
      toast.error(
        getApiErrorMessage(error, "Something went wrong. Try again."),
      );
    }
  };

  const hasImage = Boolean(product.image?.trim()) && !imageError;
  const oldPrice = product.oldPrice ?? product.price;
  const saving = oldPrice - product.price;
  const outOfStock = product.stock <= 0;

  /**
   * Adds the product to cart. Returns true on success so "Buy Now"
   * knows whether it can continue to checkout.
   */
  const addProductToCart = async (): Promise<boolean> => {
    if (!product.productId) {
      toast.error("Product not found");
      return false;
    }

    if (outOfStock) {
      toast.error("This product is out of stock");
      return false;
    }

    try {
      const res = await addToCart({
        product: product.productId,
        quantity: 1,
      }).unwrap();

      toast.success(res?.message ?? "Product added to cart");
      return true;
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Failed to add product to cart. Try again.",
      );
      return false;
    }
  };

  const handleAddToCart = async () => {
    await addProductToCart();
  };

  return (
    <article className="group relative flex w-38.75 shrink-0 flex-col overflow-hidden rounded-xl border border-[#ececec] bg-white transition-all duration-300 hover:border-[#ffe076] hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)] min-[380px]:w-41.25 sm:w-45 lg:w-auto dark:border-gray-800 dark:bg-[#171717]">
      {/* IMAGE */}
      <div className="relative h-28.75 w-full overflow-hidden bg-white sm:h-31.25 dark:bg-[#171717]">
        <Link
          href={product.href}
          className="absolute inset-0 flex items-center justify-center"
        >
          {hasImage ? (
            <Image
              src={product.image!}
              alt={product.name}
              fill
              sizes="(max-width: 480px) 100vw, (max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
              onError={() => setImageError(true)}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-15 w-15 flex-col items-center justify-center rounded-xl border border-gray-200 bg-[#fafafa] text-gray-300 dark:border-gray-700 dark:bg-[#222]">
              <FiBox size={24} strokeWidth={1.4} />
              <span className="mt-1 text-[8px]">Product</span>
            </div>
          )}
        </Link>

        {/* OUT OF STOCK BADGE */}
        {outOfStock && (
          <span className="absolute left-2 top-2 z-20 rounded bg-red-50 px-1.5 py-0.5 text-[8px] font-bold text-red-500 sm:left-3 sm:top-3">
            Out of Stock
          </span>
        )}

        {/* WISHLIST */}
        <button
          type="button"
          onClick={handleWishlistToggle}
          disabled={isWishlistBusy}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`
            absolute right-2 top-2 z-20
            flex h-7 w-7 cursor-pointer items-center justify-center
            rounded-full border border-white bg-white
            shadow-[0_3px_12px_rgba(0,0,0,0.08)]
            transition-all duration-200 hover:scale-105
            disabled:cursor-not-allowed disabled:opacity-60
            sm:right-3 sm:top-3 sm:h-9 sm:w-9
            dark:border-gray-700 dark:bg-[#292929]
            ${isWishlisted ? "text-red-500" : "text-gray-500 hover:text-red-500"}
          `}
        >
          <FiHeart
            className="h-3.5 w-3.5 sm:h-4 sm:w-4"
            fill={isWishlisted ? "currentColor" : "none"}
          />
        </button>
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col p-2.5 sm:p-3">
        <Link href={product.href} className="block" title={product.name}>
          <h3 className="line-clamp-2 min-h-7.5 font-serif text-[9px] font-semibold leading-3.75 text-[#222] transition hover:text-[#b58b00] sm:text-[10px] dark:text-white">
            {product.name}
          </h3>
        </Link>

        <div className="my-2 border-b border-dashed border-gray-200 dark:border-gray-700" />

        {/* PRICE */}
        <div className="mt-auto">
          <p className="text-[10px] text-gray-900 sm:text-[10px] dark:text-gray-400">
            Special Price
          </p>

          <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="whitespace-nowrap font-serif text-[13px] font-bold text-black sm:text-[15px] dark:text-white">
              AED {product.price.toLocaleString()}
            </span>

            {saving > 0 && (
              <span className="whitespace-nowrap font-serif text-[10px] text-gray-400 line-through">
                AED {oldPrice.toLocaleString()}
              </span>
            )}
          </div>

          {saving > 0 && (
            <span className="mt-1.5 inline-flex w-fit rounded bg-green-50 px-1.5 py-0.5 text-[7px] font-bold text-green-600 sm:text-[8px] dark:bg-green-500/10">
              Save AED {saving.toLocaleString()}
            </span>
          )}
        </div>

        {/* BUY NOW + ADD TO CART */}
        <div className="mt-3 flex w-full items-center gap-2 sm:mt-4 sm:gap-2.5">
          {/* Buy Now */}
          <div className="min-w-0 flex-1">
            <ThemeBtnOne
              text="Buy Now"
              url="/checkout"
              icon={
                <FiShoppingBag className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
              }
              className="
                flex h-10 w-full min-w-0
                cursor-pointer items-center
                justify-center gap-1.5
                overflow-hidden
                whitespace-nowrap
                rounded-lg
                bg-[#ffd83d]
                px-3
                font-serif text-[9px]
                font-bold text-black
                transition-all duration-200
                hover:bg-[#ffcc00]
                hover:shadow-[0_6px_18px_rgba(255,216,61,0.28)]
                sm:h-11
                sm:gap-2
                sm:rounded-xl
                sm:px-4
                sm:text-[11px]
              "
            />
          </div>

          {/* Add To Cart (icon only) */}
          <button
            type="button"
            disabled={outOfStock || isAdding}
            onClick={handleAddToCart}
            title="Add To Cart"
            aria-label="Add to cart"
            className="
              flex h-10 cursor-pointer items-center justify-center
              rounded-lg border border-gray-300 px-3
              transition-all duration-200
              hover:border-[#ffd83d] hover:bg-[#fff7d5]
              disabled:cursor-not-allowed disabled:opacity-60
              sm:h-11 sm:text-[11px]
              dark:border-gray-700 dark:text-white
            "
          >
            {isAdding ? (
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-gray-400 border-t-transparent sm:h-4 sm:w-4" />
            ) : (
              <FiShoppingBag className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

/* -------------------------------------------------------------------------- */
/*  States                                                                    */
/* -------------------------------------------------------------------------- */

const Message = ({
  children,
  error = false,
}: {
  children: React.ReactNode;
  error?: boolean;
}) => (
  <p
    className={`py-10 text-center text-sm ${
      error ? "text-red-500" : "text-gray-500"
    }`}
  >
    {children}
  </p>
);

const NoProducts = () => (
  <div className="relative flex min-h-45 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-[#fafafa] dark:border-gray-800 dark:bg-[#181818]">
    <span className="absolute left-1/2 top-1/2 h-px w-[120%] -translate-x-1/2 -translate-y-1/2 rotate-[8deg] bg-gray-200 dark:bg-gray-800" />
    <span className="absolute left-1/2 top-1/2 h-px w-[120%] -translate-x-1/2 -translate-y-1/2 rotate-[-8deg] bg-gray-200 dark:bg-gray-800" />

    <div className="relative z-10 flex flex-col items-center rounded-xl bg-[#fafafa] px-8 py-4 dark:bg-[#181818]">
      <FiBox size={32} strokeWidth={1.4} className="text-gray-300" />
      <span className="mt-2 text-[11px] text-gray-400">No products found</span>
    </div>
  </div>
);

export default NewArrivals;
