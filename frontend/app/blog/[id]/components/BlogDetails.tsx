import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCalendar,
  FiClock,
  FiFacebook,
  FiLinkedin,
  FiShare2,
  FiTwitter,
  FiUser,
} from "react-icons/fi";

const relatedPosts = [
  {
    id: 1,
    title: "Top Shopping Trends You Should Know in 2026",
    image: "/img/blog/blog-2.jpg",
    category: "Trends",
    date: "22 Sep 2026",
    slug: "shopping-trends-2026",
  },
  {
    id: 2,
    title: "Simple Ways to Save More While Shopping Online",
    image: "/img/blog/blog-3.jpg",
    category: "Tips & Advice",
    date: "20 Sep 2026",
    slug: "save-money-online-shopping",
  },
  {
    id: 3,
    title: "Why Customer Reviews Matter Before You Buy",
    image: "/img/blog/blog-4.jpg",
    category: "Buying Guide",
    date: "18 Sep 2026",
    slug: "customer-reviews-before-buying",
  },
];

const BlogDetails = () => {
  return (
    <main className="min-h-screen bg-[#f7f7f8] py-8 transition-colors duration-300 dark:bg-[#080808] sm:py-10 lg:py-14">
      <div className="mx-auto w-full max-w-300 px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <Link
          href="/blog"
          className="mb-6 inline-flex items-center gap-2 text-xs font-bold text-gray-500 transition hover:text-[#b18d00] dark:text-gray-400 dark:hover:text-[#ffd83d]"
        >
          <FiArrowLeft size={15} />
          Back to Blog
        </Link>

        {/* Article Header */}
        <header className="mx-auto mb-8 max-w-237.5 text-center">
          <span className="inline-flex rounded-full bg-[#fff3bd] px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#967600] dark:bg-[#ffd83d]/10 dark:text-[#ffd83d]">
            Shopping Guide
          </span>

          <h1 className="mt-5 text-3xl font-black leading-tight tracking-tight text-gray-950 dark:text-white sm:text-4xl lg:text-5xl lg:leading-[1.12]">
            How to Choose the Right Products for Your Lifestyle
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-500 dark:text-gray-400 sm:text-base">
            Discover practical tips to help you select products that suit your
            needs, budget and everyday lifestyle.
          </p>

          {/* Meta */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-xs font-medium text-gray-400 dark:text-gray-500">
            <span className="flex items-center gap-1.5">
              <FiUser size={14} />
              Admin
            </span>

            <span className="flex items-center gap-1.5">
              <FiCalendar size={14} />
              25 Sep 2026
            </span>

            <span className="flex items-center gap-1.5">
              <FiClock size={14} />5 min read
            </span>
          </div>
        </header>

        {/* Hero Image */}
        <div className="relative mb-8 h-70 overflow-hidden rounded-3xl bg-gray-100 sm:h-100 lg:h-130">
          <Image
            src="/img/blog/blog-1.jpg"
            alt="How to Choose the Right Products for Your Lifestyle"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_280px]">
          {/* ARTICLE */}
          <article className="rounded-3xl border border-gray-200 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)] dark:border-white/10 dark:bg-[#111111] dark:shadow-none sm:p-7 lg:p-9">
            <div className="space-y-6 text-[15px] leading-8 text-gray-600 dark:text-gray-300">
              <p>
                Choosing the right product can often feel confusing because
                there are so many brands, features and price options available.
                The best approach is to focus on what you actually need rather
                than simply choosing the most expensive or popular option.
              </p>

              <p>
                Before making any purchase, think about how the product will fit
                into your daily routine. A product that looks impressive may not
                always be practical for your lifestyle.
              </p>

              <h2 className="pt-2 text-2xl font-black leading-tight text-gray-950 dark:text-white">
                1. Understand Your Requirements
              </h2>

              <p>
                Start by identifying the main reason you are purchasing the
                product. Make a short list of must-have features and separate
                them from optional features.
              </p>

              <div className="rounded-2xl border border-[#f0d770] bg-[#fffbea] p-5 dark:border-[#ffd83d]/20 dark:bg-[#ffd83d]/5">
                <p className="text-sm font-bold leading-6 text-gray-800 dark:text-gray-200">
                  Quick Tip
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                  Focus on the features you will actually use. Paying extra for
                  unnecessary features usually provides little additional value.
                </p>
              </div>

              <h2 className="pt-2 text-2xl font-black leading-tight text-gray-950 dark:text-white">
                2. Set a Realistic Budget
              </h2>

              <p>
                Decide your spending range before you start comparing products.
                Having a clear budget makes it easier to narrow down the
                available choices and prevents impulse purchases.
              </p>

              <p>
                Instead of automatically selecting the cheapest option, compare
                quality, durability, warranty and long-term value.
              </p>

              {/* Quote */}
              <blockquote className="relative overflow-hidden rounded-2xl bg-gray-950 px-6 py-7 text-white dark:bg-[#1a1a1a]">
                <div className="absolute left-0 top-0 h-full w-1.5 bg-[#ffd83d]" />

                <p className="text-lg font-bold leading-8 sm:text-xl">
                  “The best product is not always the most expensive one. It is
                  the product that solves your actual problem effectively.”
                </p>
              </blockquote>

              <h2 className="pt-2 text-2xl font-black leading-tight text-gray-950 dark:text-white">
                3. Compare Products Carefully
              </h2>

              <p>
                Once you have shortlisted a few products, compare them based on
                specifications, pricing, quality and customer feedback.
              </p>

              <ul className="space-y-3">
                {[
                  "Compare important product features",
                  "Check pricing across multiple stores",
                  "Read verified customer reviews",
                  "Review warranty and return policies",
                  "Check after-sales support",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl bg-gray-50 px-4 py-3 dark:bg-white/3"
                  >
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#ffd83d]" />

                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h2 className="pt-2 text-2xl font-black leading-tight text-gray-950 dark:text-white">
                4. Read Customer Reviews
              </h2>

              <p>
                Reviews can provide useful information about real-world product
                performance. Pay attention to repeated comments about quality,
                durability and customer service.
              </p>

              <p>
                Avoid making a decision based on one extremely positive or
                negative review. Look for patterns across multiple reviews.
              </p>

              <h2 className="pt-2 text-2xl font-black leading-tight text-gray-950 dark:text-white">
                5. Think About Long-Term Value
              </h2>

              <p>
                A slightly more expensive product may provide better long-term
                value if it lasts longer, includes better support or offers a
                stronger warranty.
              </p>

              <p>
                Taking a few extra minutes to research and compare your options
                can help you make a more confident purchase decision.
              </p>
            </div>

            {/* Tags */}
            <div className="mt-8 border-t border-gray-100 pt-6 dark:border-white/10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="mr-1 text-xs font-extrabold text-gray-800 dark:text-gray-200">
                  Tags:
                </span>

                {["Shopping", "Buying Guide", "Products", "Tips"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-[11px] font-bold text-gray-500 dark:border-white/10 dark:bg-white/3 dark:text-gray-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Share */}
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
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition hover:border-[#ffd83d] hover:bg-[#ffd83d] hover:text-black dark:border-white/10 dark:bg-[#151515] dark:text-gray-400"
                >
                  <FiFacebook size={14} />
                </button>

                <button
                  type="button"
                  aria-label="Share on Twitter"
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition hover:border-[#ffd83d] hover:bg-[#ffd83d] hover:text-black dark:border-white/10 dark:bg-[#151515] dark:text-gray-400"
                >
                  <FiTwitter size={14} />
                </button>

                <button
                  type="button"
                  aria-label="Share on LinkedIn"
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition hover:border-[#ffd83d] hover:bg-[#ffd83d] hover:text-black dark:border-white/10 dark:bg-[#151515] dark:text-gray-400"
                >
                  <FiLinkedin size={14} />
                </button>
              </div>
            </div>

            {/* Author */}
            <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-gray-200 p-5 dark:border-white/10 sm:flex-row sm:items-center">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-gray-100">
                <Image
                  src="/img/user-placeholder.jpg"
                  alt="Author"
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>

              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-gray-400">
                  Written By
                </p>

                <h3 className="mt-1 text-base font-black text-gray-950 dark:text-white">
                  Admin
                </h3>

                <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-gray-400">
                  Sharing helpful shopping guides, product insights and
                  practical advice to help customers make better buying
                  decisions.
                </p>
              </div>
            </div>
          </article>

          {/* SIDEBAR */}
          <aside className="space-y-5">
            {/* Article Info */}
            <div className="rounded-[22px] border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#111111]">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#997900] dark:text-[#ffd83d]">
                Article Info
              </p>

              <div className="mt-4 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-gray-500 dark:bg-white/5 dark:text-gray-400">
                    <FiUser size={15} />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold text-gray-400">
                      Author
                    </p>
                    <p className="text-xs font-bold text-gray-800 dark:text-gray-200">
                      Admin
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-gray-500 dark:bg-white/5 dark:text-gray-400">
                    <FiCalendar size={15} />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold text-gray-400">
                      Published
                    </p>
                    <p className="text-xs font-bold text-gray-800 dark:text-gray-200">
                      25 Sep 2026
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-gray-500 dark:bg-white/5 dark:text-gray-400">
                    <FiClock size={15} />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold text-gray-400">
                      Reading Time
                    </p>
                    <p className="text-xs font-bold text-gray-800 dark:text-gray-200">
                      5 Minutes
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="rounded-[22px] border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#111111]">
              <h3 className="text-base font-black text-gray-950 dark:text-white">
                Categories
              </h3>

              <div className="mt-4 space-y-2">
                {[
                  "Shopping Guide",
                  "Buying Guide",
                  "Tips & Advice",
                  "Product Trends",
                ].map((category) => (
                  <Link
                    key={category}
                    href="/blog"
                    className="flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold text-gray-600 transition hover:bg-[#fff7d5] hover:text-[#997900] dark:text-gray-400 dark:hover:bg-[#ffd83d]/5 dark:hover:text-[#ffd83d]"
                  >
                    {category}
                    <FiArrowRight size={13} />
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Related Posts */}
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
            {relatedPosts.map((post) => (
              <article
                key={post.id}
                className="group overflow-hidden rounded-[20px] border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-[#111111]"
              >
                <Link
                  href={`/blog/${post.id}`}
                  className="relative block h-47.5 overflow-hidden bg-gray-100"
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[9px] font-extrabold text-gray-800 shadow-sm dark:bg-black/80 dark:text-white">
                    {post.category}
                  </span>
                </Link>

                <div className="p-5">
                  <p className="flex items-center gap-1.5 text-[10px] font-medium text-gray-400">
                    <FiCalendar size={12} />
                    {post.date}
                  </p>

                  <Link href={`/blog/${post.id}`}>
                    <h3 className="mt-2 line-clamp-2 text-base font-black leading-6 text-gray-950 transition group-hover:text-[#a48200] dark:text-white dark:group-hover:text-[#ffd83d]">
                      {post.title}
                    </h3>
                  </Link>

                  <Link
                    href={`/blog/${post.id}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-extrabold text-gray-900 transition hover:text-[#a48200] dark:text-white dark:hover:text-[#ffd83d]"
                  >
                    Read Article
                    <FiArrowRight size={13} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default BlogDetails;
