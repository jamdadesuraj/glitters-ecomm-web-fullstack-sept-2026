"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiMessageCircle,
  FiSend,
  FiChevronRight,
  FiCheckCircle,
  FiHelpCircle,
  FiShoppingBag,
  FiTruck,
  FiRefreshCw,
} from "react-icons/fi";
import ThemeBtnOne from "@/app/components/ThemeBtnOne";

const ContactUs = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
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
          max-w-375
          px-3
          sm:px-5
          lg:px-8
          xl:px-10
        "
      >
        {/* ============================== */}
        {/* PAGE HEADER */}
        {/* ============================== */}

        <section
          className="
            relative
            overflow-hidden
            rounded-2xl
            border
            border-gray-200
            bg-white
            px-4
            py-6
            sm:px-6
            sm:py-8
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
              h-56
              w-56
              rounded-full
              bg-[#ffd83d]/10
              blur-3xl
            "
          />

          <div className="relative max-w-175">
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
              <FiMessageCircle size={11} />
              We&apos;re here to help
            </span>

            <h1
              className="
                mt-3
                font-serif
                text-[22px]
                font-extrabold
                leading-tight
                text-black
                sm:text-[28px]
                lg:text-[34px]
                dark:text-white
              "
            >
              Contact Us
            </h1>

            <p
              className="
                mt-2
                max-w-150
                text-[10px]
                leading-5
                text-gray-500
                sm:text-[11px]
                lg:text-[12px]
                dark:text-gray-400
              "
            >
              Have a question about your order, product, delivery or payment?
              Our support team is ready to assist you.
            </p>
          </div>
        </section>

        {/* ============================== */}
        {/* CONTACT CARDS */}
        {/* ============================== */}

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
          <ContactCard
            icon={<FiPhone size={17} />}
            title="Call Us"
            text="+971 50 123 4567"
            subtext="Mon - Sat, 9AM - 8PM"
            href="tel:+971501234567"
          />

          <ContactCard
            icon={<FiMail size={17} />}
            title="Email Us"
            text="support@example.com"
            subtext="Reply within 24 hours"
            href="mailto:support@example.com"
          />

          <ContactCard
            icon={<FiMessageCircle size={17} />}
            title="Live Chat"
            text="Chat with Support"
            subtext="Quick assistance"
            href="#contact-form"
          />

          <ContactCard
            icon={<FiMapPin size={17} />}
            title="Our Location"
            text="Dubai, UAE"
            subtext="Visit our store"
            href="#location"
          />
        </section>

        {/* ============================== */}
        {/* MAIN CONTENT */}
        {/* ============================== */}

        <div
          className="
            mt-4
            grid
            grid-cols-1
            gap-4
            lg:grid-cols-[minmax(0,1fr)_340px]
            xl:grid-cols-[minmax(0,1fr)_380px]
            xl:gap-6
          "
        >
          {/* ============================== */}
          {/* CONTACT FORM */}
          {/* ============================== */}

          <section
            id="contact-form"
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
            <div className="mb-5">
              <h2
                className="
                  font-serif
                  text-[16px]
                  font-extrabold
                  text-black
                  sm:text-[18px]
                  dark:text-white
                "
              >
                Send Us a Message
              </h2>

              <p
                className="
                  mt-1
                  text-[9px]
                  text-gray-400
                  sm:text-[10px]
                "
              >
                Fill out the form and our team will get back to you as soon as
                possible.
              </p>
            </div>

            {submitted ? (
              <div
                className="
                  flex
                  min-h-90
                  flex-col
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-dashed
                  border-green-200
                  bg-green-50/50
                  px-5
                  text-center
                  dark:border-green-900
                  dark:bg-green-500/5
                "
              >
                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    bg-green-100
                    text-green-600
                    dark:bg-green-500/10
                  "
                >
                  <FiCheckCircle size={24} />
                </div>

                <h3
                  className="
                    mt-4
                    font-serif
                    text-[16px]
                    font-extrabold
                    text-black
                    dark:text-white
                  "
                >
                  Message Sent Successfully
                </h3>

                <p
                  className="
                    mt-1
                    max-w-90
                    text-[9px]
                    leading-4
                    text-gray-500
                    dark:text-gray-400
                  "
                >
                  Thank you for contacting us. Our support team will respond
                  shortly.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="
                    mt-5
                    h-9
                    cursor-pointer
                    rounded-lg
                    bg-[#ffd83d]
                    px-4
                    text-[9px]
                    font-extrabold
                    text-black
                    transition
                    hover:bg-[#ffcf12]
                  "
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="
                  grid
                  grid-cols-1
                  gap-3
                  sm:grid-cols-2
                "
              >
                <ContactInput
                  label="First Name"
                  placeholder="Enter first name"
                />

                <ContactInput label="Last Name" placeholder="Enter last name" />

                <ContactInput
                  label="Email Address"
                  placeholder="example@email.com"
                  type="email"
                />

                <ContactInput
                  label="Phone Number"
                  placeholder="+971 50 123 4567"
                  type="tel"
                />

                <div className="sm:col-span-2">
                  <label
                    className="
                      mb-1.5
                      block
                      text-[12px]
                      font-semibold
                      text-gray-900
                      sm:text-[12px]
                      font-serif
                      dark:text-gray-300
                    "
                  >
                    Subject
                  </label>

                  <select
                    defaultValue=""
                    className="
                      h-10
                      w-full
                      rounded-lg
                      border
                      border-gray-200
                      bg-white
                      px-3
                      text-[12px]
                      text-black
                      outline-none
                      transition
                      focus:border-[#ffd83d]
                      sm:h-11
                      dark:border-gray-700
                      dark:bg-[#202020]
                      dark:text-white
                    "
                  >
                    <option value="" disabled>
                      Select a subject
                    </option>

                    <option>Order Support</option>
                    <option>Product Inquiry</option>
                    <option>Delivery Issue</option>
                    <option>Payment Issue</option>
                    <option>Return & Refund</option>
                    <option>Warranty Support</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label
                    className="
                      mb-1.5
                      block
                      text-[8px]
                      font-semibold
                      sm:text-[12px]
                      font-serif
                      text-gray-900
                      dark:text-gray-300
                    "
                  >
                    Order Number
                    <span className="ml-1 font-normal text-gray-400">
                      (Optional)
                    </span>
                  </label>

                  <input
                    type="text"
                    placeholder="Example: ORD-123456"
                    className="
                      h-10
                      w-full
                      rounded-lg
                      border
                      border-gray-200
                      bg-white
                      px-3
                      text-[9px]
                      text-black
                      outline-none
                      transition
                      placeholder:text-gray-400
                      focus:border-[#ffd83d]
                      sm:h-11
                      dark:border-gray-700
                      dark:bg-[#202020]
                      dark:text-white
                    "
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    className="
                      mb-1.5
                      block
                      text-[8px]
                      font-semibold
                         sm:text-[12px]
                      font-serif
                      text-gray-900
                      dark:text-gray-300
                    "
                  >
                    Message
                  </label>

                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us how we can help..."
                    className="
                      w-full
                      resize-none
                      rounded-lg
                      border
                      border-gray-200
                      bg-white
                      p-3
                      text-[9px]
                      leading-4
                      text-black
                      outline-none
                      transition
                      placeholder:text-gray-400
                      focus:border-[#ffd83d]
                      sm:text-[10px]
                      dark:border-gray-700
                      dark:bg-[#202020]
                      dark:text-white
                    "
                  />
                </div>

                <div
                  className="
                    flex
                    flex-col
                    gap-3
                    sm:col-span-2
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                  "
                >
                  <label
                    className="
                      flex
                      cursor-pointer
                      items-start
                      gap-2
                    "
                  >
                    <input
                      type="checkbox"
                      required
                      className="
                        mt-0.5
                        h-3.5
                        w-3.5
                        accent-[#ffd83d]
                      "
                    />

                    <span
                      className="
                        text-[7px]
                        leading-4
                        text-gray-900
                        sm:text-[12px]
                      "
                    >
                      I agree to the privacy policy and terms.
                    </span>
                  </label>

                  <ThemeBtnOne
                    text="  Send Message"
                    icon={<FiSend size={12} />}
                    type="submit"
                    className="
                      flex
                      h-10
                      cursor-pointer
                      items-center
                      justify-center
                      gap-1.5
                      rounded-xl
                      bg-[#ffd83d]
                      px-5
                      text-[9px]
                      font-extrabold
                      text-black
                      transition-all
                      hover:bg-[#ffcf12]
                      hover:shadow-[0_6px_18px_rgba(255,216,61,0.28)]
                      active:scale-[0.99]
                      sm:min-w-36.25
                      sm:h-11
                    "
                  />
                </div>
              </form>
            )}
          </section>

          {/* ============================== */}
          {/* SIDEBAR */}
          {/* ============================== */}

          <aside className="space-y-4">
            {/* SUPPORT HOURS */}
            <div
              className="
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-4
                sm:p-5
                dark:border-gray-800
                dark:bg-[#181818]
              "
            >
              <div className="flex items-center gap-2.5">
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
                  <FiClock size={15} />
                </div>

                <div>
                  <h2
                    className="
                      font-serif
                      text-[13px]
                      font-extrabold
                      text-black
                      sm:text-[14px]
                      dark:text-white
                    "
                  >
                    Support Hours
                  </h2>

                  <p className="mt-0.5 text-[7px] text-gray-400">
                    Customer support availability
                  </p>
                </div>
              </div>

              <div
                className="
                  mt-4
                  space-y-2.5
                  border-t
                  border-gray-100
                  pt-4
                  dark:border-gray-800
                "
              >
                <SupportTime day="Monday - Friday" time="9:00 AM - 8:00 PM" />

                <SupportTime day="Saturday" time="10:00 AM - 6:00 PM" />

                <SupportTime day="Sunday" time="10:00 AM - 4:00 PM" />
              </div>

              <div
                className="
                  mt-4
                  flex
                  items-center
                  gap-2
                  rounded-lg
                  bg-green-50
                  px-3
                  py-2.5
                  dark:bg-green-500/10
                "
              >
                <span
                  className="
                    h-2
                    w-2
                    shrink-0
                    rounded-full
                    bg-green-500
                  "
                />

                <p className="text-[8px] font-semibold text-green-600">
                  Support team is currently online
                </p>
              </div>
            </div>

            {/* QUICK HELP */}
            <div
              className="
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-4
                sm:p-5
                dark:border-gray-800
                dark:bg-[#181818]
              "
            >
              <div className="flex items-center gap-2.5">
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
                  <FiHelpCircle size={15} />
                </div>

                <div>
                  <h2
                    className="
                      font-serif
                      text-[13px]
                      font-extrabold
                      text-black
                      sm:text-[14px]
                      dark:text-white
                    "
                  >
                    Quick Help
                  </h2>

                  <p className="mt-0.5 text-[7px] text-gray-400">
                    Find answers quickly
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <QuickHelp
                  href="/orders"
                  icon={<FiShoppingBag size={14} />}
                  title="Track Your Order"
                />

                <QuickHelp
                  href="/shipping"
                  icon={<FiTruck size={14} />}
                  title="Shipping Information"
                />

                <QuickHelp
                  href="/returns"
                  icon={<FiRefreshCw size={14} />}
                  title="Returns & Refunds"
                />

                <QuickHelp
                  href="/faq"
                  icon={<FiHelpCircle size={14} />}
                  title="Frequently Asked Questions"
                />
              </div>
            </div>
          </aside>
        </div>

        {/* ============================== */}
        {/* LOCATION */}
        {/* ============================== */}

        <section
          id="location"
          className="
            mt-4
            overflow-hidden
            rounded-2xl
            border
            border-gray-200
            bg-white
            dark:border-gray-800
            dark:bg-[#181818]
          "
        >
          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-[330px_minmax(0,1fr)]
            "
          >
            <div
              className="
                p-4
                sm:p-5
                lg:p-6
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
                <FiMapPin size={16} />
              </div>

              <h2
                className="
                  mt-3
                  font-serif
                  text-[15px]
                  font-extrabold
                  text-black
                  dark:text-white
                "
              >
                Visit Our Store
              </h2>

              <p
                className="
                  mt-1.5
                  text-[12px]
                  leading-4
                  text-gray-900
                  dark:text-gray-400
                "
              >
                Dubai, United Arab Emirates
                <br />
                Business Bay, Dubai
              </p>

              <a
                href="#"
                className="
                  mt-4
                  inline-flex
                  items-center
                  gap-1
                  text-[12px]
                  font-bold
                  text-[#967200]
                  hover:underline
                  dark:text-[#ffd83d]
                "
              >
                Get Directions
                <FiChevronRight size={10} />
              </a>
            </div>

            {/* MAP PLACEHOLDER */}
            <div
              className="
                flex
                min-h-55
                items-center
                justify-center
                bg-[#eeeeef]
                lg:min-h-65
                dark:bg-[#222]
              "
            >
              <div className="text-center">
                <FiMapPin
                  className="
                    mx-auto
                    text-gray-400
                  "
                  size={28}
                />

                <p
                  className="
                    mt-2
                    text-[9px]
                    font-semibold
                    text-gray-500
                  "
                >
                  Google Map
                </p>

                <p className="mt-0.5 text-[7px] text-gray-400">
                  Add your map embed here
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

/* ====================================================== */
/* CONTACT CARD */
/* ====================================================== */

const ContactCard = ({
  icon,
  title,
  text,
  subtext,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  subtext: string;
  href: string;
}) => {
  return (
    <Link
      href={href}
      className="
        group
        flex
        min-w-0
        flex-col
        rounded-xl
        border
        border-gray-200
        bg-white
        p-3
        transition-all
        hover:border-[#ffd83d]
        hover:shadow-[0_5px_18px_rgba(0,0,0,0.05)]
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
          transition
          group-hover:bg-[#ffd83d]
          group-hover:text-black
          dark:bg-[#2b260f]
          dark:text-[#ffd83d]
        "
      >
        {icon}
      </div>

      <h3
        className="
          mt-3
          font-serif
          text-[12px]
          font-bold
          text-black
          sm:text-[14px]
          dark:text-white
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-1
          truncate
          text-[8px]
          font-semibold
          text-gray-900
          sm:text-[12px]
          dark:text-gray-300
        "
      >
        {text}
      </p>

      <p className="mt-0.5 text-[10px] text-gray-900">{subtext}</p>
    </Link>
  );
};

/* ====================================================== */
/* INPUT */
/* ====================================================== */

const ContactInput = ({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) => {
  return (
    <div>
      <label
        className="
          mb-1.5
          block
          text-[8px]
          font-semibold
          text-gray-900
          sm:text-[12px]
          font-serif
          dark:text-gray-300
        "
      >
        {label}
      </label>

      <input
        type={type}
        required
        placeholder={placeholder}
        className="
          h-10
          w-full
          rounded-lg
          border
          border-gray-200
          bg-white
          px-3
          text-[9px]
          text-black
          outline-none
          transition
          placeholder:text-gray-400
          focus:border-[#ffd83d]
          sm:h-11
          sm:text-[10px]
          dark:border-gray-700
          dark:bg-[#202020]
          dark:text-white
        "
      />
    </div>
  );
};

/* ====================================================== */
/* SUPPORT TIME */
/* ====================================================== */

const SupportTime = ({ day, time }: { day: string; time: string }) => {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-3
      "
    >
      <span className="text-[12px] font-semibold text-gray-900 dark:text-gray-400">
        {day}
      </span>

      <span className="text-[12px] font-bold text-black dark:text-white">
        {time}
      </span>
    </div>
  );
};

/* ====================================================== */
/* QUICK HELP */
/* ====================================================== */

const QuickHelp = ({
  href,
  icon,
  title,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
}) => {
  return (
    <Link
      href={href}
      className="
        group
        flex
        items-center
        gap-2.5
        rounded-lg
        border
        border-gray-100
        bg-[#fafafa]
        px-3
        py-2.5
        transition
        hover:border-[#ffd83d]
        dark:border-gray-700
        dark:bg-[#202020]
      "
    >
      <span className="text-gray-400 transition group-hover:text-[#9a7600] dark:group-hover:text-[#ffd83d]">
        {icon}
      </span>

      <span
        className="
          min-w-0
          flex-1
          truncate
          text-[12px]
          font-semibold
          text-gray-900
          dark:text-gray-300
        "
      >
        {title}
      </span>

      <FiChevronRight
        size={11}
        className="
          shrink-0
          text-gray-900
          transition
          group-hover:translate-x-0.5
          group-hover:text-black
          dark:group-hover:text-white
        "
      />
    </Link>
  );
};

export default ContactUs;
