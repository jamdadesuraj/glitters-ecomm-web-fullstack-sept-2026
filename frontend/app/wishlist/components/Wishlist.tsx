"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import {
  FiArrowLeft,
  FiBox,
  FiCheckCircle,
  FiHeart,
  FiShoppingBag,
  FiShoppingCart,
  FiStar,
  FiTrash2,
  FiXCircle,
} from "react-icons/fi";

import ThemeBtnOne from "@/app/components/ThemeBtnOne";
import { useFirebaseUser } from "@/hooks/useFirebaseUser";
import { useAddToCartMutation } from "@/store/addToCartApi";
import {
  IWishlist,
  IWishlistProduct,
  useClearWishlistMutation,
  useGetWishlistQuery,
  useRemoveWishlistByProductMutation,
} from "@/store/wishlistApi";

/* =========================================================
   Helpers
========================================================= */

const getName = (value: { name?: string } | string | undefined): string =>
  typeof value === "string" ? value : (value?.name ?? "");

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const getProductHref = (product: IWishlistProduct) =>
  `/product/${slugify(product.productName || "product")}/${product._id}`;

const getApiErrorMessage = (error: unknown, fallback: string): string => {
  if (typeof error === "object" && error !== null && "data" in error) {
    const data = (error as { data?: { message?: string } }).data;
    if (typeof data?.message === "string") return data.message;
  }
  return fallback;
};

const formatAED = (amount: number) => `AED ${amount.toLocaleString("en-AE")}`;

const COLOR_MAP: Record<string, string> = {
  black: "#171717",
  white: "#ffffff",
  gray: "#9ca3af",
  grey: "#9ca3af",
  blue: "#3b82f6",
  green: "#22c55e",
  red: "#ef4444",
  gold: "#d4af37",
};

const getColorHex = (color: string): string => {
  const value = color.toLowerCase();
  const key = Object.keys(COLOR_MAP).find((name) => value.includes(name));
  return key ? COLOR_MAP[key] : "#737373";
};

type Variant = IWishlistProduct["variants"][number];

const getColorName = (color: Variant["color"]): string =>
  typeof color === "string" ? color : (color?.colorName ?? "");

const getSizeName = (size: Variant["size"]): string =>
  typeof size === "string" ? size : (size?.size ?? "");

const getVariantDetails = (product: IWishlistProduct) => {
  const variant = product.variants?.[0];

  const price = Number(variant?.price ?? 0);
  const oldPrice = Number(variant?.delPrice ?? 0);
  const stock = Number(variant?.stock ?? 0);
  const saving = oldPrice > price ? oldPrice - price : 0;

  return {
    variant,
    price,
    oldPrice,
    saving,
    discount: saving > 0 ? Math.round((saving / oldPrice) * 100) : 0,
    inStock: stock > 0,
    image: variant?.image ?? "",
    color: getColorName(variant?.color),
    size: getSizeName(variant?.size),
  };
};

const getRating = (product: IWishlistProduct): string => {
  const reviews = product.reviews ?? [];
  if (!reviews.length) return "0.0";

  const total = reviews.reduce(
    (sum, review) => sum + Number(review.rating ?? 0),
    0,
  );

  return (total / reviews.length).toFixed(1);
};

/* =========================================================
   Product Image
========================================================= */

function ProductImage({ src, alt }: { src: string; alt: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={(event) => {
        event.currentTarget.style.visibility = "hidden";
      }}
      className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.04]"
    />
  );
}

/* =========================================================
   Wishlist Card
========================================================= */

