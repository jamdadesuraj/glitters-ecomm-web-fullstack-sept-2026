"use client";

import ThemeBtnOne from "@/app/components/ThemeBtnOne";
import React, { useEffect, useState } from "react";
import {
  FiCheckCircle,
  FiMessageSquare,
  FiStar,
  FiThumbsUp,
  FiX,
  FiEdit3,
  FiSend,
} from "react-icons/fi";

type TabType = "description" | "specifications" | "reviews";

const specifications = [
  { label: "Brand", value: "Apple" },
  { label: "Model", value: "iPhone 16 Pro Max" },
  { label: "Storage", value: "256GB" },
  { label: "Display", value: "6.9-inch Super Retina XDR" },
  { label: "Processor", value: "A18 Pro Chip" },
  { label: "Camera", value: "48MP Pro Camera System" },
  { label: "Battery", value: "All-day battery life" },
  { label: "Operating System", value: "iOS" },
  { label: "Connectivity", value: "5G, Wi-Fi, Bluetooth" },
  { label: "Warranty", value: "1 Year Manufacturer Warranty" },
];

const reviews = [
  {
    id: 1,
    name: "Rahul Sharma",
    rating: 5,
    date: "18 Sep 2026",
    title: "Excellent product",
    comment:
      "The build quality and performance are excellent. Camera quality is very impressive and battery easily lasts the whole day.",
    verified: true,
    helpful: 18,
  },
  {
    id: 2,
    name: "Aman Verma",
    rating: 4,
    date: "14 Sep 2026",
    title: "Very good overall",
    comment:
      "Premium design and smooth performance. Delivery was fast and the product arrived in perfect condition.",
    verified: true,
    helpful: 11,
  },
  {
    id: 3,
    name: "Priya Singh",
    rating: 5,
    date: "09 Sep 2026",
    title: "Worth the purchase",
    comment:
      "Amazing camera, smooth display and very good battery backup. Definitely recommended if you want a premium phone.",
    verified: true,
    helpful: 7,
  },
];

