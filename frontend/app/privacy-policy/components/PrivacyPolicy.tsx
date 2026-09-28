"use client";

import React, { useState } from "react";
import Link from "next/link";

import {
  FiChevronRight,
  FiDatabase,
  FiEye,
  FiFileText,
  FiLock,
  FiMail,
  FiShield,
  FiShoppingBag,
  FiUserCheck,
} from "react-icons/fi";

type PolicySection = {
  id: string;
  title: string;
};

const policySections: PolicySection[] = [
  {
    id: "introduction",
    title: "Introduction",
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
  },
  {
    id: "how-we-use-information",
    title: "How We Use Your Information",
  },
  {
    id: "sharing-information",
    title: "Sharing Your Information",
  },
  {
    id: "cookies",
    title: "Cookies & Tracking",
  },
  {
    id: "data-security",
    title: "Data Security",
  },
  {
    id: "your-rights",
    title: "Your Rights",
  },
  {
    id: "data-retention",
    title: "Data Retention",
  },
  {
    id: "children",
    title: "Children's Privacy",
  },
  {
    id: "changes",
    title: "Changes to This Policy",
  },
  {
    id: "contact",
    title: "Contact Us",
  },
];

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState("introduction");

  const handleNavigate = (id: string) => {
    setActiveSection(id);

    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
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
              -right-16
              -top-16
              h-56
              w-56
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
              <FiShield size={11} />
              Your privacy matters
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
              Privacy Policy
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
              This Privacy Policy explains how we collect, use, store and
              protect your personal information when you use our website,
              services or place an order.
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

        {/* QUICK CARDS */}
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
            icon={<FiLock size={16} />}
            title="Secure Data"
            text="We take appropriate measures to protect your information."
          />

          <InfoCard
            icon={<FiEye size={16} />}
            title="Transparency"
            text="We explain how and why your information is used."
          />

          <InfoCard
            icon={<FiUserCheck size={16} />}
            title="Your Control"
            text="You can request access or updates to your data."
          />

          <InfoCard
            icon={<FiDatabase size={16} />}
            title="Responsible Storage"
            text="We retain information only when required."
          />
        </section>

        {/* CONTENT */}
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
                <p
                  className="
                    font-serif
                    text-[12px]
                    font-extrabold
                    text-black
                    dark:text-white
                  "
                >
                  Privacy Policy
                </p>

                <p
                  className="
                    mt-0.5
                    text-[7px]
                    text-gray-400
                  "
                >
                  Jump to a section
                </p>
              </div>

              <nav className="space-y-1">
                {policySections.map((section) => {
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

                      <FiChevronRight
                        size={10}
                        className="
                            shrink-0
                          "
                      />
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* POLICY CONTENT */}
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
              {policySections.map((section) => (
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
              <PolicyBlock id="introduction" number="01" title="Introduction">
                <p>
                  We respect your privacy and are committed to protecting your
                  personal information. This Privacy Policy describes the types
                  of information we may collect when you browse our website,
                  create an account, place an order, contact customer support or
                  otherwise use our services.
                </p>

                <p>
                  By using our website and services, you acknowledge the
                  practices described in this policy.
                </p>
              </PolicyBlock>

              {/* INFORMATION */}
              <PolicyBlock
                id="information-we-collect"
                number="02"
                title="Information We Collect"
              >
                <p>
                  We may collect information that you provide directly to us as
                  well as information generated when you use our services.
                </p>

                <PolicyList
                  items={[
                    "Name, email address and phone number.",
                    "Shipping and billing addresses.",
                    "Account registration and profile information.",
                    "Order, transaction and purchase history.",
                    "Information submitted through support or contact forms.",
                    "Device, browser and website usage information.",
                    "Payment-related information processed through payment providers.",
                  ]}
                />
              </PolicyBlock>

              {/* USE */}
              <PolicyBlock
                id="how-we-use-information"
                number="03"
                title="How We Use Your Information"
              >
                <p>
                  Your information may be used to operate and improve our
                  ecommerce services and provide a better shopping experience.
                </p>

                <PolicyList
                  items={[
                    "Process and fulfil your orders.",
                    "Arrange shipping and delivery.",
                    "Process payments and refunds.",
                    "Provide customer support.",
                    "Communicate order and account updates.",
                    "Improve products, website performance and services.",
                    "Prevent fraud, misuse and security incidents.",
                    "Comply with applicable legal obligations.",
                  ]}
                />
              </PolicyBlock>

              {/* SHARING */}
              <PolicyBlock
                id="sharing-information"
                number="04"
                title="Sharing Your Information"
              >
                <p>
                  We may share necessary information with trusted third parties
                  that help us provide our services.
                </p>

                <PolicyList
                  items={[
                    "Payment gateways and payment processors.",
                    "Shipping and courier partners.",
                    "Technology, hosting and infrastructure providers.",
                    "Customer support and communication service providers.",
                    "Professional advisers or authorities where required by law.",
                  ]}
                />

                <Notice>
                  We do not intend to sell your personal information as a
                  product to third parties.
                </Notice>
              </PolicyBlock>

              {/* COOKIES */}
              <PolicyBlock
                id="cookies"
                number="05"
                title="Cookies & Tracking Technologies"
              >
                <p>
                  We may use cookies and similar technologies to remember your
                  preferences, maintain sessions, improve website functionality
                  and understand how visitors interact with our website.
                </p>

                <p>
                  You may control cookies through your browser settings.
                  Disabling some cookies may affect certain website features.
                </p>
              </PolicyBlock>

              {/* SECURITY */}
              <PolicyBlock id="data-security" number="06" title="Data Security">
                <p>
                  We use reasonable administrative, technical and organisational
                  safeguards designed to protect personal information from
                  unauthorised access, disclosure, alteration or loss.
                </p>

                <div
                  className="
                    mt-3
                    grid
                    grid-cols-1
                    gap-2
                    sm:grid-cols-3
                  "
                >
                  <SecurityItem
                    icon={<FiLock size={14} />}
                    title="Secure Access"
                  />

                  <SecurityItem
                    icon={<FiShield size={14} />}
                    title="Data Protection"
                  />

                  <SecurityItem
                    icon={<FiDatabase size={14} />}
                    title="Safe Storage"
                  />
                </div>
              </PolicyBlock>

              {/* RIGHTS */}
              <PolicyBlock id="your-rights" number="07" title="Your Rights">
                <p>
                  Subject to applicable law, you may have rights regarding your
                  personal information.
                </p>

                <PolicyList
                  items={[
                    "Request access to personal information we hold about you.",
                    "Request correction of inaccurate or incomplete information.",
                    "Request deletion where legally permitted.",
                    "Object to or restrict certain processing activities.",
                    "Withdraw consent where processing relies on consent.",
                    "Request information about how your data is handled.",
                  ]}
                />
              </PolicyBlock>

              {/* RETENTION */}
              <PolicyBlock
                id="data-retention"
                number="08"
                title="Data Retention"
              >
                <p>
                  We retain personal information for as long as reasonably
                  necessary to provide our services, maintain transaction
                  records, resolve disputes, prevent fraud and comply with legal
                  or regulatory obligations.
                </p>
              </PolicyBlock>

              {/* CHILDREN */}
              <PolicyBlock id="children" number="09" title="Children's Privacy">
                <p>
                  Our ecommerce services are not intended to knowingly collect
                  personal information from children without appropriate consent
                  where required by applicable law.
                </p>
              </PolicyBlock>

              {/* CHANGES */}
              <PolicyBlock
                id="changes"
                number="10"
                title="Changes to This Privacy Policy"
              >
                <p>
                  We may update this Privacy Policy from time to time to reflect
                  changes to our services, business practices or legal
                  requirements.
                </p>

                <p>
                  The latest version and effective date will be displayed on
                  this page.
                </p>
              </PolicyBlock>

              {/* CONTACT */}
              <PolicyBlock id="contact" number="11" title="Contact Us" last>
                <p>
                  If you have questions about this Privacy Policy or how your
                  personal information is handled, please contact our support
                  team.
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
                    href="mailto:privacy@example.com"
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

                    <span>
                      <span
                        className="
                          block
                          text-[8px]
                          text-gray-400
                        "
                      >
                        Email
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
                        privacy@example.com
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
                      <FiFileText size={13} />
                    </span>

                    <span>
                      <span
                        className="
                          block
                          text-[8px]
                          text-gray-400
                        "
                      >
                        Need help?
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
              </PolicyBlock>
            </div>
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
                text-[14px]
                font-extrabold
                text-white

                sm:text-[16px]
              "
            >
              Have questions about your privacy?
            </h2>

            <p
              className="
                mt-1
                text-[8px]
                text-gray-400

                sm:text-[9px]
              "
            >
              Our support team is available to help.
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

/* ====================================================== */
/* INFO CARD */
/* ====================================================== */

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

/* ====================================================== */
/* POLICY BLOCK */
/* ====================================================== */

const PolicyBlock = ({
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
        scroll-mt-27.5
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

/* ====================================================== */
/* LIST */
/* ====================================================== */

const PolicyList = ({ items }: { items: string[] }) => {
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

/* ====================================================== */
/* NOTICE */
/* ====================================================== */

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
      <FiShield
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

/* ====================================================== */
/* SECURITY ITEM */
/* ====================================================== */

const SecurityItem = ({
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
      <span className="text-[#a17b00] dark:text-[#ffd83d]">{icon}</span>

      <span
        className="
          text-[8px]
          font-bold
          text-gray-600

          dark:text-gray-300
        "
      >
        {title}
      </span>
    </div>
  );
};

export default PrivacyPolicy;
