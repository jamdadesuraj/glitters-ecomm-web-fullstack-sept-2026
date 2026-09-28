"use client";

import React, { useMemo, useState } from "react";

import {
  FiChevronDown,
  FiHelpCircle,
  FiMessageCircle,
  FiSearch,
  FiShoppingBag,
  FiTruck,
  FiCreditCard,
  FiRefreshCw,
  FiShield,
  FiPackage,
} from "react-icons/fi";
import ThemeBtnOne from "@/app/components/ThemeBtnOne";

type FaqCategory =
  | "all"
  | "orders"
  | "shipping"
  | "payments"
  | "returns"
  | "products";

type FaqItem = {
  id: number;
  category: Exclude<FaqCategory, "all">;
  question: string;
  answer: string;
};

const categories: {
  id: FaqCategory;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "all",
    label: "All",
    icon: <FiHelpCircle size={13} />,
  },
  {
    id: "orders",
    label: "Orders",
    icon: <FiShoppingBag size={13} />,
  },
  {
    id: "shipping",
    label: "Shipping",
    icon: <FiTruck size={13} />,
  },
  {
    id: "payments",
    label: "Payments",
    icon: <FiCreditCard size={13} />,
  },
  {
    id: "returns",
    label: "Returns",
    icon: <FiRefreshCw size={13} />,
  },
  {
    id: "products",
    label: "Products",
    icon: <FiPackage size={13} />,
  },
];

const faqItems: FaqItem[] = [
  {
    id: 1,
    category: "orders",
    question: "How can I place an order?",
    answer:
      "Choose your product, select the required options, add it to your cart and proceed to checkout. Enter your shipping details, choose a payment method and complete your order.",
  },
  {
    id: 2,
    category: "orders",
    question: "How can I track my order?",
    answer:
      "You can track your order from the My Orders section in your account. Once your order has been shipped, tracking information will be available there.",
  },
  {
    id: 3,
    category: "orders",
    question: "Can I cancel my order?",
    answer:
      "Orders can usually be cancelled before they are shipped. Open your order details and check whether the cancellation option is still available.",
  },
  {
    id: 4,
    category: "shipping",
    question: "How long does delivery take?",
    answer:
      "Standard delivery generally takes 2 to 4 business days depending on your location, product availability and courier service.",
  },
  {
    id: 5,
    category: "shipping",
    question: "Do you offer free shipping?",
    answer:
      "Free shipping may be available when your order reaches the required minimum order value. Any applicable shipping charge is shown during checkout.",
  },
  {
    id: 6,
    category: "shipping",
    question: "Can I change my delivery address?",
    answer:
      "You may change the delivery address before the order has been dispatched. Once shipped, address changes may no longer be possible.",
  },
  {
    id: 7,
    category: "payments",
    question: "Which payment methods do you accept?",
    answer:
      "Available payment options may include credit or debit cards, UPI, Razorpay, Tabby, Apple Pay and Cash on Delivery depending on your order and location.",
  },
  {
    id: 8,
    category: "payments",
    question: "Is my payment information secure?",
    answer:
      "Payment transactions are processed through secure payment systems. Sensitive payment information should be handled by the selected payment provider.",
  },
  {
    id: 9,
    category: "payments",
    question: "Why did my payment fail?",
    answer:
      "A payment may fail because of insufficient funds, incorrect payment details, bank restrictions or a temporary payment gateway issue. Try again or use another payment method.",
  },
  {
    id: 10,
    category: "returns",
    question: "How do I return a product?",
    answer:
      "Go to your order details, select the eligible product and submit a return request. Follow the instructions shown for pickup or return shipping.",
  },
  {
    id: 11,
    category: "returns",
    question: "When will I receive my refund?",
    answer:
      "Refund processing time depends on the original payment method. Once approved, the refund may take several business days to appear in your account.",
  },
  {
    id: 12,
    category: "returns",
    question: "Can I exchange a product?",
    answer:
      "Eligible products may be exchanged depending on stock availability and the applicable return or exchange policy.",
  },
  {
    id: 13,
    category: "products",
    question: "Are all products original?",
    answer:
      "Products listed on the store are intended to be genuine products sourced through authorised or verified supply channels.",
  },
  {
    id: 14,
    category: "products",
    question: "How can I check product warranty?",
    answer:
      "Warranty information can be shown on the product detail page. Warranty coverage may vary depending on the product, brand and seller.",
  },
];

