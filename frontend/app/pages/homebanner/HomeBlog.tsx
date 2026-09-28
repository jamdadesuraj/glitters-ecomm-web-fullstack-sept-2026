"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

type BlogItem = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  href: string;
};

const blogs: BlogItem[] = [
  {
    id: 1,
    title: "How to Choose the Right Phone Accessories",
    excerpt: "Tips to get the most out of your devices.",
    date: "05 Apr 2024",
    image: "/img/blog/blog-1.png",
    href: "/blog/how-to-choose-phone-accessories",
  },
  {
    id: 2,
    title: "The Importance of Device Protection",
    excerpt: "Keep your tech safe and stylish.",
    date: "28 Mar 2024",
    image: "/img/blog/blog-2.png",
    href: "/blog/device-protection",
  },
  {
    id: 3,
    title: "Wireless Accessories: The Future is Here",
    excerpt: "Explore the latest trends in wireless tech.",
    date: "12 Mar 2024",
    image: "/img/blog/blog-3.png",
    href: "/blog/wireless-accessories",
  },
];

const HomeBlog = () => {
  return (
    <section className="w-full bg-white py-5 dark:bg-[#111]">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        {/* HEADER */}

        <div className="mb-3 flex items-center justify-between gap-4">
          <div>
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
              Blog & Article
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Explore the latest tech news, buying guides, tips, and expert
              insights.
            </p>
          </div>
          <Link
            href="/blog"
            className="
              flex
              shrink-0
              items-center
              gap-1.5
              text-[9px]
              font-bold
              text-black
              transition
              hover:text-[#b58b00]
              sm:text-[12px] bg-yellow-200 py-2 px-4 rounded-full
            "
          >
            View All Articles
            <FiArrowRight size={12} />
          </Link>
        </div>

        {/* BLOGS */}
        <div
          className="
            no-scrollbar
            flex
            gap-3
            overflow-x-auto
            pb-1

            lg:grid
            lg:grid-cols-3
            lg:overflow-visible
          "
        >
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
};

const BlogCard = ({ blog }: { blog: BlogItem }) => {
  return (
    <Link
      href={blog.href}
      className="
        group
        flex
        min-h-20.5
        w-77.5
        shrink-0
        overflow-hidden
        rounded-xl
        border
        border-[#ededed]
        bg-white
        p-1
        transition-all
        duration-300

        hover:border-[#ffe178]
        hover:shadow-[0_6px_20px_rgba(0,0,0,0.05)]

        sm:w-90
        md:w-100

        lg:w-auto

        dark:border-gray-800
        dark:bg-[#171717]
      "
    >
      {/* IMAGE */}
      <div
        className="
          relative
          h-18.5
          w-25
          shrink-0
          overflow-hidden
          rounded-lg
          bg-[#f5f5f5]

          sm:w-27.5
        "
      >
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          sizes="110px"
          className="
            object-cover
            object-center
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />
      </div>

      {/* CONTENT */}
      <div
        className="
          flex
          min-w-0
          flex-1
          flex-col
          justify-center
          px-3
          py-1
        "
      >
        {/* DATE */}
        <span
          className="
            text-[8px]
            font-medium
            text-gray-400
            sm:text-[9px]
          "
        >
          {blog.date}
        </span>

        {/* TITLE */}
        <h3
          className="
            mt-1
            line-clamp-1
            font-serif
            text-[10px]
            font-extrabold
            leading-3.5
            text-[#1c1c1c]
            transition
            group-hover:text-[#b58b00]

            sm:text-[12px]

            dark:text-white
          "
        >
          {blog.title}
        </h3>

        {/* DESCRIPTION */}
        <p
          className="
            mt-1
            line-clamp-1
            text-[8px]
            leading-3.25
            text-gray-500

            sm:text-[9px]
          "
        >
          {blog.excerpt}
        </p>
      </div>
    </Link>
  );
};

export default HomeBlog;
