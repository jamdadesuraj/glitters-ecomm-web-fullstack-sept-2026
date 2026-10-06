import type { useGetProductsQuery } from "@/store/productsApi";

export type Product = NonNullable<
  ReturnType<typeof useGetProductsQuery>["data"]
>[number];

export type Filters = {
  minPrice: number;
  maxPrice: number;
  colors: string[]; // color _id list
  sizes: string[]; // size _id list
  materials: string[]; // material _id list
  rating: number | null;
  inStock: boolean;
  onSale: boolean;
};

export const DEFAULT_FILTERS: Filters = {
  minPrice: 0,
  maxPrice: 5000,
  colors: [],
  sizes: [],
  materials: [],
  rating: null,
  inStock: false,
  onSale: false,
};

type Rec = Record<string, unknown>;

/* API response -> array (handles [] or { data: [] }) */
export const toArray = <T>(res: unknown): T[] => {
  if (Array.isArray(res)) return res as T[];
  const data = (res as { data?: unknown } | undefined)?.data;
  return Array.isArray(data) ? (data as T[]) : [];
};

const num = (v: unknown) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

/* "abc" | { _id: "abc" } | ObjectId  ->  "abc" */
const getId = (v: unknown): string => {
  if (!v) return "";
  if (typeof v === "string") return v;
  if (typeof v === "object") {
    const o = v as Rec;
    return getId(o._id ?? o.id ?? o.$oid);
  }
  return String(v);
};

const getVariants = (p: Rec): Rec[] =>
  Array.isArray(p.variants) ? (p.variants as Rec[]) : [];

const minVariantPrice = (p: Rec) => {
  const prices = getVariants(p).map((v) => num(v.price));
  return prices.length ? Math.min(...prices) : 0;
};

const avgRating = (p: Rec) => {
  const reviews = Array.isArray(p.reviews) ? (p.reviews as Rec[]) : [];
  if (reviews.length === 0) return 0;
  const total = reviews.reduce((sum, r) => sum + num(r.rating), 0);
  return total / reviews.length;
};

export const filterProducts = (
  products: Product[],
  f: Filters,
  sort: string,
): Product[] => {
  const result = products.filter((product) => {
    const p = product as unknown as Rec;

    /* MATERIAL (product level) */
    if (f.materials.length > 0 && !f.materials.includes(getId(p.material))) {
      return false;
    }

    /* RATING */
    if (f.rating !== null && avgRating(p) < f.rating) return false;

    /* VARIANT: price + color + size + stock + sale must match in ONE variant */
    const variantMatch = getVariants(p).some((v) => {
      const price = num(v.price);

      if (price < f.minPrice || price > f.maxPrice) return false;
      if (f.colors.length > 0 && !f.colors.includes(getId(v.color)))
        return false;
      if (f.sizes.length > 0 && !f.sizes.includes(getId(v.size))) return false;
      if (f.inStock && num(v.stock) <= 0) return false;
      if (f.onSale && !(num(v.discount) > 0 || num(v.delPrice) > price))
        return false;

      return true;
    });

    return variantMatch;
  });

  const sorted = [...result];
  const rec = (x: Product) => x as unknown as Rec;

  if (sort === "price-low")
    sorted.sort((a, b) => minVariantPrice(rec(a)) - minVariantPrice(rec(b)));

  if (sort === "price-high")
    sorted.sort((a, b) => minVariantPrice(rec(b)) - minVariantPrice(rec(a)));

  if (sort === "rating")
    sorted.sort((a, b) => avgRating(rec(b)) - avgRating(rec(a)));

  if (sort === "newest")
    sorted.sort(
      (a, b) =>
        new Date(String(rec(b).createdAt ?? 0)).getTime() -
        new Date(String(rec(a).createdAt ?? 0)).getTime(),
    );

  return sorted;
};
