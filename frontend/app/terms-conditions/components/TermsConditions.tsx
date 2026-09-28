"use client";

import React, { useState } from "react";
import Link from "next/link";

import {
  FiAlertCircle,
  FiChevronRight,
  FiCreditCard,
  FiFileText,
  FiLock,
  FiMail,
  FiPackage,
  FiRefreshCw,
  FiShield,
  FiShoppingBag,
  FiTruck,
  FiUser,
} from "react-icons/fi";

type TermsSection = {
  id: string;
  title: string;
};

const termsSections: TermsSection[] = [
  {
    id: "introduction",
    title: "Introduction",
  },
  {
    id: "eligibility",
    title: "Eligibility",
  },
  {
    id: "account",
    title: "Your Account",
  },
  {
    id: "products",
    title: "Products & Pricing",
  },
  {
    id: "orders",
    title: "Orders",
  },
  {
    id: "payments",
    title: "Payments",
  },
  {
    id: "shipping",
    title: "Shipping & Delivery",
  },
  {
    id: "returns",
    title: "Returns & Refunds",
  },
  {
    id: "cancellations",
    title: "Order Cancellation",
  },
  {
    id: "warranty",
    title: "Product Warranty",
  },
  {
    id: "prohibited",
    title: "Prohibited Use",
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
  },
  {
    id: "liability",
    title: "Limitation of Liability",
  },
  {
    id: "changes",
    title: "Changes to Terms",
  },
  {
    id: "contact",
    title: "Contact Us",
  },
];