const Faq = () => {
  const [activeCategory, setActiveCategory] = useState<FaqCategory>("all");

  const [search, setSearch] = useState("");

  const [openId, setOpenId] = useState<number | null>(1);

  const filteredFaqs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return faqItems.filter((item) => {
      const categoryMatch =
        activeCategory === "all" || item.category === activeCategory;

      const searchMatch =
        !query ||
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query);

      return categoryMatch && searchMatch;
    });
  }, [activeCategory, search]);

  return (
    <main
      className="
        min-h-screen
        bg-[#f7f7f8]
        py-4
        sm:py-6
        lg:py-8
        dark:bg-[#0f0f0f]
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-375
          px-3
          sm:px-5
          lg:px-8
          xl:px-10
        "
      >
        {/* HERO */}
        <section
          className="
            relative
            overflow-hidden
            rounded-2xl
            border
            border-gray-200
            bg-white
            px-4
            py-7
            text-center
            sm:px-6
            sm:py-9
            lg:py-11
            dark:border-gray-800
            dark:bg-[#181818]
          "
        >
          <div
            className="
              absolute
              left-1/2
              -top-25
              h-65
              w-65
              -translate-x-1/2
              rounded-full
              bg-[#ffd83d]/15
              blur-3xl
            "
          />

          <div className="relative mx-auto max-w-175">
            <div
              className="
                mx-auto
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-[#fff5c8]
                text-[#8b6a00]
                sm:h-11
                sm:w-11
                dark:bg-[#2b260f]
                dark:text-[#ffd83d]
              "
            >
              <FiHelpCircle size={20} />
            </div>

            <h1
              className="
                mt-3
                font-serif
                text-[22px]
                font-extrabold
                text-black
                sm:text-[28px]
                lg:text-[34px]
                dark:text-white
              "
            >
              Frequently Asked Questions
            </h1>

            <p
              className="
                mx-auto
                mt-2
                max-w-140
                text-[9px]
                leading-5
                text-gray-500
                sm:text-[10px]
                lg:text-[11px]
                dark:text-gray-400
              "
            >
              Find quick answers about orders, delivery, payments, returns and
              products.
            </p>

            {/* SEARCH */}
            <div
              className="
                mx-auto
                mt-5
                flex
                h-11
                max-w-140
                items-center
                rounded-xl
                border
                border-gray-200
                bg-white
                px-3
                shadow-[0_4px_18px_rgba(0,0,0,0.04)]
                transition
                focus-within:border-[#ffd83d]
                sm:h-12
                dark:border-gray-700
                dark:bg-[#202020]
              "
            >
              <FiSearch size={15} className="shrink-0 text-gray-400" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search your question..."
                className="
                  h-full
                  min-w-0
                  flex-1
                  bg-transparent
                  px-2.5
                  text-[9px]
                  text-black
                  outline-none
                  placeholder:text-gray-400
                  sm:text-[10px]
                  dark:text-white
                "
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="
                    cursor-pointer
                    text-[8px]
                    font-bold
                    text-gray-400
                    hover:text-black
                    dark:hover:text-white
                  "
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </section>

        {/* CATEGORY FILTER */}
        <div
          className="
            scrollbar-hide
            mt-4
            flex
            gap-2
            overflow-x-auto
            pb-1
          "
        >
          {categories.map((category) => {
            const active = activeCategory === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => {
                  setActiveCategory(category.id);
                  setOpenId(null);
                }}
                className={`
                  flex
                  h-9
                  shrink-0
                  cursor-pointer
                  items-center
                  gap-1.5
                  rounded-lg
                  border
                  px-3
                  text-[10px]
                  font-bold
                  transition-all
                  sm:h-10
                  sm:px-4
                  sm:text-[10px]

                  ${
                    active
                      ? `
                        border-[#ffd83d]
                        bg-[#ffd83d]
                        text-black
                      `
                      : `
                        border-gray-200
                        bg-white
                        text-gray-900
                        hover:border-[#ffd83d]
                        hover:text-black
                        dark:border-gray-700
                        dark:bg-[#181818]
                        dark:text-gray-300
                      `
                  }
                `}
              >
                {category.icon}
                {category.label}
              </button>
            );
          })}
        </div>

        {/* CONTENT */}
        <div
          className="
            mt-4
            grid
            grid-cols-1
            gap-4
            lg:grid-cols-[240px_minmax(0,1fr)]
            xl:grid-cols-[270px_minmax(0,1fr)]
            xl:gap-6
          "
        >
          {/* LEFT INFO */}
          <aside
            className="
              hidden
              lg:block
            "
          >
            <div
              className="
                sticky
                top-25
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-4
                dark:border-gray-800
                dark:bg-[#181818]
              "
            >
              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  bg-[#fff6ce]
                  text-[#8b6a00]
                  dark:bg-[#2b260f]
                  dark:text-[#ffd83d]
                "
              >
                <FiMessageCircle size={16} />
              </div>

              <h2
                className="
                  mt-3
                font-bold
                tracking-wider
                  text-[13px]
                  font-serif
                  text-black
                  dark:text-white
                "
              >
                Still need help?
              </h2>

              <p
                className="
                  mt-1.5
                  text-[10px]
                  leading-4
                  text-gray-900
                  dark:text-gray-400
                "
              >
                Can&apos;t find the answer you need? Contact our support team
                and we&apos;ll help you.
              </p>

              <ThemeBtnOne
                text="Contact Support"
                icon={<FiMessageCircle size={11} />}
                url="/contact-us"
                className="
                  mt-4
                  flex
                  h-9
                  w-full
                  items-center
                  justify-center
                  gap-1.5
                  rounded-lg
                  bg-[#ffd83d]
                  text-[12px]
                  font-serif
                  text-black
                  transition
                  hover:bg-[#ffcf12]
                "
              />

              <div
                className="
                  mt-4
                  border-t
                  border-gray-100
                  pt-4
                  dark:border-gray-800
                "
              >
                <SupportInfo
                  icon={<FiTruck size={13} />}
                  title="Fast Delivery"
                />

                <SupportInfo
                  icon={<FiShield size={13} />}
                  title="Secure Payments"
                />

                <SupportInfo
                  icon={<FiRefreshCw size={13} />}
                  title="Easy Returns"
                />
              </div>
            </div>
          </aside>

          {/* FAQ LIST */}
          <section className="min-w-0">
            <div
              className="
                mb-3
                flex
                items-end
                justify-between
                gap-3
              "
            >
              <div>
                <h2
                  className="
                    font-serif
                    text-[15px]
                    font-extrabold
                    text-black
                    sm:text-[17px]
                    dark:text-white
                  "
                >
                  Common Questions
                </h2>

                <p
                  className="
                    mt-0.5
                    text-[12px]
                    text-gray-900
                  "
                >
                  {filteredFaqs.length} questions found
                </p>
              </div>
            </div>

            {filteredFaqs.length > 0 ? (
              <div className="space-y-2.5">
                {filteredFaqs.map((item) => {
                  const open = openId === item.id;

                  return (
                    <article
                      key={item.id}
                      className={`
                        overflow-hidden
                        rounded-xl
                        border
                        bg-white
                        transition-all

                        ${
                          open
                            ? `
                              border-[#ffd83d]
                              shadow-[0_4px_18px_rgba(255,216,61,0.08)]
                            `
                            : `
                              border-gray-200
                              hover:border-gray-300
                            `
                        }

                        dark:bg-[#181818]

                        ${
                          open
                            ? "dark:border-[#665816]"
                            : "dark:border-gray-800"
                        }
                      `}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenId(open ? null : item.id)}
                        className="
                          flex
                          w-full
                          cursor-pointer
                          items-center
                          justify-between
                          gap-4
                          p-3
                          text-left
                          sm:p-4
                        "
                      >
                        <div
                          className="
                            flex
                            min-w-0
                            items-center
                            gap-2.5
                          "
                        >
                          <span
                            className={`
                              flex
                              h-7
                              w-7
                              shrink-0
                              items-center
                              justify-center
                              rounded-lg
                              text-[9px]
                              font-extrabold

                              ${
                                open
                                  ? "bg-[#ffd83d] text-black"
                                  : "bg-[#f5f5f5] text-gray-500 dark:bg-[#242424]"
                              }
                            `}
                          >
                            Q
                          </span>

                          <span
                            className="
                              text-[9px]
                              font-bold
                              leading-4
                              text-black
                              sm:text-[10px]
                              lg:text-[11px]
                              dark:text-white
                            "
                          >
                            {item.question}
                          </span>
                        </div>

                        <FiChevronDown
                          size={15}
                          className={`
                            shrink-0
                            text-gray-400
                            transition-transform
                            duration-200

                            ${
                              open
                                ? "rotate-180 text-black dark:text-white"
                                : ""
                            }
                          `}
                        />
                      </button>

                      <div
                        className={`
                          grid
                          transition-all
                          duration-300

                          ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
                        `}
                      >
                        <div className="overflow-hidden">
                          <div
                            className="
                              border-t
                              border-gray-100
                              px-3
                              py-3
                              pl-12
                              text-[8px]
                              leading-4
                              text-gray-500
                              sm:px-4
                              sm:py-4
                              sm:pl-13.5
                              sm:text-[12px]
                              sm:leading-5
                              dark:border-gray-800
                              dark:text-gray-400
                            "
                          >
                            {item.answer}
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div
                className="
                  flex
                  min-h-75
                  flex-col
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-dashed
                  border-gray-200
                  bg-white
                  px-4
                  text-center
                  dark:border-gray-800
                  dark:bg-[#181818]
                "
              >
                <FiSearch size={22} className="text-gray-300" />

                <h3
                  className="
                    mt-3
                    font-serif
                    text-[13px]
                    font-extrabold
                    text-black
                    dark:text-white
                  "
                >
                  No questions found
                </h3>

                <p
                  className="
                    mt-1
                    max-w-70
                    text-[8px]
                    leading-4
                    text-gray-400
                  "
                >
                  Try another keyword or select a different category.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("all");
                  }}
                  className="
                    mt-4
                    h-9
                    cursor-pointer
                    rounded-lg
                    bg-[#ffd83d]
                    px-4
                    text-[8px]
                    font-bold
                    text-black
                  "
                >
                  View All Questions
                </button>
              </div>
            )}
          </section>
        </div>

        {/* BOTTOM CTA */}
        <section
          className="
            mt-5
            flex
            flex-col
            items-center
            justify-between
            gap-4
            rounded-2xl
            bg-[#181818]
            px-4
            py-5
            text-center
            sm:flex-row
            sm:px-6
            sm:text-left
            lg:px-8
          "
        >
          <div>
            <h2
              className="
                font-serif
                text-[15px]
                font-extrabold
                text-white
                sm:text-[17px]
              "
            >
              Didn&apos;t find your answer?
            </h2>

            <p
              className="
                mt-1
                text-[12px]
                text-gray-400
                sm:text-[12px]
              "
            >
              Our support team is available to assist you.
            </p>
          </div>

          <ThemeBtnOne
            text="Contact Us"
            url="/contact-us"
            icon={<FiMessageCircle />}
            className="
              flex
              h-10
              shrink-0
              items-center
              justify-center
              gap-1.5
              rounded-xl
              bg-[#ffd83d]
              px-5
              text-[12px] 
              fonst-serif
              text-black
              transition
              hover:bg-[#ffcf12]
            "
          />
        </section>
      </div>
    </main>
  );
};

const SupportInfo = ({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) => {
  return (
    <div
      className="
        flex
        items-center
        gap-2
        py-1.5
      "
    >
      <span
        className="
          flex
          h-7
          w-7
          items-center
          justify-center
          rounded-lg
          bg-[#f7f7f7]
          text-gray-500
          dark:bg-[#242424]
          dark:text-gray-400
        "
      >
        {icon}
      </span>

      <span
        className="
          text-[12px]
          font-semibold
          text-gray-900
          dark:text-gray-300
        "
      >
        {title}
      </span>
    </div>
  );
};

export default Faq;