function WishlistCard({
  item,
  product,
  onRemove,
  removing,
}: {
  item: IWishlist;
  product: IWishlistProduct;
  onRemove: (productId: string) => void;
  removing: boolean;
}) {
  const router = useRouter();
  const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation();

  const details = useMemo(() => getVariantDetails(product), [product]);

  const brand = getName(product.brand);
  const material = getName(product.material);
  const reviewCount = product.reviews?.length ?? 0;
  const rating = getRating(product);
  const href = getProductHref(product);

  /*
   * NOTE: adjust this payload to match your addToCartApi body.
   */
  const addItemToCart = async (): Promise<boolean> => {
    try {
      const response = await addToCart({
        product: product._id,
        variant: details.variant?._id,
        quantity: 1,
      }).unwrap();

      toast.success(response?.message || "Added to cart");
      return true;
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Unable to add product to cart"));
      return false;
    }
  };

  const handleBuyNow = async () => {
    const added = await addItemToCart();
    if (added) router.push("/checkout");
  };

  return (
    <article
      key={item._id}
      className="group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:border-[#ffe177] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] sm:rounded-2xl dark:border-gray-800 dark:bg-[#181818]"
    >
      {/* IMAGE */}
      <div className="relative aspect-square overflow-hidden bg-[#f8f8f8] dark:bg-[#202020]">
        {details.discount > 0 && (
          <span className="absolute left-2 top-2 z-20 rounded-md bg-[#ffd83d] px-2 py-1 text-[8px] font-extrabold text-black sm:left-3 sm:top-3">
            {details.discount}% OFF
          </span>
        )}

        <button
          type="button"
          disabled={removing}
          onClick={() => onRemove(product._id)}
          aria-label={`Remove ${product.productName} from wishlist`}
          title="Delete Product"
          className="absolute right-2 top-2 z-20 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-rose-500 text-white shadow-sm transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-50 sm:right-3 sm:top-3"
        >
          {removing ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <FiTrash2 size={14} />
          )}
        </button>

        <Link
          href={href}
          className="absolute inset-0 flex items-center justify-center p-3 sm:p-4"
        >
          {details.image ? (
            <ProductImage src={details.image} alt={product.productName} />
          ) : (
            <div className="flex h-2/5 w-2/5 flex-col items-center justify-center rounded-xl border border-gray-200 text-gray-400 dark:border-gray-700">
              <FiBox size={30} />
              <span className="mt-1 text-xs">Product</span>
            </div>
          )}
        </Link>
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col p-2.5 min-[380px]:p-3 sm:p-4">
        {/* BRAND + STOCK */}
        <div className="flex min-w-0 items-center justify-between gap-2">
          <span className="truncate text-[8px] font-bold uppercase tracking-wider text-gray-400 sm:text-[9px]">
            {brand || material || "Product"}
          </span>

          {details.inStock ? (
            <span className="flex shrink-0 items-center gap-1 text-[8px] font-semibold text-green-600 sm:text-[9px]">
              <FiCheckCircle size={11} />
              In Stock
            </span>
          ) : (
            <span className="flex shrink-0 items-center gap-1 text-[8px] font-semibold text-red-500 sm:text-[9px]">
              <FiXCircle size={11} />
              Out of Stock
            </span>
          )}
        </div>

        {/* TITLE */}
        <Link href={href}>
          <h2
            title={product.productName}
            className="mt-2 line-clamp-2 min-h-4 font-serif text-[11px] font-bold leading-5 text-black transition hover:text-[#b58b00] sm:text-[13px] dark:text-white"
          >
            {product.productName.slice(0, 25)}...
          </h2>
        </Link>

        {/* RATING */}
        <div className="mt-2 flex items-center gap-2">
          <span className="flex items-center gap-1 rounded-md bg-[#fff7d5] px-2 py-1 text-[9px] font-bold text-[#a77f00]">
            <FiStar size={10} fill="currentColor" />
            {rating}
          </span>

          <span className="text-[9px] text-gray-500 dark:text-gray-400">
            {reviewCount} Reviews
          </span>
        </div>

        {/* OPTIONS */}
        {(details.color || details.size) && (
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            {details.color && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-2.5 py-1 text-[9px] font-medium text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full border border-black/10"
                  style={{ backgroundColor: getColorHex(details.color) }}
                />
                {details.color}
              </span>
            )}

            {details.size && (
              <span className="inline-flex items-center rounded-full border border-[#f1df91] bg-[#fff8d8] px-2.5 py-1 text-[9px] font-bold text-[#806400] dark:border-[#665a22] dark:bg-[#29240f] dark:text-[#ffd83d]">
                Size: {details.size}
              </span>
            )}
          </div>
        )}

        <div className="my-3 border-b border-dashed border-gray-200 dark:border-gray-700" />

        {/* PRICE */}
        <div className="mt-auto">
          <p className="text-[9px] text-gray-500 dark:text-gray-400">
            Special Price
          </p>

          <div className="mt-1 flex flex-wrap items-baseline gap-x-2">
            <span className="font-serif text-[14px] font-extrabold text-black sm:text-[16px] dark:text-white">
              {formatAED(details.price)}
            </span>

            {details.saving > 0 && (
              <span className="text-[9px] text-gray-400 line-through">
                {formatAED(details.oldPrice)}
              </span>
            )}
          </div>

          {details.saving > 0 && (
            <span className="mt-1 inline-flex rounded bg-green-50 px-2 py-1 text-[8px] font-bold text-green-600 dark:bg-green-500/10">
              Save {formatAED(details.saving)}
            </span>
          )}
        </div>

        {/* ACTIONS */}
        <div className="mt-3 flex w-full items-center gap-2 sm:mt-4 sm:gap-2.5">
          {details.inStock ? (
            <>
              <ThemeBtnOne
                text="Buy Now"
                url="/checkout"
                icon={
                  <FiShoppingBag className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                }
                className="
                flex h-10 w-full min-w-0 cursor-pointer items-center
                justify-center gap-1.5 overflow-hidden whitespace-nowrap
                rounded-lg bg-[#ffd83d] px-3 font-serif text-[9px] font-bold
                text-black transition-all duration-200
                hover:bg-[#ffcc00] hover:shadow-[0_6px_18px_rgba(255,216,61,0.28)]
                sm:h-11 sm:gap-2 sm:rounded-xl sm:px-4 sm:text-[11px]
              "
              />

              <button
                type="button"
                disabled={isAddingToCart}
                onClick={() => void addItemToCart()}
                title="Add to cart"
                aria-label="Add to cart"
                className="flex h-10 cursor-pointer items-center justify-center rounded-lg border border-gray-300 px-3 transition-all duration-200 hover:border-[#ffd83d] hover:bg-[#fff7d5] disabled:cursor-not-allowed disabled:opacity-60 sm:h-11 dark:border-gray-700 dark:text-white dark:hover:bg-[#29240f]"
              >
                {isAddingToCart ? (
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-gray-400 border-t-transparent sm:h-4 sm:w-4" />
                ) : (
                  <FiShoppingCart className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                )}
              </button>
            </>
          ) : (
            <button
              type="button"
              disabled
              className="h-10 w-full cursor-not-allowed rounded-lg bg-gray-100 text-[9px] font-bold text-gray-400 sm:h-11 dark:bg-[#252525]"
            >
              Out of Stock
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   Page States
========================================================= */

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#f7f7f8] py-10 dark:bg-[#0f0f0f]">
      <div className="mx-auto flex min-h-100 max-w-[1600px] items-center justify-center px-5">
        {children}
      </div>
    </main>
  );
}

function WishlistSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#181818]"
        >
          <div className="aspect-square bg-gray-100 dark:bg-gray-800" />
          <div className="space-y-3 p-3">
            <div className="h-3 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* =========================================================
   Wishlist Page
========================================================= */

export default function WishlistPage() {
  const { user, authLoading } = useFirebaseUser();

  const { data, isLoading, isFetching, isError, error, refetch } =
    useGetWishlistQuery(undefined, {
      skip: authLoading || !user,
    });

  const [removeWishlistByProduct, removeState] =
    useRemoveWishlistByProductMutation();
  const [clearWishlist, clearState] = useClearWishlistMutation();

  // Ignore items whose product was deleted (populate returns null)
  const wishlist = useMemo(
    () => (data ?? []).filter((item) => Boolean(item.product)),
    [data],
  );

  const totalItems = wishlist.length;

  const handleRemove = async (productId: string) => {
    try {
      const response = await removeWishlistByProduct(productId).unwrap();
      toast.success(response.message || "Product removed from wishlist");
    } catch (err) {
      toast.error(
        getApiErrorMessage(err, "Unable to remove product from wishlist"),
      );
    }
  };

  const handleClear = async () => {
    if (!totalItems || clearState.isLoading) return;

    try {
      const response = await clearWishlist().unwrap();
      toast.success(response.message || "Wishlist cleared successfully");
    } catch (err) {
      toast.error(getApiErrorMessage(err, "Unable to clear wishlist"));
    }
  };

  /* AUTH LOADING */
  if (authLoading) {
    return (
      <PageShell>
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-[#ffd83d]" />
          <p className="mt-3 text-sm text-gray-500">Loading wishlist...</p>
        </div>
      </PageShell>
    );
  }

  /* NOT LOGGED IN */
  if (!user) {
    return (
      <PageShell>
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center dark:border-gray-800 dark:bg-[#181818]">
          <FiHeart size={35} className="mx-auto text-[#d4a900]" />

          <h2 className="mt-4 text-xl font-bold text-black dark:text-white">
            Please Login
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Please login to view your wishlist.
          </p>

          <Link
            href="/"
            className="mt-5 inline-flex h-10 items-center justify-center rounded-xl bg-[#ffd83d] px-6 text-xs font-extrabold text-black"
          >
            Go to Home
          </Link>
        </div>
      </PageShell>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f7f8] py-5 sm:py-7 lg:py-9 dark:bg-[#0f0f0f]">
      <div className="mx-auto w-full max-w-[1600px] px-3 sm:px-5 lg:px-8 xl:px-10">
        {/* HEADER */}
        <div className="mb-5 flex items-end justify-between gap-3">
          <div>
            <h1 className="font-serif text-[21px] font-extrabold text-black sm:text-[25px] lg:text-[28px] dark:text-white">
              My Wishlist
            </h1>

            <p className="mt-1 text-[10px] text-gray-500 sm:text-xs dark:text-gray-400">
              {totalItems} {totalItems === 1 ? "item" : "items"} saved
            </p>
          </div>

          <Link
            href="/products"
            className="flex items-center gap-1.5 text-[10px] font-bold text-gray-600 transition hover:text-black sm:text-xs dark:text-gray-300 dark:hover:text-white"
          >
            <FiArrowLeft size={14} />
            Continue Shopping
          </Link>
        </div>

        {/* LOADING */}
        {isLoading && <WishlistSkeleton />}

        {/* ERROR */}
        {!isLoading && isError && (
          <div className="rounded-xl border border-red-200 bg-white p-8 text-center dark:border-red-900 dark:bg-[#181818]">
            <p className="font-semibold text-red-600">
              Unable to load your wishlist.
            </p>

            <p className="mt-2 text-xs text-gray-500">
              {getApiErrorMessage(error, "Please try again.")}
            </p>

            <button
              type="button"
              onClick={() => void refetch()}
              className="mt-4 rounded-lg bg-[#ffd83d] px-5 py-2 text-sm font-bold text-black"
            >
              Try Again
            </button>
          </div>
        )}

        {/* CONTENT */}
        {!isLoading && !isError && totalItems > 0 && (
          <>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-[#181818]">
              <div>
                <p className="text-xs font-bold text-black dark:text-white">
                  Saved Products
                </p>
                <p className="mt-1 text-[10px] text-gray-500 dark:text-gray-400">
                  Your favorite products in one place.
                </p>
              </div>

              <button
                type="button"
                onClick={handleClear}
                disabled={clearState.isLoading}
                className="rounded-lg border border-red-200 px-3 py-2 text-[10px] font-bold text-red-600 transition hover:bg-red-50 disabled:opacity-50 dark:border-red-900"
              >
                {clearState.isLoading ? "Clearing..." : "Clear Wishlist"}
              </button>
            </div>

            {isFetching && (
              <p className="mb-3 text-right text-xs text-gray-500">
                Updating wishlist...
              </p>
            )}

            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {wishlist.map((item) => (
                <WishlistCard
                  key={item._id}
                  item={item}
                  product={item.product}
                  onRemove={handleRemove}
                  removing={
                    removeState.isLoading &&
                    removeState.originalArgs === item.product._id
                  }
                />
              ))}
            </div>
          </>
        )}

        {/* EMPTY */}
        {!isLoading && !isError && totalItems === 0 && (
          <div className="flex min-h-90 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white px-5 text-center dark:border-gray-800 dark:bg-[#181818]">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fff6ce] text-[#8b6a00] dark:bg-[#2b260f] dark:text-[#ffd83d]">
              <FiHeart size={26} />
            </div>

            <h2 className="mt-4 font-serif text-xl font-extrabold text-black dark:text-white">
              Your wishlist is empty
            </h2>

            <p className="mt-2 max-w-xs text-xs leading-5 text-gray-500 dark:text-gray-400">
              Save products you love and come back to them anytime.
            </p>

            <ThemeBtnOne
              url="/products"
              text="Start Shopping"
              icon={<FiShoppingBag size={14} />}
              className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#ffd83d] px-5 text-xs font-extrabold text-black transition hover:bg-[#ffcf12]"
            />
          </div>
        )}
      </div>
    </main>
  );
}
