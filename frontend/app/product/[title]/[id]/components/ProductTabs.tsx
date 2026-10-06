"use client";

import { useEffect, useMemo, useState } from "react";
import ThemeBtnOne from "@/app/components/ThemeBtnOne";
import {
  FiCheckCircle,
  FiEdit3,
  FiSend,
  FiStar,
  FiThumbsUp,
  FiX,
} from "react-icons/fi";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

type ApiReview = {
  _id?: string;
  name?: string;
  userName?: string;
  user?: { name?: string } | string | null;
  rating?: number | string;
  title?: string;
  comment?: string;
  review?: string;
  createdAt?: string;
  verified?: boolean;
  isVerified?: boolean;
  helpful?: number;
};

type ApiProduct = {
  _id?: string;
  desc?: string;
  additionalInformation?: string;
  shippingReturnPolicy?: string;
  specifications?: unknown;
  reviews?: ApiReview[];
};

export type ReviewPayload = {
  productId?: string;
  name: string;
  email: string;
  title: string;
  review: string;
  rating: number;
};

type ProductTabsProps = {
  product?: ApiProduct | null;
  /** Connect this to your "create review" API. Throw to show an error. */
  onSubmitReview?: (payload: ReviewPayload) => Promise<void> | void;
};

type TabId =
  | "description"
  | "specifications"
  | "additional"
  | "shipping"
  | "reviews";

type Tab = { id: TabId; label: string; count?: number };

type Spec = { label: string; value: string };

type Review = {
  id: string;
  name: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  helpful: number;
};

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

const hasText = (html = "") => html.replace(/<[^>]*>/g, "").trim().length > 0;

const toText = (value: unknown) =>
  typeof value === "string" || typeof value === "number"
    ? String(value).trim()
    : "";

const LABEL_KEYS = [
  "label",
  "key",
  "name",
  "title",
  "specName",
  "specification",
  "attribute",
  "heading",
];

const VALUE_KEYS = [
  "value",
  "description",
  "specValue",
  "detail",
  "details",
  "content",
];

const pick = (item: Record<string, unknown>, keys: string[]) => {
  for (const key of keys) {
    const text = toText(item[key]);
    if (text) return text;
  }
  return "";
};

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

/**
 * Accepts any of these shapes:
 *  - [{ label, value }]  [{ key, value }]  [{ name, value }]  [{ title, value }]
 *  - [{ specName, specValue }]
 *  - [{ Brand: "Nike" }]
 *  - { Brand: "Nike", Color: "Red" }
 */
const toSpecs = (specs: unknown): Spec[] => {
  if (!specs) return [];

  // Plain object map
  if (isRecord(specs)) {
    return Object.entries(specs)
      .map(([label, value]) => ({ label, value: toText(value) }))
      .filter((s) => s.label && s.value);
  }

  if (!Array.isArray(specs)) return [];

  return specs
    .map((item): Spec => {
      if (!isRecord(item)) return { label: "", value: "" };

      let label = pick(item, LABEL_KEYS);
      let value = pick(item, VALUE_KEYS);

      // Fallback: use the first non-internal entries
      if (!label || !value) {
        const entries = Object.entries(item).filter(
          ([k, v]) => !k.startsWith("_") && toText(v),
        );

        if (entries.length === 1) {
          label = entries[0][0];
          value = toText(entries[0][1]);
        } else if (entries.length >= 2) {
          label = label || toText(entries[0][1]);
          value = value || toText(entries[1][1]);
        }
      }

      return { label, value };
    })
    .filter((s) => s.label && s.value);
};

const formatDate = (iso?: string) => {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
};

const toReviews = (reviews: ApiReview[] = []): Review[] =>
  reviews.map((r, index) => {
    const userName =
      typeof r.user === "string" ? r.user : (r.user?.name ?? undefined);

    return {
      id: r._id ?? String(index),
      name: r.name ?? r.userName ?? userName ?? "Customer",
      rating: Math.min(5, Math.max(0, Number(r.rating) || 0)),
      date: formatDate(r.createdAt),
      title: r.title ?? "",
      comment: r.comment ?? r.review ?? "",
      verified: Boolean(r.verified ?? r.isVerified),
      helpful: r.helpful ?? 0,
    };
  });

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