const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState<TabType>("description");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);

  const [reviewForm, setReviewForm] = useState({
    name: "",
    email: "",
    title: "",
    review: "",
  });

  const tabs: {
    id: TabType;
    label: string;
    count?: number;
  }[] = [
    {
      id: "description",
      label: "Description",
    },
    {
      id: "specifications",
      label: "Specifications",
    },
    {
      id: "reviews",
      label: "Reviews",
      count: 186,
    },
  ];

  const handleReviewChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setReviewForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReviewSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({
      ...reviewForm,
      rating: reviewRating,
    });

    setShowReviewModal(false);
    setReviewRating(0);

    setReviewForm({
      name: "",
      email: "",
      title: "",
      review: "",
    });
  };

  useEffect(() => {
    if (!showReviewModal) return;

    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowReviewModal(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [showReviewModal]);

  const inputClass = `
    h-12
    w-full
    rounded-xl
    border
    border-gray-200
    bg-gray-50
    px-4
    text-sm
    font-medium
    text-gray-900
    outline-none
    transition
    placeholder:font-normal
    placeholder:text-gray-400
    hover:border-gray-300
    focus:border-[#d5ae00]
    focus:bg-white
    focus:ring-4
    focus:ring-[#ffd83d]/15
    dark:border-white/10
    dark:bg-[#0c0c0c]
    dark:text-white
    dark:placeholder:text-gray-600
    dark:hover:border-white/20
    dark:focus:border-[#ffd83d]/60
  `;

  return (
    <>
      <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-[#111111]">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 bg-white px-3 dark:border-white/10 dark:bg-[#111111] sm:px-5">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const active = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    relative
                    flex
                    shrink-0
                    cursor-pointer
                    items-center
                    gap-2
                    px-4
                    py-4
                    text-sm
                    font-extrabold
                    transition
                    sm:px-5
                    ${
                      active
                        ? "text-gray-950 dark:text-white"
                        : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    }
                  `}
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

        {/* Content */}
        <div className="p-5 sm:p-6 lg:p-8">
          {/* DESCRIPTION */}
          {activeTab === "description" && (
            <div className="max-w-262.5">
              <div className="mb-7">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#a58200] dark:text-[#ffd83d]">
                  Product Overview
                </span>

                <h2 className="mt-2 text-xl font-black text-gray-950 dark:text-white sm:text-2xl">
                  About this product
                </h2>
              </div>

              <div className="space-y-5 text-sm leading-7 text-gray-600 dark:text-gray-400">
                <p>
                  The Apple iPhone 16 Pro Max combines premium design, powerful
                  performance and advanced camera technology to deliver a
                  flagship smartphone experience.
                </p>

                <p>
                  Built with a durable titanium body and powered by the A18 Pro
                  chip, it delivers excellent performance for everyday tasks,
                  gaming, photography and professional workflows.
                </p>

                <p>
                  Its Super Retina XDR display provides impressive brightness,
                  contrast and detail for videos, photos and everyday content.
                </p>
              </div>

              <div className="mt-8">
                <h3 className="text-base font-black text-gray-950 dark:text-white">
                  Key Highlights
                </h3>

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    "Premium titanium design",
                    "Powerful A18 Pro processor",
                    "Advanced 48MP camera system",
                    "Super Retina XDR display",
                    "All-day battery life",
                    "Fast 5G connectivity",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3.5 transition hover:border-green-200 dark:border-white/5 dark:bg-white/2.5"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400">
                        <FiCheckCircle size={16} />
                      </div>

                      <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SPECIFICATIONS */}
          {activeTab === "specifications" && (
            <div>
              <div className="mb-7">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#a58200] dark:text-[#ffd83d]">
                  Technical Details
                </span>

                <h2 className="mt-2 text-xl font-black text-gray-950 dark:text-white sm:text-2xl">
                  Specifications
                </h2>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Detailed technical information about this product.
                </p>
              </div>

              <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10">
                {specifications.map((spec, index) => (
                  <div
                    key={spec.label}
                    className={`
                      grid
                      grid-cols-1
                      gap-1
                      px-4
                      py-4
                      sm:grid-cols-[230px_1fr]
                      sm:gap-8
                      sm:px-5
                      ${
                        index !== specifications.length - 1
                          ? "border-b border-gray-100 dark:border-white/10"
                          : ""
                      }
                      ${
                        index % 2 === 0
                          ? "bg-gray-50/70 dark:bg-white/2"
                          : "bg-white dark:bg-[#111111]"
                      }
                    `}
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
            </div>
          )}

          {/* REVIEWS */}
          {activeTab === "reviews" && (
            <div>
              {/* Reviews Header */}
              <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#a58200] dark:text-[#ffd83d]">
                    Customer Feedback
                  </span>

                  <h2 className="mt-2 text-xl font-black text-gray-950 dark:text-white sm:text-2xl">
                    Customer Reviews
                  </h2>

                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    See what customers think about this product.
                  </p>
                </div>

                <ThemeBtnOne
                  type="button"
                  onClick={() => setShowReviewModal(true)}
                  className="flex h-11 w-fit cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#ffd83d] px-5 text-xs font-extrabold text-black shadow-[0_6px_18px_rgba(255,216,61,0.2)] transition hover:-translate-y-0.5 hover:bg-[#ffcf12]"
                  icon={<FiEdit3 size={15} />}
                  text="Write a Review"
                />
              </div>

              {/* Summary */}
              <div className="grid grid-cols-1 gap-6 rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-white/10 dark:bg-white/2.5 md:grid-cols-[230px_1fr]">
                <div className="flex flex-col items-center justify-center text-center md:border-r md:border-gray-200 dark:md:border-white/10">
                  <span className="text-5xl font-black text-gray-950 dark:text-white">
                    4.8
                  </span>

                  <div className="mt-2 flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FiStar
                        key={star}
                        size={16}
                        className="fill-[#f5b301] text-[#f5b301]"
                      />
                    ))}
                  </div>

                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    Based on 186 reviews
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    { star: 5, width: "82%", count: 152 },
                    { star: 4, width: "12%", count: 22 },
                    { star: 3, width: "4%", count: 8 },
                    { star: 2, width: "1%", count: 2 },
                    { star: 1, width: "1%", count: 2 },
                  ].map((item) => (
                    <div key={item.star} className="flex items-center gap-3">
                      <span className="w-8 text-xs font-bold text-gray-600 dark:text-gray-400">
                        {item.star} ★
                      </span>

                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-white/10">
                        <div
                          className="h-full rounded-full bg-[#ffd83d]"
                          style={{
                            width: item.width,
                          }}
                        />
                      </div>

                      <span className="w-8 text-right text-[10px] font-semibold text-gray-400">
                        {item.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div className="mt-7 space-y-4">
                {reviews.map((review) => (
                  <article
                    key={review.id}
                    className="rounded-2xl border border-gray-200 bg-white p-5 transition-all hover:border-gray-300 hover:shadow-sm dark:border-white/10 dark:bg-[#111111] dark:hover:border-white/20"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#fff3bd] text-sm font-black text-[#927200] dark:bg-[#ffd83d]/10 dark:text-[#ffd83d]">
                          {review.name
                            .split(" ")
                            .map((name) => name.charAt(0))
                            .join("")
                            .slice(0, 2)}
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

                          <p className="mt-1 text-[11px] text-gray-400">
                            {review.date}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FiStar
                            key={star}
                            size={13}
                            className={
                              star <= review.rating
                                ? "fill-[#f5b301] text-[#f5b301]"
                                : "text-gray-300 dark:text-gray-700"
                            }
                          />
                        ))}
                      </div>
                    </div>

                    <h4 className="mt-4 text-sm font-extrabold text-gray-900 dark:text-gray-200">
                      {review.title}
                    </h4>

                    <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                      {review.comment}
                    </p>

                    <div className="mt-4 flex gap-4 border-t border-gray-100 pt-4 dark:border-white/10">
                      <button
                        type="button"
                        className="flex cursor-pointer items-center gap-1.5 text-[11px] font-bold text-gray-500 transition hover:text-[#a58200] dark:text-gray-400 dark:hover:text-[#ffd83d]"
                      >
                        <FiThumbsUp size={13} />
                        Helpful ({review.helpful})
                      </button>

                      <button
                        type="button"
                        className="flex cursor-pointer items-center gap-1.5 text-[11px] font-bold text-gray-500 transition hover:text-[#a58200] dark:text-gray-400 dark:hover:text-[#ffd83d]"
                      >
                        <FiMessageSquare size={13} />
                        Reply
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ADD REVIEW MODAL */}
      {showReviewModal && (
        <div
          className="fixed inset-0 z-9999 flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm"
          onClick={() => setShowReviewModal(false)}
        >
          <div
            className="max-h-[90vh] w-full max-w-155 overflow-y-auto rounded-3xl border border-gray-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#111111]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-gray-100 bg-white p-5 dark:border-white/10 dark:bg-[#111111] sm:p-6">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#a58200] dark:text-[#ffd83d]">
                  Share Your Experience
                </span>

                <h2 className="mt-1.5 text-xl font-black text-gray-950 dark:text-white">
                  Write a Review
                </h2>

                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Your feedback helps other customers.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowReviewModal(false)}
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
                <div>
                  <label className="mb-2 block text-xs font-bold text-gray-700 dark:text-gray-300">
                    Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={reviewForm.name}
                    onChange={handleReviewChange}
                    placeholder="Your name"
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold text-gray-700 dark:text-gray-300">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={reviewForm.email}
                    onChange={handleReviewChange}
                    placeholder="you@example.com"
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold text-gray-700 dark:text-gray-300">
                  Review Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={reviewForm.title}
                  onChange={handleReviewChange}
                  placeholder="Give your review a title"
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold text-gray-700 dark:text-gray-300">
                  Your Review
                </label>

                <textarea
                  name="review"
                  value={reviewForm.review}
                  onChange={handleReviewChange}
                  placeholder="Tell us what you liked or disliked about this product..."
                  rows={5}
                  required
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-900 outline-none transition placeholder:font-normal placeholder:text-gray-400 hover:border-gray-300 focus:border-[#d5ae00] focus:bg-white focus:ring-4 focus:ring-[#ffd83d]/15 dark:border-white/10 dark:bg-[#0c0c0c] dark:text-white dark:placeholder:text-gray-600 dark:hover:border-white/20 dark:focus:border-[#ffd83d]/60"
                />
              </div>

              <ThemeBtnOne
                type="submit"
                disabled={reviewRating === 0}
                className="flex w-full h-11  cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#ffd83d] px-5 text-xs font-extrabold text-black shadow-[0_6px_18px_rgba(255,216,61,0.2)] transition hover:-translate-y-0.5 hover:bg-[#ffcf12]"
                icon={<FiSend size={16} />}
                text="Submit Review"
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

export default ProductTabs;
