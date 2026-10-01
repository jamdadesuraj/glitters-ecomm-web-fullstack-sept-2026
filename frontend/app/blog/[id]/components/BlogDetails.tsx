"use client";

import { useGetBlogByIdQuery, useGetBlogQuery } from "@/store/blogApi";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCalendar,
  FiFacebook,
  FiFileText,
  FiLinkedin,
  FiShare2,
  FiTwitter,
  FiUser,
} from "react-icons/fi";

/* ============================================================
   TYPES
============================================================ */

interface BlogCategory {
  _id?: string;
  categoryName?: string;
  createdAt?: string | Date | null;
  updatedAt?: string | Date | null;
}

interface Blog {
  _id: string;

  category?: BlogCategory | string | null;

  title?: string | null;
  shortDesc?: string | null;
  author?: string | null;

  featured?: boolean;

  image?: string | null;

  description?: string | null;
  QuickTips?: string | null;
  blackQuote?: string | null;

  tags?: string[] | string | null;

  writtenBy?: string | null;
  writtenByImage?: string | null;
  writtenByDesc?: string | null;

  metaTitle?: string | null;
  metaDesc?: string | null;
  metaTags?: string[] | string | null;

  isDeleted?: boolean;

  createdAt?: string | Date | null;
  updatedAt?: string | Date | null;
}
type DateInput = string | Date | null | undefined;
const getCategoryName = (category?: BlogCategory | string | null): string => {
  if (!category) {
    return "";
  }

  if (typeof category === "string") {
    return category;
  }

  return category.categoryName ?? "";
};

/**
 * Safely convert API date into Date.
 */
const parseDate = (value: DateInput): Date | null => {
  if (!value) return null;

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  const text = value.trim();

  /* DD/MM/YYYY or DD-MM-YYYY (optionally followed by a time) */
  const match = text.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})/);

  if (match) {
    const [, day, month, year] = match;
    const date = new Date(Number(year), Number(month) - 1, Number(day));

    return Number.isNaN(date.getTime()) ? null : date;
  }

  /* ISO strings like 2026-10-01T07:04:45.659Z */
  const date = new Date(text);

  return Number.isNaN(date.getTime()) ? null : date;
};

const formatDate = (value: DateInput): string => {
  const date = parseDate(value);

  if (!date) return "";

  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "long" });

  return `${day} ${month} ${date.getFullYear()}`;
};