const EMPTY_FORM = { name: "", email: "", title: "", review: "" };

const INPUT_CLASS =
  "h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm font-medium text-gray-900 outline-none transition placeholder:font-normal placeholder:text-gray-400 hover:border-gray-300 focus:border-[#d5ae00] focus:bg-white focus:ring-4 focus:ring-[#ffd83d]/15 dark:border-white/10 dark:bg-[#0c0c0c] dark:text-white dark:placeholder:text-gray-600 dark:hover:border-white/20 dark:focus:border-[#ffd83d]/60";

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

const ProductTabs = ({ product, onSubmitReview }: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState<TabId>("description");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewForm, setReviewForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const specs = useMemo(() => toSpecs(product?.specifications), [product]);
  const reviews = useMemo(() => toReviews(product?.reviews), [product]);

  /* ----- rating summary (1★ - 5★ counts) ----- */
  const { averageRating, distribution } = useMemo(() => {
    const total = reviews.length;

    const average = total
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / total
      : 0;

    const dist = [5, 4, 3, 2, 1].map((star) => {
      const count = reviews.filter((r) => Math.round(r.rating) === star).length;
      return {
        star,
        count,
        width: total ? `${(count / total) * 100}%` : "0%",
      };
    });

    return { averageRating: average, distribution: dist };
  }, [reviews]);

  /* ----- tabs ----- */
  const tabs = useMemo<Tab[]>(() => {
    const list: Tab[] = [
      { id: "description", label: "Description" },
      { id: "specifications", label: "Specifications" },
    ];

    if (hasText(product?.additionalInformation)) {
      list.push({ id: "additional", label: "Additional Information" });
    }
    if (hasText(product?.shippingReturnPolicy)) {
      list.push({ id: "shipping", label: "Shipping & Return" });
    }

    list.push({ id: "reviews", label: "Reviews", count: reviews.length });
    return list;
  }, [product, reviews.length]);

  const currentTab = tabs.some((t) => t.id === activeTab)
    ? activeTab
    : tabs[0].id;

  /* ----- modal: lock scroll + Escape ----- */
  useEffect(() => {
    if (!showReviewModal) return;

    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShowReviewModal(false);
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [showReviewModal]);

  if (!product) return <TabsSkeleton />;

  /* ----- handlers ----- */
  const handleReviewChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setReviewForm((prev) => ({ ...prev, [name]: value }));
  };

  const closeModal = () => {
    setShowReviewModal(false);
    setSubmitError("");
  };

  const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (reviewRating === 0 || submitting) return;

    setSubmitting(true);
    setSubmitError("");

    try {
      await onSubmitReview?.({
        productId: product._id,
        ...reviewForm,
        rating: reviewRating,
      });

      setReviewForm(EMPTY_FORM);
      setReviewRating(0);
      setShowReviewModal(false);
    } catch {
      setSubmitError("Could not submit your review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-[#111111]">
        {/* TAB NAVIGATION */}
        <div className="border-b border-gray-200 bg-white px-3 sm:px-5 dark:border-white/10 dark:bg-[#111111]">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const active = currentTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex shrink-0 cursor-pointer items-center gap-2 px-4 py-4 text-sm font-extrabold transition sm:px-5 ${
                    active
                      ? "text-gray-950 dark:text-white"
                      : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  }`}
                >
                  {tab.label}

                  {tab.count !== undefined && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
                        active
                          ? "bg-[#ffd83d] text-black"
                          : "bg-gray-100 text-gray-500 dark:bg-white/10 dark:text-gray-400"
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}

                  {active && (
                    <span className="absolute inset-x-4 bottom-0 h-0.75 rounded-t-full bg-[#ffd83d]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-5 sm:p-6 lg:p-8">
          {currentTab === "description" && (
            <Section eyebrow="Product Overview" title="About this product">
              {hasText(product.desc) ? (
                <RichText html={product.desc!} />
              ) : (
                <EmptyText>No description available.</EmptyText>
              )}
            </Section>
          )}

          {currentTab === "specifications" && (
            <Section
              eyebrow="Technical Details"
              title="Specifications"
              subtitle="Detailed technical information about this product."
            >
              {specs.length === 0 ? (
                <EmptyText>No specifications available.</EmptyText>
              ) : (
                <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10">
                  {specs.map((spec, index) => (
                    <div
                      key={`${spec.label}-${index}`}
                      className={`grid grid-cols-1 gap-1 px-4 py-4 sm:grid-cols-[230px_1fr] sm:gap-8 sm:px-5 ${
                        index !== specs.length - 1
                          ? "border-b border-gray-100 dark:border-white/10"
                          : ""
                      } ${
                        index % 2 === 0
                          ? "bg-gray-50/70 dark:bg-white/2"
                          : "bg-white dark:bg-[#111111]"
                      }`}
                    >
                      <p className="text-xs font-extrabold text-gray-500 dark:text-gray-400">
                        {spec.label}
                      </p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-200">
                        {spec.value}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </Section>
          )}

          {currentTab === "additional" && (
            <Section eyebrow="More Details" title="Additional Information">
              <RichText html={product.additionalInformation!} />
            </Section>
          )}

          {currentTab === "shipping" && (
            <Section eyebrow="Delivery" title="Shipping & Return Policy">
              <RichText html={product.shippingReturnPolicy!} />
            </Section>
          )}

          {currentTab === "reviews" && (
            <div>
              <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <Heading
                  eyebrow="Customer Feedback"
                  title="Customer Reviews"
                  subtitle="See what customers think about this product."
                />

                <ThemeBtnOne
                  type="button"
                  onClick={() => setShowReviewModal(true)}
                  className="flex h-11 w-fit cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#ffd83d] px-5 text-xs font-extrabold text-black shadow-[0_6px_18px_rgba(255,216,61,0.2)] transition hover:-translate-y-0.5 hover:bg-[#ffcf12]"
                  icon={<FiEdit3 size={15} />}
                  text="Write a Review"
                />
              </div>

              {/* Rating summary - always visible, 5★ to 1★ counts */}
              <RatingSummary
                average={averageRating}
                total={reviews.length}
                distribution={distribution}
              />

              {/* List */}
              {reviews.length === 0 ? (
                <div className="mt-7 rounded-2xl border border-dashed border-gray-200 py-12 text-center dark:border-white/10">
                  <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
                    No reviews yet
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    Be the first to review this product.
                  </p>
                </div>
              ) : (
                <div className="mt-7 space-y-4">
                  {reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* WRITE REVIEW MODAL */}
      {showReviewModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Write a review"
          className="fixed inset-0 z-9999 flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="max-h-[90vh] w-full max-w-155 overflow-y-auto rounded-3xl border border-gray-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#111111]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-gray-100 bg-white p-5 sm:p-6 dark:border-white/10 dark:bg-[#111111]">
              <Heading
                eyebrow="Share Your Experience"
                title="Write a Review"
                subtitle="Your feedback helps other customers."
                compact
              />

              <button
                type="button"
                onClick={closeModal}
                aria-label="Close"
                className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-red-50 hover:text-red-500 dark:bg-white/10 dark:text-gray-300"
              >
                <FiX size={18} />
              </button>
            </div>

            <form
              onSubmit={handleReviewSubmit}
              className="space-y-5 p-5 sm:p-6"
            >
              {/* Rating */}
              <div>
                <label className="mb-3 block text-xs font-extrabold text-gray-800 dark:text-gray-200">
                  Your Rating
                </label>

                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      aria-label={`${star} star${star > 1 ? "s" : ""}`}
                      className="cursor-pointer transition-transform hover:scale-110"
                    >
                      <FiStar
                        size={28}
                        className={
                          star <= reviewRating
                            ? "fill-[#f5b301] text-[#f5b301]"
                            : "text-gray-300 dark:text-gray-700"
                        }
                      />
                    </button>
                  ))}

                  {reviewRating > 0 && (
                    <span className="ml-2 text-xs font-bold text-gray-500 dark:text-gray-400">
                      {reviewRating}/5
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Name">
                  <input
                    type="text"
                    name="name"
                    value={reviewForm.name}
                    onChange={handleReviewChange}
                    placeholder="Your name"
                    required
                    className={INPUT_CLASS}
                  />
                </Field>

                <Field label="Email">
                  <input
                    type="email"
                    name="email"
                    value={reviewForm.email}
                    onChange={handleReviewChange}
                    placeholder="you@example.com"
                    required
                    className={INPUT_CLASS}
                  />
                </Field>
              </div>

              <Field label="Review Title">
                <input
                  type="text"
                  name="title"
                  value={reviewForm.title}
                  onChange={handleReviewChange}
                  placeholder="Give your review a title"
                  required
                  className={INPUT_CLASS}
                />
              </Field>

              <Field label="Your Review">
                <textarea
                  name="review"
                  value={reviewForm.review}
                  onChange={handleReviewChange}
                  placeholder="Tell us what you liked or disliked about this product..."
                  rows={5}
                  required
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-900 outline-none transition placeholder:font-normal placeholder:text-gray-400 hover:border-gray-300 focus:border-[#d5ae00] focus:bg-white focus:ring-4 focus:ring-[#ffd83d]/15 dark:border-white/10 dark:bg-[#0c0c0c] dark:text-white dark:placeholder:text-gray-600 dark:hover:border-white/20 dark:focus:border-[#ffd83d]/60"
                />
              </Field>

              {submitError && (
                <p className="text-center text-xs font-semibold text-red-500">
                  {submitError}
                </p>
              )}

              <ThemeBtnOne
                type="submit"
                disabled={reviewRating === 0 || submitting}
                className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#ffd83d] px-5 text-xs font-extrabold text-black shadow-[0_6px_18px_rgba(255,216,61,0.2)] transition hover:-translate-y-0.5 hover:bg-[#ffcf12] disabled:cursor-not-allowed disabled:opacity-60"
                icon={<FiSend size={16} />}
                text={submitting ? "Submitting..." : "Submit Review"}
              />

              <p className="text-center text-[10px] leading-5 text-gray-400">
                Your review may be moderated before being published.
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

/* -------------------------------------------------------------------------- */
/*  Small pieces                                                              */
/* -------------------------------------------------------------------------- */

const Heading = ({
  eyebrow,
  title,
  subtitle,
  compact = false,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  compact?: boolean;
}) => (
  <div>
    <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#a58200] dark:text-[#ffd83d]">
      {eyebrow}
    </span>

    <h2
      className={`font-black text-gray-950 dark:text-white ${
        compact ? "mt-1.5 text-xl" : "mt-2 text-xl sm:text-2xl"
      }`}
    >
      {title}
    </h2>

    {subtitle && (
      <p
        className={`text-gray-500 dark:text-gray-400 ${
          compact ? "mt-1 text-xs" : "mt-2 text-sm"
        }`}
      >
        {subtitle}
      </p>
    )}
  </div>
);

const Section = ({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) => (
  <div>
    <div className="mb-7">
      <Heading eyebrow={eyebrow} title={title} subtitle={subtitle} />
    </div>
    {children}
  </div>
);

/**
 * Renders HTML saved by your admin editor.
 * Sanitize it first if admins are not fully trusted (e.g. isomorphic-dompurify).
 */
const RichText = ({ html }: { html: string }) => (
  <div
    className="max-w-262.5 text-sm leading-7 text-gray-600 dark:text-gray-400 [&_a]:font-semibold [&_a]:underline [&_h1]:mb-3 [&_h1]:text-lg [&_h1]:font-black [&_h2]:mb-3 [&_h2]:text-base [&_h2]:font-black [&_h3]:mb-2 [&_h3]:font-extrabold [&_img]:my-4 [&_img]:max-w-full [&_img]:rounded-xl [&_li]:mb-1 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-4 [&_strong]:font-bold [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5"
    dangerouslySetInnerHTML={{ __html: html }}
  />
);

const EmptyText = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm text-gray-400">{children}</p>
);

const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div>
    <label className="mb-2 block text-xs font-bold text-gray-700 dark:text-gray-300">
      {label}
    </label>
    {children}
  </div>
);

const Stars = ({
  rating,
  size,
  className = "",
}: {
  rating: number;
  size: number;
  className?: string;
}) => (
  <div className={`flex gap-1 ${className}`}>
    {[1, 2, 3, 4, 5].map((star) => (
      <FiStar
        key={star}
        size={size}
        className={
          star <= Math.round(rating)
            ? "fill-[#f5b301] text-[#f5b301]"
            : "text-gray-300 dark:text-gray-700"
        }
      />
    ))}
  </div>
);

const RatingSummary = ({
  average,
  total,
  distribution,
}: {
  average: number;
  total: number;
  distribution: { star: number; count: number; width: string }[];
}) => (
  <div className="grid grid-cols-1 gap-6 rounded-2xl border border-gray-200 bg-gray-50 p-5 md:grid-cols-[230px_1fr] dark:border-white/10 dark:bg-white/2.5">
    <div className="flex flex-col items-center justify-center text-center md:border-r md:border-gray-200 dark:md:border-white/10">
      <span className="text-5xl font-black text-gray-950 dark:text-white">
        {average.toFixed(1)}
      </span>

      <Stars rating={average} size={16} className="mt-2" />

      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        Based on {total} {total === 1 ? "review" : "reviews"}
      </p>
    </div>

    <div className="space-y-3">
      {distribution.map((item) => (
        <div key={item.star} className="flex items-center gap-3">
          <span className="w-8 text-xs font-bold text-gray-600 dark:text-gray-400">
            {item.star} ★
          </span>

          <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-white/10">
            <div
              className="h-full rounded-full bg-[#ffd83d] transition-all duration-500"
              style={{ width: item.width }}
            />
          </div>

          <span className="w-8 text-right text-[10px] font-semibold text-gray-400">
            {item.count}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const ReviewCard = ({ review }: { review: Review }) => (
  <article className="rounded-2xl border border-gray-200 bg-white p-5 transition-all hover:border-gray-300 hover:shadow-sm dark:border-white/10 dark:bg-[#111111] dark:hover:border-white/20">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#fff3bd] text-sm font-black text-[#927200] dark:bg-[#ffd83d]/10 dark:text-[#ffd83d]">
          {getInitials(review.name)}
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-extrabold text-gray-950 dark:text-white">
              {review.name}
            </h3>

            {review.verified && (
              <span className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-[9px] font-bold text-green-600 dark:bg-green-500/10 dark:text-green-400">
                <FiCheckCircle size={10} />
                Verified
              </span>
            )}
          </div>

          {review.date && (
            <p className="mt-1 text-[11px] text-gray-400">{review.date}</p>
          )}
        </div>
      </div>

      <Stars rating={review.rating} size={13} />
    </div>

    {review.title && (
      <h4 className="mt-4 text-sm font-extrabold text-gray-900 dark:text-gray-200">
        {review.title}
      </h4>
    )}

    {review.comment && (
      <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
        {review.comment}
      </p>
    )}

    <div className="mt-4 flex gap-4 border-t border-gray-100 pt-4 dark:border-white/10">
      <button
        type="button"
        className="flex cursor-pointer items-center gap-1.5 text-[11px] font-bold text-gray-500 transition hover:text-[#a58200] dark:text-gray-400 dark:hover:text-[#ffd83d]"
      >
        <FiThumbsUp size={13} />
        Helpful ({review.helpful})
      </button>
    </div>
  </article>
);

const TabsSkeleton = () => (
  <div className="w-full animate-pulse space-y-4 rounded-2xl border border-gray-200 p-6 dark:border-white/10">
    <div className="h-8 w-1/2 rounded bg-gray-100 dark:bg-white/10" />
    <div className="h-4 w-full rounded bg-gray-100 dark:bg-white/10" />
    <div className="h-4 w-5/6 rounded bg-gray-100 dark:bg-white/10" />
    <div className="h-4 w-2/3 rounded bg-gray-100 dark:bg-white/10" />
  </div>
);

export default ProductTabs;
