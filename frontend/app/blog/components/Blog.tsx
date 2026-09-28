import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiArrowRight, FiCalendar, FiClock, FiUser } from "react-icons/fi";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "How to Choose the Right Products for Your Lifestyle",
    excerpt:
      "Discover simple tips to select the right products based on your needs, budget and everyday lifestyle.",
    image: "/img/blog/blog-1.jpg",
    category: "Shopping Guide",
    author: "Admin",
    date: "25 Sep 2026",
    readTime: "5 min read",
    slug: "choose-right-products",
  },
  {
    id: 2,
    title: "Top Shopping Trends You Should Know in 2026",
    excerpt:
      "Explore the latest shopping trends, popular categories and changing customer preferences this year.",
    image: "/img/blog/blog-2.jpg",
    category: "Trends",
    author: "Admin",
    date: "22 Sep 2026",
    readTime: "4 min read",
    slug: "shopping-trends-2026",
  },
  {
    id: 3,
    title: "Simple Ways to Save More While Shopping Online",
    excerpt:
      "Use these practical tips to find better deals, compare products and save money on your online purchases.",
    image: "/img/blog/blog-3.jpg",
    category: "Tips & Advice",
    author: "Admin",
    date: "20 Sep 2026",
    readTime: "6 min read",
    slug: "save-money-online-shopping",
  },
  {
    id: 4,
    title: "Why Customer Reviews Matter Before You Buy",
    excerpt:
      "Learn how genuine customer feedback can help you make better and more confident purchase decisions.",
    image: "/img/blog/blog-4.jpg",
    category: "Buying Guide",
    author: "Admin",
    date: "18 Sep 2026",
    readTime: "3 min read",
    slug: "customer-reviews-before-buying",
  },
  {
    id: 5,
    title: "How to Find Trusted Stores Near You",
    excerpt:
      "A quick guide to identifying reliable local stores and choosing businesses you can confidently shop from.",
    image: "/img/blog/blog-5.jpg",
    category: "Stores",
    author: "Admin",
    date: "15 Sep 2026",
    readTime: "5 min read",
    slug: "find-trusted-stores",
  },
  {
    id: 6,
    title: "Best Ways to Compare Products Before Purchasing",
    excerpt:
      "Compare features, pricing, reviews and value to make smarter purchasing decisions every time.",
    image: "/img/blog/blog-6.jpg",
    category: "Comparison",
    author: "Admin",
    date: "12 Sep 2026",
    readTime: "4 min read",
    slug: "compare-products-before-purchase",
  },
];

const Blog = () => {
  return (
    <main className="min-h-screen bg-[#f7f7f8] py-8 transition-colors duration-300 dark:bg-[#080808] sm:py-10 lg:py-14">
      <div className="mx-auto w-full max-w-350 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 border-b border-gray-200 pb-6 dark:border-white/10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#ffd83d]" />

              <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#a98400] dark:text-[#ffd83d]">
                Latest Articles
              </span>
            </div>

            <h1 className="text-2xl font-black font-serif tracking-tight text-gray-950 dark:text-white sm:text-3xl lg:text-[34px]">
              Blog & Articles
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 dark:text-gray-400">
              Discover useful guides, shopping tips, product insights and the
              latest trends.
            </p>
          </div>

          <div className="rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-bold text-gray-500 shadow-sm dark:border-white/10 dark:bg-[#111111] dark:text-gray-400">
            {blogPosts.length} Articles
          </div>
        </div>

        {/* Featured Blog */}
        <section className="mb-8">
          <Link
            href={`/blog/${blogPosts[0].id}`}
            className="group grid overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition hover:shadow-[0_14px_40px_rgba(15,23,42,0.09)] dark:border-white/10 dark:bg-[#111111] dark:shadow-none lg:grid-cols-[1.15fr_0.85fr]"
          >
            <div className="relative min-h-70 overflow-hidden bg-gray-100 sm:min-h-82.5">
              <Image
                src={blogPosts[0].image}
                alt={blogPosts[0].title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />

              <span className="absolute left-5 top-5 rounded-full bg-[#ffd83d] px-3 py-1.5 text-[11px] font-extrabold text-black">
                Featured
              </span>
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <span className="w-fit rounded-full bg-[#fff6cd] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#9a7900] dark:bg-[#ffd83d]/10 dark:text-[#ffd83d]">
                {blogPosts[0].category}
              </span>

              <h2 className="mt-4 text-2xl font-black leading-tight text-gray-950 transition group-hover:text-[#b18d00] dark:text-white dark:group-hover:text-[#ffd83d] sm:text-3xl">
                {blogPosts[0].title}
              </h2>

              <p className="mt-4 text-sm leading-7 text-gray-500 dark:text-gray-400">
                {blogPosts[0].excerpt}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-gray-400 dark:text-gray-500">
                <span className="flex items-center gap-1.5">
                  <FiUser size={14} />
                  {blogPosts[0].author}
                </span>

                <span className="flex items-center gap-1.5">
                  <FiCalendar size={14} />
                  {blogPosts[0].date}
                </span>

                <span className="flex items-center gap-1.5">
                  <FiClock size={14} />
                  {blogPosts[0].readTime}
                </span>
              </div>

              <div className="mt-7 flex items-center gap-2 text-sm font-extrabold text-gray-950 dark:text-white">
                Read Article
                <FiArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        </section>

        {/* Blog Grid */}
        <section>
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-gray-950 dark:text-white sm:text-2xl">
                Latest Posts
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Explore our latest stories and helpful guides.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {blogPosts.slice(1).map((post) => (
              <article
                key={post.id}
                className="group overflow-hidden rounded-[22px] border border-gray-200 bg-white shadow-[0_5px_20px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-[0_12px_35px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-[#111111] dark:shadow-none dark:hover:border-white/20"
              >
                <Link
                  href={`/blog/${post.id}`}
                  className="relative block h-55 overflow-hidden bg-gray-100"
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />

                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-extrabold text-gray-800 shadow-sm backdrop-blur dark:bg-black/75 dark:text-white">
                    {post.category}
                  </span>
                </Link>

                <div className="p-5">
                  <div className="mb-3 flex flex-wrap items-center gap-3 text-[11px] font-medium text-gray-400 dark:text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <FiCalendar size={13} />
                      {post.date}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <FiClock size={13} />
                      {post.readTime}
                    </span>
                  </div>

                  <Link href={`/blog/${post.id}`}>
                    <h3 className="line-clamp-2 text-lg font-black leading-6 text-gray-950 transition-colors group-hover:text-[#b18d00] dark:text-white dark:group-hover:text-[#ffd83d]">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
                    {post.excerpt}
                  </p>

                  <div className="my-4 h-px bg-gray-100 dark:bg-white/10" />

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-white/5 dark:text-gray-400">
                        <FiUser size={14} />
                      </div>

                      <span className="text-xs font-bold text-gray-600 dark:text-gray-400">
                        {post.author}
                      </span>
                    </div>

                    <Link
                      href={`/blog/${post.id}`}
                      className="flex items-center gap-1.5 text-xs font-extrabold text-gray-950 transition hover:text-[#b18d00] dark:text-white dark:hover:text-[#ffd83d]"
                    >
                      Read More
                      <FiArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Blog;