const normalizeTags = (tags?: string[] | string | null): string[] => {
  if (!tags) {
    return [];
  }

  if (Array.isArray(tags)) {
    return tags
      .filter((tag): tag is string => typeof tag === "string")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  return tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
};

/* ============================================================
   COMPONENT
============================================================ */

const BlogDetails = () => {
  const params = useParams();

  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  /* ============================================================
     SINGLE BLOG
  ============================================================ */

  const {
    data: blogResponse,
    isLoading,
    isError,
  } = useGetBlogByIdQuery(id ?? "", {
    skip: !id,
  });

  /* ============================================================
     ALL BLOGS
  ============================================================ */

  const { data: recentResponse } = useGetBlogQuery();

  /* ============================================================
     NORMALIZE SINGLE BLOG RESPONSE
  ============================================================ */

  const blogs: Blog | null = React.useMemo(() => {
    if (!blogResponse) {
      return null;
    }

    const response = blogResponse as unknown;

    if (
      typeof response === "object" &&
      response !== null &&
      "data" in response
    ) {
      const data = (response as { data?: unknown }).data;

      if (data && typeof data === "object" && "_id" in data) {
        return data as Blog;
      }
    }

    if (
      typeof response === "object" &&
      response !== null &&
      "blog" in response
    ) {
      const blog = (response as { blog?: unknown }).blog;

      if (blog && typeof blog === "object" && "_id" in blog) {
        return blog as Blog;
      }
    }

    if (
      typeof response === "object" &&
      response !== null &&
      "_id" in response
    ) {
      return response as Blog;
    }

    return null;
  }, [blogResponse]);

  /* ============================================================
     NORMALIZE ALL BLOGS
  ============================================================ */

  const recentPosts: Blog[] = React.useMemo(() => {
    if (!recentResponse) {
      return [];
    }

    const response = recentResponse as unknown;

    /* Response: [] */
    if (Array.isArray(response)) {
      return response.filter(
        (item): item is Blog =>
          typeof item === "object" && item !== null && "_id" in item,
      );
    }

    /* Response: { data: [] } */
    if (
      typeof response === "object" &&
      response !== null &&
      "data" in response
    ) {
      const data = (response as { data?: unknown }).data;

      if (Array.isArray(data)) {
        return data.filter(
          (item): item is Blog =>
            typeof item === "object" && item !== null && "_id" in item,
        );
      }
    }

    /* Response: { blogs: [] } */
    if (
      typeof response === "object" &&
      response !== null &&
      "blogs" in response
    ) {
      const data = (response as { blogs?: unknown }).blogs;

      if (Array.isArray(data)) {
        return data.filter(
          (item): item is Blog =>
            typeof item === "object" && item !== null && "_id" in item,
        );
      }
    }

    return [];
  }, [recentResponse]);

  /* ============================================================
     LOADING
  ============================================================ */

  if (isLoading) {
    return (
      <section className="min-h-screen bg-[#f7f7f8] py-16 dark:bg-[#080808] lg:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="animate-pulse overflow-hidden rounded-3xl border border-gray-200 bg-white lg:col-span-8 dark:border-white/10 dark:bg-[#111]">
              <div className="h-80 bg-gray-200 dark:bg-gray-800 sm:h-[450px]" />

              <div className="p-8">
                <div className="mb-6 flex justify-between">
                  <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-800" />
                  <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-800" />
                </div>

                <div className="mb-6 h-10 w-3/4 rounded bg-gray-200 dark:bg-gray-800" />

                <div className="space-y-3">
                  <div className="h-4 rounded bg-gray-200 dark:bg-gray-800" />
                  <div className="h-4 rounded bg-gray-200 dark:bg-gray-800" />
                  <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-800" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="animate-pulse rounded-3xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-[#111]">
                <div className="mb-6 h-8 w-40 rounded bg-gray-200 dark:bg-gray-800" />

                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="mb-4 flex gap-4 border-b border-gray-200 pb-4 dark:border-white/10"
                  >
                    <div className="h-20 w-22 rounded bg-gray-200 dark:bg-gray-800" />

                    <div className="flex-1">
                      <div className="mb-2 h-3 w-24 rounded bg-gray-200 dark:bg-gray-800" />
                      <div className="mb-2 h-4 rounded bg-gray-200 dark:bg-gray-800" />
                      <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-800" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ============================================================
     ERROR
  ============================================================ */

  if (isError || !blogs) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-[#f7f7f8] px-4 dark:bg-[#080808]">
        <div className="text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-white/5">
            <FiFileText size={25} />
          </div>

          <h2 className="text-2xl font-black text-gray-900 dark:text-white">
            Blog not found
          </h2>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            The article you are looking for does not exist or has been removed.
          </p>

          <Link
            href="/blog"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#ffd83d] px-5 py-3 text-xs font-extrabold text-black transition hover:bg-[#f5cb22]"
          >
            <FiArrowLeft size={14} />
            Back to Blog
          </Link>
        </div>
      </section>
    );
  }

  /* ============================================================
     DATE
  ============================================================ */

  const date = formatDate(blogs.createdAt);

  /* ============================================================
     CATEGORY
  ============================================================ */

  const categoryName = getCategoryName(blogs.category) || "General";

  /* ============================================================
     TAGS
  ============================================================ */

  const blogTags = normalizeTags(blogs.tags);

  /* ============================================================
     RELATED BLOGS
  ============================================================ */

  const relatedBlogs = recentPosts
    .filter((post) => String(post._id) !== String(blogs._id))
    .slice(0, 3);

  /* ============================================================
     CURRENT URL
  ============================================================ */

  const getCurrentUrl = (): string => {
    if (typeof window === "undefined") {
      return "";
    }

    return window.location.href;
  };

  /* ============================================================
     SHARE
  ============================================================ */

  const shareFacebook = () => {
    if (typeof window === "undefined") return;

    const currentUrl = getCurrentUrl();

    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        currentUrl,
      )}`,
      "_blank",
      "width=600,height=500",
    );
  };

  const shareTwitter = () => {
    if (typeof window === "undefined") return;

    const currentUrl = getCurrentUrl();

    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        currentUrl,
      )}&text=${encodeURIComponent(blogs.title ?? "")}`,
      "_blank",
      "width=600,height=500",
    );
  };

  const shareLinkedIn = () => {
    if (typeof window === "undefined") return;

    const currentUrl = getCurrentUrl();

    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        currentUrl,
      )}`,
      "_blank",
      "width=600,height=500",
    );
  };

  /* ============================================================
     MAIN
  ============================================================ */

  return (
    <main className="min-h-screen bg-[#f7f7f8] py-8 transition-colors duration-300 dark:bg-[#080808] sm:py-10 lg:py-14">
      <div className="mx-auto w-full max-w-300 px-4 sm:px-6 lg:px-8">
        {/* BACK */}

        <Link
          href="/blog"
          className="mb-6 inline-flex items-center gap-2 text-xs font-bold text-gray-500 transition hover:text-[#b18d00] dark:text-gray-400 dark:hover:text-[#ffd83d]"
        >
          <FiArrowLeft size={15} />
          Back to Blog
        </Link>

        {/* HEADER */}

        <header className="mx-auto mb-8 max-w-237.5 text-center">
          {/* CATEGORY */}

          <span className="inline-flex rounded-full bg-[#fff3bd] px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#967600] dark:bg-[#ffd83d]/10 dark:text-[#ffd83d]">
            {categoryName}
          </span>

          {/* TITLE */}

          <h1 className="mt-5 text-3xl font-black leading-tight tracking-tight text-gray-950 dark:text-white sm:text-4xl lg:text-5xl lg:leading-[1.12]">
            {blogs.title ?? "Untitled Blog"}
          </h1>

          {/* SHORT DESCRIPTION */}

          {blogs.shortDesc && (
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-500 dark:text-gray-400 sm:text-base">
              {blogs.shortDesc}
            </p>
          )}

          {/* META */}

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-xs font-medium text-gray-400 dark:text-gray-500">
            {blogs.author && (
              <span className="flex items-center gap-1.5">
                <FiUser size={14} />
                {blogs.author}
              </span>
            )}

            {date && (
              <span className="flex items-center gap-1.5">
                <FiCalendar size={14} />
                {date}
              </span>
            )}
          </div>
        </header>

        {/* HERO IMAGE */}

        {blogs.image && (
          <div className="relative mb-8 h-70 overflow-hidden rounded-3xl bg-gray-100 sm:h-100 lg:h-130 dark:bg-[#111]">
            <Image
              src={blogs.image}
              alt={blogs.title ?? "Blog image"}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent" />
          </div>
        )}

        {/* MAIN GRID */}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_280px]">
          {/* ARTICLE */}

          <article className="rounded-3xl border border-gray-200 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)] dark:border-white/10 dark:bg-[#111111] dark:shadow-none sm:p-7 lg:p-9">
            <div className="space-y-6 text-[15px] leading-8 text-gray-600 dark:text-gray-300">
              {/* SHORT DESCRIPTION */}

              {blogs.shortDesc && (
                <p className="text-base font-medium leading-8 text-gray-700 dark:text-gray-300">
                  {blogs.shortDesc}
                </p>
              )}

              {/* DESCRIPTION */}

              {blogs.description && (
                <>
                  <h2 className="pt-2 text-2xl font-black leading-tight text-gray-950 dark:text-white">
                    {blogs.title ?? "About This Article"}
                  </h2>

                  <div className="space-y-5">
                    {blogs.description
                      .split(/\n+/)
                      .filter(Boolean)
                      .map((paragraph, index) => (
                        <p key={`${paragraph}-${index}`}>{paragraph}</p>
                      ))}
                  </div>
                </>
              )}

              {/* QUICK TIPS */}

              {blogs.QuickTips && (
                <div className="rounded-2xl border border-[#f0d770] bg-[#fffbea] p-5 dark:border-[#ffd83d]/20 dark:bg-[#ffd83d]/5">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ffd83d] text-black">
                      <FiShare2 size={14} />
                    </div>

                    <p className="text-sm font-bold leading-6 text-gray-800 dark:text-gray-200">
                      Quick Tip
                    </p>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
                    {blogs.QuickTips}
                  </p>
                </div>
              )}

              {/* BLACK QUOTE */}

              {blogs.blackQuote && (
                <blockquote className="relative overflow-hidden rounded-2xl bg-gray-950 px-6 py-7 text-white dark:bg-[#1a1a1a]">
                  <div className="absolute left-0 top-0 h-full w-1.5 bg-[#ffd83d]" />

                  <p className="text-lg font-bold leading-8 sm:text-xl">
                    “{blogs.blackQuote}”
                  </p>
                </blockquote>
              )}

              {/* KEY POINTS */}

              {/* TAGS */}

              {blogTags.length > 0 && (
                <div className="mt-8 border-t border-gray-100 pt-6 dark:border-white/10">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="mr-1 text-xs font-extrabold text-gray-800 dark:text-gray-200">
                      Tags:
                    </span>

                    {blogTags.map((tag, index) => (
                      <span
                        key={`${tag}-${index}`}
                        className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-[11px] font-bold text-gray-500 dark:border-white/10 dark:bg-white/3 dark:text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* SHARE */}

              <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-gray-50 p-4 dark:bg-white/3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <FiShare2
                    size={16}
                    className="text-gray-500 dark:text-gray-400"
                  />

                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                    Share this article
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Share on Facebook"
                    onClick={shareFacebook}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition hover:border-[#ffd83d] hover:bg-[#ffd83d] hover:text-black dark:border-white/10 dark:bg-[#151515] dark:text-gray-400"
                  >
                    <FiFacebook size={14} />
                  </button>

                  <button
                    type="button"
                    aria-label="Share on Twitter"
                    onClick={shareTwitter}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition hover:border-[#ffd83d] hover:bg-[#ffd83d] hover:text-black dark:border-white/10 dark:bg-[#151515] dark:text-gray-400"
                  >
                    <FiTwitter size={14} />
                  </button>

                  <button
                    type="button"
                    aria-label="Share on LinkedIn"
                    onClick={shareLinkedIn}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition hover:border-[#ffd83d] hover:bg-[#ffd83d] hover:text-black dark:border-white/10 dark:bg-[#151515] dark:text-gray-400"
                  >
                    <FiLinkedin size={14} />
                  </button>
                </div>
              </div>

              {/* AUTHOR */}

              <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-gray-200 p-5 dark:border-white/10 sm:flex-row sm:items-center">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-gray-100 dark:bg-white/5">
                  {blogs.writtenByImage ? (
                    <Image
                      src={blogs.writtenByImage}
                      alt={blogs.writtenBy ?? blogs.author ?? "Author"}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-gray-400">
                      <FiUser size={24} />
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-gray-400">
                    Written By
                  </p>

                  <h3 className="mt-1 text-base font-black text-gray-950 dark:text-white">
                    {blogs.writtenBy ?? blogs.author ?? "Admin"}
                  </h3>

                  {blogs.writtenByDesc && (
                    <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-gray-400">
                      {blogs.writtenByDesc}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </article>

          {/* SIDEBAR */}

          <aside className="space-y-5">
            {/* ARTICLE INFO */}

            <div className="rounded-[22px] border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#111111]">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#997900] dark:text-[#ffd83d]">
                Article Info
              </p>

              <div className="mt-4 space-y-4">
                {/* AUTHOR */}

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-gray-500 dark:bg-white/5 dark:text-gray-400">
                    <FiUser size={15} />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold text-gray-400">
                      Author
                    </p>

                    <p className="text-xs font-bold text-gray-800 dark:text-gray-200">
                      {blogs.author ?? blogs.writtenBy ?? "Admin"}
                    </p>
                  </div>
                </div>

                {/* PUBLISHED */}

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-gray-500 dark:bg-white/5 dark:text-gray-400">
                    <FiCalendar size={15} />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold text-gray-400">
                      Published
                    </p>

                    {date && (
                      <span className="flex items-center gap-1.5">
                        <FiCalendar size={14} />
                        {date}
                      </span>
                    )}
                  </div>
                </div>

                {/* CATEGORY */}

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-gray-500 dark:bg-white/5 dark:text-gray-400">
                    #
                  </div>

                  <div>
                    <p className="text-[10px] font-bold text-gray-400">
                      Category
                    </p>

                    <p className="text-xs font-bold text-gray-800 dark:text-gray-200">
                      {categoryName}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* RELATED POSTS */}

        {relatedBlogs.length > 0 && (
          <section className="mt-12">
            <div className="mb-6">
              <div className="mb-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#ffd83d]" />

                <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#997900] dark:text-[#ffd83d]">
                  Keep Reading
                </span>
              </div>

              <h2 className="text-2xl font-black text-gray-950 dark:text-white">
                Related Articles
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedBlogs.map((post) => {
                const postDate = formatDate(post.createdAt);

                const postCategory =
                  getCategoryName(post.category) || "Article";

                return (
                  <article
                    key={post._id}
                    className="group overflow-hidden rounded-[20px] border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-[#111111]"
                  >
                    {/* IMAGE */}

                    <Link
                      href={`/blog/${post._id}`}
                      className="relative block h-47.5 overflow-hidden bg-gray-100 dark:bg-[#151515]"
                    >
                      {post.image && (
                        <Image
                          src={post.image}
                          alt={post.title ?? "Related article"}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}

                      <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[9px] font-extrabold text-gray-800 shadow-sm dark:bg-black/80 dark:text-white">
                        {postCategory}
                      </span>
                    </Link>

                    {/* CONTENT */}

                    <div className="p-5">
                      {postDate && (
                        <p className="flex items-center gap-1.5 text-[10px] font-medium text-gray-400">
                          <FiCalendar size={12} />
                          {date}
                        </p>
                      )}

                      <Link href={`/blog/${post._id}`}>
                        <h3 className="mt-2 line-clamp-2 text-base font-black leading-6 text-gray-950 transition group-hover:text-[#a48200] dark:text-white dark:group-hover:text-[#ffd83d]">
                          {post.title ?? "Untitled Article"}
                        </h3>
                      </Link>

                      {post.shortDesc && (
                        <p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-500 dark:text-gray-400">
                          {post.shortDesc}
                        </p>
                      )}

                      <Link
                        href={`/blog/${post._id}`}
                        className="mt-4 inline-flex items-center gap-1.5 text-xs font-extrabold text-gray-900 transition hover:text-[#a48200] dark:text-white dark:hover:text-[#ffd83d]"
                      >
                        Read Article
                        <FiArrowRight size={13} />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default BlogDetails;