const TermsConditions = () => {
  const [activeSection, setActiveSection] = useState("introduction");

  const handleNavigate = (id: string) => {
    setActiveSection(id);

    const element = document.getElementById(id);

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

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
          max-w-[1500px]
          px-3
          sm:px-5
          lg:px-8
          xl:px-10
        "
      >
        {/* ================================= */}
        {/* HERO */}
        {/* ================================= */}
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
            sm:px-6
            sm:py-9
            lg:px-8
            lg:py-10
            dark:border-gray-800
            dark:bg-[#181818]
          "
        >
          <div
            className="
              absolute
              -right-20
              -top-20
              h-60
              w-60
              rounded-full
              bg-[#ffd83d]/10
              blur-3xl
            "
          />

          <div className="relative max-w-[760px]">
            <span
              className="
                inline-flex
                items-center
                gap-1.5
                rounded-full
                bg-[#fff6ce]
                px-2.5
                py-1
                text-[8px]
                font-bold
                text-[#806300]
                sm:text-[9px]
                dark:bg-[#2b260f]
                dark:text-[#ffd83d]
              "
            >
              <FiFileText size={11} />
              Please read carefully
            </span>

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
              Terms & Conditions
            </h1>

            <p
              className="
                mt-2
                max-w-[650px]
                text-[9px]
                leading-5
                text-gray-500
                sm:text-[10px]
                lg:text-[11px]
                dark:text-gray-400
              "
            >
              These Terms & Conditions explain the rules that apply when you
              access our website, create an account, purchase products or use
              our services.
            </p>

            <div
              className="
                mt-4
                flex
                flex-wrap
                items-center
                gap-x-4
                gap-y-2
                text-[8px]
                text-gray-400
              "
            >
              <span>Last updated: September 24, 2026</span>

              <span className="hidden sm:inline">•</span>

              <span>Effective immediately</span>
            </div>
          </div>
        </section>

        {/* ================================= */}
        {/* QUICK INFO */}
        {/* ================================= */}
        <section
          className="
            mt-4
            grid
            grid-cols-2
            gap-2.5
            sm:gap-3
            lg:grid-cols-4
          "
        >
          <InfoCard
            icon={<FiShoppingBag size={16} />}
            title="Orders"
            text="Terms for placing and managing your orders."
          />

          <InfoCard
            icon={<FiCreditCard size={16} />}
            title="Payments"
            text="Information about accepted payment methods."
          />

          <InfoCard
            icon={<FiTruck size={16} />}
            title="Delivery"
            text="Shipping and delivery terms for your purchases."
          />

          <InfoCard
            icon={<FiRefreshCw size={16} />}
            title="Returns"
            text="Conditions applicable to eligible returns and refunds."
          />
        </section>

        {/* ================================= */}
        {/* CONTENT */}
        {/* ================================= */}
        <div
          className="
            mt-4
            grid
            grid-cols-1
            gap-4
            lg:grid-cols-[250px_minmax(0,1fr)]
            xl:grid-cols-[280px_minmax(0,1fr)]
            xl:gap-6
          "
        >
          {/* SIDEBAR */}
          <aside className="hidden lg:block">
            <div
              className="
                sticky
                top-[100px]
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-3
                dark:border-gray-800
                dark:bg-[#181818]
              "
            >
              <div className="px-2 pb-3">
                <h2
                  className="
                    font-serif
                    text-[12px]
                    font-extrabold
                    text-black
                    dark:text-white
                  "
                >
                  Terms & Conditions
                </h2>

                <p className="mt-0.5 text-[7px] text-gray-400">
                  Jump to a section
                </p>
              </div>

              <nav className="space-y-1">
                {termsSections.map((section) => {
                  const active = activeSection === section.id;

                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => handleNavigate(section.id)}
                      className={`
                        flex
                        w-full
                        cursor-pointer
                        items-center
                        justify-between
                        gap-2
                        rounded-lg
                        px-2.5
                        py-2
                        text-left
                        text-[8px]
                        font-semibold
                        transition-all

                        ${
                          active
                            ? `
                              bg-[#fff7d5]
                              text-[#8a6900]

                              dark:bg-[#2b260f]
                              dark:text-[#ffd83d]
                            `
                            : `
                              text-gray-500

                              hover:bg-gray-50
                              hover:text-black

                              dark:text-gray-400
                              dark:hover:bg-[#222]
                              dark:hover:text-white
                            `
                        }
                      `}
                    >
                      <span className="truncate">{section.title}</span>

                      <FiChevronRight size={10} className="shrink-0" />
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* RIGHT */}
          <section className="min-w-0">
            {/* MOBILE NAV */}
            <div
              className="
                scrollbar-hide
                mb-3
                flex
                gap-2
                overflow-x-auto
                pb-1
                lg:hidden
              "
            >
              {termsSections.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => handleNavigate(section.id)}
                  className={`
                    shrink-0
                    rounded-lg
                    border
                    px-3
                    py-2
                    text-[8px]
                    font-bold
                    transition

                    ${
                      activeSection === section.id
                        ? `
                          border-[#ffd83d]
                          bg-[#ffd83d]
                          text-black
                        `
                        : `
                          border-gray-200
                          bg-white
                          text-gray-500

                          dark:border-gray-700
                          dark:bg-[#181818]
                          dark:text-gray-300
                        `
                    }
                  `}
                >
                  {section.title}
                </button>
              ))}
            </div>

            <div
              className="
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-4
                sm:p-5
                lg:p-6
                dark:border-gray-800
                dark:bg-[#181818]
              "
            >
              {/* INTRODUCTION */}
              <TermsBlock id="introduction" number="01" title="Introduction">
                <p>
                  Welcome to our online store. By accessing this website or
                  purchasing products from us, you agree to these Terms &
                  Conditions.
                </p>

                <p>
                  If you do not agree with these terms, you should not use the
                  website or related services.
                </p>
              </TermsBlock>

              {/* ELIGIBILITY */}
              <TermsBlock id="eligibility" number="02" title="Eligibility">
                <p>
                  You must be legally capable of entering into a binding
                  agreement to purchase products or use account-based services.
                </p>

                <TermsList
                  items={[
                    "You must provide accurate and complete information.",
                    "You are responsible for ensuring that your use of the website is lawful.",
                    "You must not use the website for fraudulent or unauthorised activity.",
                  ]}
                />
              </TermsBlock>

              {/* ACCOUNT */}
              <TermsBlock id="account" number="03" title="Your Account">
                <p>
                  You may be able to create an account to manage orders,
                  addresses, wishlist items and other services.
                </p>

                <TermsList
                  items={[
                    "You are responsible for maintaining the confidentiality of your account credentials.",
                    "You are responsible for activities performed through your account.",
                    "You should notify us if you suspect unauthorised account access.",
                    "Account information should remain accurate and up to date.",
                  ]}
                />
              </TermsBlock>

              {/* PRODUCTS */}
              <TermsBlock id="products" number="04" title="Products & Pricing">
                <p>
                  We aim to provide accurate product descriptions, images,
                  specifications and pricing. However, minor differences may
                  occur.
                </p>

                <TermsList
                  items={[
                    "Product availability may change without notice.",
                    "Prices may change before an order is confirmed.",
                    "Promotional prices may be available for a limited period.",
                    "Product images may differ slightly from the actual product.",
                    "Specifications may vary depending on model or variant.",
                  ]}
                />

                <Notice>
                  If an obvious pricing or product information error occurs, we
                  may contact you before processing the affected order.
                </Notice>
              </TermsBlock>

              {/* ORDERS */}
              <TermsBlock id="orders" number="05" title="Orders">
                <p>
                  Submitting an order does not necessarily mean that the order
                  has been accepted.
                </p>

                <TermsList
                  items={[
                    "Orders are subject to product availability.",
                    "Order details should be reviewed before checkout.",
                    "We may contact you if additional verification is required.",
                    "An order may be rejected or cancelled where appropriate.",
                    "You will receive order information through the website or your registered contact details.",
                  ]}
                />
              </TermsBlock>

              {/* PAYMENTS */}
              <TermsBlock id="payments" number="06" title="Payments">
                <p>
                  Payment methods shown during checkout may vary based on
                  location, order value and availability.
                </p>

                <div
                  className="
                    mt-3
                    grid
                    grid-cols-2
                    gap-2
                    sm:grid-cols-3
                  "
                >
                  <PaymentItem title="Cards" />

                  <PaymentItem title="UPI" />

                  <PaymentItem title="Razorpay" />

                  <PaymentItem title="Tabby" />

                  <PaymentItem title="Apple Pay" />

                  <PaymentItem title="Cash on Delivery" />
                </div>

                <p className="mt-3">
                  Payment approval may depend on your bank, payment provider or
                  selected payment service.
                </p>
              </TermsBlock>

              {/* SHIPPING */}
              <TermsBlock id="shipping" number="07" title="Shipping & Delivery">
                <p>
                  Delivery estimates are provided for convenience and may vary
                  depending on location, courier availability, product stock and
                  external factors.
                </p>

                <TermsList
                  items={[
                    "Customers are responsible for providing a complete and accurate delivery address.",
                    "Delivery charges, where applicable, are displayed during checkout.",
                    "Delivery timelines may change during holidays or high-demand periods.",
                    "Additional verification may be required before delivery.",
                    "Risk and responsibility for the product may transfer according to applicable delivery terms.",
                  ]}
                />
              </TermsBlock>

              {/* RETURNS */}
              <TermsBlock id="returns" number="08" title="Returns & Refunds">
                <p>
                  Eligible products may be returned in accordance with our
                  applicable return and refund policy.
                </p>

                <TermsList
                  items={[
                    "Return requests should be submitted within the applicable return period.",
                    "Products may need to be unused and returned with original packaging and accessories.",
                    "Certain categories may be non-returnable for hygiene, safety or other reasons.",
                    "Returned products may be inspected before a refund is approved.",
                    "Refund timing may vary depending on the payment method.",
                  ]}
                />

                <Link
                  href="/returns"
                  className="
                    mt-3
                    inline-flex
                    items-center
                    gap-1
                    text-[8px]
                    font-bold
                    text-[#957200]
                    hover:underline
                    dark:text-[#ffd83d]
                  "
                >
                  View Return Policy
                  <FiChevronRight size={10} />
                </Link>
              </TermsBlock>

              {/* CANCELLATIONS */}
              <TermsBlock
                id="cancellations"
                number="09"
                title="Order Cancellation"
              >
                <p>
                  You may be able to cancel an order before it reaches certain
                  processing or shipping stages.
                </p>

                <p>
                  Once an order has been shipped, cancellation may no longer be
                  available and the return process may need to be used instead.
                </p>
              </TermsBlock>

              {/* WARRANTY */}
              <TermsBlock id="warranty" number="10" title="Product Warranty">
                <p>
                  Warranty coverage varies by product, manufacturer, seller and
                  region.
                </p>

                <TermsList
                  items={[
                    "Warranty information may be displayed on the product page.",
                    "Proof of purchase may be required for warranty claims.",
                    "Physical damage or misuse may not be covered.",
                    "Manufacturer warranty terms may apply independently.",
                  ]}
                />
              </TermsBlock>

              {/* PROHIBITED */}
              <TermsBlock id="prohibited" number="11" title="Prohibited Use">
                <p>You must not misuse our website, services or systems.</p>

                <TermsList
                  items={[
                    "Attempt to gain unauthorised access to systems or accounts.",
                    "Use the website for fraudulent activities.",
                    "Introduce malware, harmful code or automated attacks.",
                    "Copy or scrape content in violation of applicable rights.",
                    "Interfere with the security or normal operation of the website.",
                    "Use another person's information without authority.",
                  ]}
                />
              </TermsBlock>

              {/* IP */}
              <TermsBlock
                id="intellectual-property"
                number="12"
                title="Intellectual Property"
              >
                <p>
                  Website content including branding, graphics, text,
                  interfaces, design and other materials may be protected by
                  intellectual property rights.
                </p>

                <p>
                  You may not reproduce, distribute, modify or commercially
                  exploit protected content without appropriate permission.
                </p>
              </TermsBlock>

              {/* LIABILITY */}
              <TermsBlock
                id="liability"
                number="13"
                title="Limitation of Liability"
              >
                <p>
                  To the extent permitted by applicable law, liability related
                  to the use of the website, products or services may be subject
                  to applicable limitations and exclusions.
                </p>

                <Notice>
                  Nothing in these terms is intended to exclude rights or
                  remedies that cannot legally be excluded.
                </Notice>
              </TermsBlock>

              {/* CHANGES */}
              <TermsBlock
                id="changes"
                number="14"
                title="Changes to These Terms"
              >
                <p>
                  We may update these Terms & Conditions when our services,
                  business practices or legal requirements change.
                </p>

                <p>
                  The latest version and effective date will be displayed on
                  this page.
                </p>
              </TermsBlock>

              {/* CONTACT */}
              <TermsBlock id="contact" number="15" title="Contact Us" last>
                <p>
                  If you have any questions about these Terms & Conditions,
                  please contact our support team.
                </p>

                <div
                  className="
                    mt-4
                    grid
                    grid-cols-1
                    gap-2
                    sm:grid-cols-2
                  "
                >
                  <a
                    href="mailto:support@example.com"
                    className="
                      flex
                      items-center
                      gap-2.5
                      rounded-xl
                      border
                      border-gray-200
                      bg-[#fafafa]
                      p-3
                      transition
                      hover:border-[#ffd83d]

                      dark:border-gray-700
                      dark:bg-[#202020]
                    "
                  >
                    <span
                      className="
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-[#fff6ce]
                        text-[#8b6a00]

                        dark:bg-[#2b260f]
                        dark:text-[#ffd83d]
                      "
                    >
                      <FiMail size={13} />
                    </span>

                    <span className="min-w-0">
                      <span
                        className="
                          block
                          text-[7px]
                          text-gray-400
                        "
                      >
                        Email
                      </span>

                      <span
                        className="
                          mt-0.5
                          block
                          truncate
                          text-[9px]
                          font-bold
                          text-black

                          dark:text-white
                        "
                      >
                        support@example.com
                      </span>
                    </span>
                  </a>

                  <Link
                    href="/contact-us"
                    className="
                      flex
                      items-center
                      gap-2.5
                      rounded-xl
                      border
                      border-gray-200
                      bg-[#fafafa]
                      p-3
                      transition
                      hover:border-[#ffd83d]

                      dark:border-gray-700
                      dark:bg-[#202020]
                    "
                  >
                    <span
                      className="
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-[#fff6ce]
                        text-[#8b6a00]

                        dark:bg-[#2b260f]
                        dark:text-[#ffd83d]
                      "
                    >
                      <FiUser size={13} />
                    </span>

                    <span>
                      <span
                        className="
                          block
                          text-[7px]
                          text-gray-400
                        "
                      >
                        Customer Support
                      </span>

                      <span
                        className="
                          mt-0.5
                          block
                          text-[9px]
                          font-bold
                          text-black

                          dark:text-white
                        "
                      >
                        Contact Support
                      </span>
                    </span>
                  </Link>
                </div>
              </TermsBlock>
            </div>
          </section>
        </div>

        {/* ================================= */}
        {/* BOTTOM CTA */}
        {/* ================================= */}
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
                text-[14px]
                font-extrabold
                text-white
                sm:text-[16px]
              "
            >
              Need help with our terms?
            </h2>

            <p
              className="
                mt-1
                text-[8px]
                text-gray-400
                sm:text-[9px]
              "
            >
              Contact our support team if you have questions.
            </p>
          </div>

          <Link
            href="/contact-us"
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
              text-[9px]
              font-extrabold
              text-black
              transition
              hover:bg-[#ffcf12]
            "
          >
            <FiMail size={12} />
            Contact Us
          </Link>
        </section>
      </div>
    </main>
  );
};

/* ================================= */
/* INFO CARD */
/* ================================= */

const InfoCard = ({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) => {
  return (
    <div
      className="
        rounded-xl
        border
        border-gray-200
        bg-white
        p-3
        sm:p-4
        dark:border-gray-800
        dark:bg-[#181818]
      "
    >
      <div
        className="
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-lg
          bg-[#fff6ce]
          text-[#8b6a00]

          dark:bg-[#2b260f]
          dark:text-[#ffd83d]
        "
      >
        {icon}
      </div>

      <h3
        className="
          mt-2.5
          font-serif
          text-[9px]
          font-bold
          text-black
          sm:text-[10px]
          dark:text-white
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-1
          text-[7px]
          leading-3.5
          text-gray-400
          sm:text-[8px]
        "
      >
        {text}
      </p>
    </div>
  );
};

/* ================================= */
/* TERMS BLOCK */
/* ================================= */

const TermsBlock = ({
  id,
  number,
  title,
  children,
  last = false,
}: {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) => {
  return (
    <div
      id={id}
      className={`
        scroll-mt-[110px]
        py-5
        sm:py-6

        ${!last ? "border-b border-gray-100 dark:border-gray-800" : ""}
      `}
    >
      <div className="flex items-start gap-3">
        <span
          className="
            flex
            h-8
            min-w-8
            shrink-0
            items-center
            justify-center
            rounded-lg
            bg-[#fff7d5]
            text-[8px]
            font-extrabold
            text-[#8a6900]

            dark:bg-[#2b260f]
            dark:text-[#ffd83d]
          "
        >
          {number}
        </span>

        <div className="min-w-0 flex-1">
          <h2
            className="
              font-serif
              text-[14px]
              font-extrabold
              text-black
              sm:text-[16px]
              lg:text-[17px]
              dark:text-white
            "
          >
            {title}
          </h2>

          <div
            className="
              mt-2.5
              space-y-2.5
              text-[8px]
              leading-4
              text-gray-500
              sm:text-[9px]
              sm:leading-5
              dark:text-gray-400
            "
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================================= */
/* TERMS LIST */
/* ================================= */

const TermsList = ({ items }: { items: string[] }) => {
  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li
          key={index}
          className="
            flex
            items-start
            gap-2
          "
        >
          <span
            className="
              mt-[6px]
              h-1.5
              w-1.5
              shrink-0
              rounded-full
              bg-[#ffd83d]
            "
          />

          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
};

/* ================================= */
/* NOTICE */
/* ================================= */

const Notice = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="
        mt-3
        flex
        items-start
        gap-2.5
        rounded-xl
        border
        border-[#ffe681]
        bg-[#fffdf3]
        p-3

        dark:border-[#5e5117]
        dark:bg-[#29260f]
      "
    >
      <FiAlertCircle
        size={13}
        className="
          mt-0.5
          shrink-0
          text-[#997400]

          dark:text-[#ffd83d]
        "
      />

      <p
        className="
          text-[8px]
          font-medium
          leading-4
          text-[#6d5900]

          dark:text-[#e7d369]
        "
      >
        {children}
      </p>
    </div>
  );
};

/* ================================= */
/* PAYMENT ITEM */
/* ================================= */

const PaymentItem = ({ title }: { title: string }) => {
  return (
    <div
      className="
        flex
        items-center
        gap-2
        rounded-lg
        border
        border-gray-100
        bg-[#fafafa]
        px-3
        py-2.5

        dark:border-gray-700
        dark:bg-[#202020]
      "
    >
      <span
        className="
          flex
          h-6
          w-6
          shrink-0
          items-center
          justify-center
          rounded-md
          bg-[#fff6ce]
          text-[#8b6a00]

          dark:bg-[#2b260f]
          dark:text-[#ffd83d]
        "
      >
        <FiLock size={11} />
      </span>

      <span
        className="
          truncate
          text-[7px]
          font-bold
          text-gray-600
          sm:text-[8px]
          dark:text-gray-300
        "
      >
        {title}
      </span>
    </div>
  );
};

export default TermsConditions;
