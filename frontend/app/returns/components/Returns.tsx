"use client";

import React, { useState } from "react";
import Link from "next/link";

import {
  FiCheckCircle,
  FiClock,
  FiHelpCircle,
  FiPackage,
  FiRefreshCw,
  FiShield,
  FiTruck,
  FiXCircle,
} from "react-icons/fi";
import ThemeBtnOne from "@/app/components/ThemeBtnOne";

const Returns = () => {
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
              -right-20
              -top-20
              h-60
              w-60
              rounded-full
              bg-[#ffd83d]/10
              blur-3xl
            "
          />

          <div className="relative max-w-190">
            <span
              className="
                inline-flex
                items-center
                gap-1.5
                rounded-full
                bg-[#fff6ce]
                px-2.5
                py-1
                text-[12px]
                font-bold
                text-[#806300]
                sm:text-[12px]
                dark:bg-[#2b260f]
                dark:text-[#ffd83d]
              "
            >
              <FiRefreshCw size={11} />
              Easy returns
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
              Returns & Refunds
            </h1>

            <p
              className="
                mt-2
                max-w-162.5
                text-[12px]
                leading-5
                text-gray-500
                sm:text-[12px]
                lg:text-[11px]
                dark:text-gray-400
              "
            >
              Not satisfied with your purchase? Check the return eligibility,
              submit your request and follow the return process below.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <ThemeBtnOne
                text="Start a Return"
                icon={<FiHelpCircle />}
                url="#return-request"
                className="
                  flex
                  h-10
                  items-center
                  justify-center
                  gap-1.5
                  rounded-xl
                  bg-[#ffd83d]
                  px-4
                  text-[12px]
                  font-extrabold
                  text-black
                  font-serif
                  transition
                  hover:bg-[#ffcf12]
                "
              />

              <Link
                href="/contact-us"
                className="
                  flex
                  h-10
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  px-4
                  text-[12px]
                     font-serif
                  font-bold
                  text-gray-600
                  transition
                  hover:border-[#ffd83d]
                  hover:text-black
                  dark:border-gray-700
                  dark:bg-[#202020]
                  dark:text-gray-300
                "
              >
                Contact Support
              </Link>
            </div>
          </div>
        </section>

        {/* QUICK INFO */}
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
            icon={<FiRefreshCw size={16} />}
            title="Easy Returns"
            text="Simple return request process."
          />

          <InfoCard
            icon={<FiTruck size={16} />}
            title="Pickup Support"
            text="Pickup may be available for eligible orders."
          />

          <InfoCard
            icon={<FiShield size={16} />}
            title="Secure Refunds"
            text="Approved refunds are sent securely."
          />

          <InfoCard
            icon={<FiClock size={16} />}
            title="Quick Processing"
            text="Returns are reviewed after receiving the item."
          />
        </section>

        {/* RETURN STEPS */}
        <section
          className="
            mt-4
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
          <div>
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
              How Returns Work
            </h2>

            <p className="mt-1 text-[12px] text-gray-400 sm:text-[12px]">
              Complete your return in four simple steps.
            </p>
          </div>

          <div
            className="
              mt-5
              grid
              grid-cols-1
              gap-3
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            <StepCard
              number="01"
              icon={<FiPackage size={16} />}
              title="Select Product"
              text="Choose the eligible product you want to return."
            />

            <StepCard
              number="02"
              icon={<FiRefreshCw size={16} />}
              title="Submit Request"
              text="Choose a reason and submit your return request."
            />

            <StepCard
              number="03"
              icon={<FiTruck size={16} />}
              title="Return Product"
              text="Prepare the product for pickup or return shipping."
            />

            <StepCard
              number="04"
              icon={<FiCheckCircle size={16} />}
              title="Receive Refund"
              text="Refund is processed after approval and inspection."
            />
          </div>
        </section>

        {/* MAIN GRID */}
        <div
          className="
            mt-4
            grid
            grid-cols-1
            gap-4
            lg:grid-cols-[minmax(0,1fr)_350px]
            xl:grid-cols-[minmax(0,1fr)_390px]
            xl:gap-6
          "
        >
          {/* LEFT */}
          <div className="min-w-0 space-y-4">
            {/* ELIGIBILITY */}
            <section
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
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-green-50
                    text-green-600
                    dark:bg-green-500/10
                  "
                >
                  <FiCheckCircle size={15} />
                </div>

                <div>
                  <h2
                    className="
                      font-serif
                      text-[14px]
                      font-extrabold
                      text-black
                      sm:text-[16px]
                      dark:text-white
                    "
                  >
                    Eligible for Return
                  </h2>

                  <p className="mt-0.5 text-[12px] text-gray-400">
                    A product may be eligible when these conditions are met.
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2.5">
                <CheckItem text="Product is within the applicable return period." />
                <CheckItem text="Product is unused and in acceptable condition." />
                <CheckItem text="Original packaging, accessories and manuals are available." />
                <CheckItem text="Proof of purchase or valid order number is available." />
                <CheckItem text="Product category is eligible under the return policy." />
              </div>
            </section>

            {/* NOT ELIGIBLE */}
            <section
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
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-gray-100
                    text-gray-500
                    dark:bg-[#252525]
                  "
                >
                  <FiXCircle size={15} />
                </div>

                <div>
                  <h2
                    className="
                      font-serif
                      text-[14px]
                      font-extrabold
                      text-black
                      sm:text-[16px]
                      dark:text-white
                    "
                  >
                    Non-Returnable Products
                  </h2>

                  <p className="mt-0.5 text-[12px] text-gray-400">
                    Some products may not be eligible for return.
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2.5">
                <NeutralItem text="Products damaged due to misuse or accidental damage." />
                <NeutralItem text="Items missing original packaging or accessories." />
                <NeutralItem text="Products outside the applicable return period." />
                <NeutralItem text="Certain hygiene-sensitive or personalised products." />
                <NeutralItem text="Products marked as non-returnable at the time of purchase." />
              </div>
            </section>

            {/* RETURN REQUEST */}
            <section
              id="return-request"
              className="
                scroll-mt-27.5
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
                  Request a Return
                </h2>

                <p className="mt-1 text-[12px] text-gray-400 sm:text-[12px]">
                  Enter your order details to submit a return request.
                </p>
              </div>

              {submitted ? (
                <div
                  className="
                    flex
                    min-h-75
                    flex-col
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-dashed
                    border-green-200
                    bg-green-50/40
                    px-4
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
                      text-[15px]
                      font-extrabold
                      text-black
                      dark:text-white
                    "
                  >
                    Return Request Submitted
                  </h3>

                  <p
                    className="
                      mt-1
                      max-w-85
                      text-[12px]
                      leading-4
                      text-gray-500
                      dark:text-gray-400
                    "
                  >
                    Your return request has been received. Our team will review
                    the request and provide the next steps.
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
                      text-[12px]
                      font-extrabold
                      text-black
                    "
                  >
                    Submit Another Request
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
                  <ReturnInput
                    label="Order Number"
                    placeholder="Example: ORD-123456"
                  />

                  <ReturnInput
                    label="Email Address"
                    placeholder="example@email.com"
                    type="email"
                  />

                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-[12px]  font-serif font-semibold text-gray-900 dark:text-gray-300">
                      Product
                    </label>

                    <select
                      required
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
                       
                        focus:border-[#ffd83d]
                        sm:h-11
                        dark:border-gray-700
                        dark:bg-[#202020]
                        dark:text-white
                      "
                    >
                      <option value="" disabled>
                        Select product
                      </option>

                      <option>Apple iPhone 16 Pro Max 256GB</option>

                      <option>Apple AirPods Pro 2nd Generation</option>

                      <option>Samsung Galaxy Watch Ultra</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-[12px] font-semibold text-gray-900 font-serif dark:text-gray-300">
                      Reason for Return
                    </label>

                    <select
                      required
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
                        focus:border-[#ffd83d]
                        sm:h-11
                        dark:border-gray-700
                        dark:bg-[#202020]
                        dark:text-white
                      "
                    >
                      <option value="" disabled>
                        Select reason
                      </option>

                      <option>Product damaged</option>

                      <option>Wrong product received</option>

                      <option>Product not as expected</option>

                      <option>Missing accessories</option>

                      <option>Changed my mind</option>

                      <option>Other</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-[12px] font-semibold text-gray-900 font-serif dark:text-gray-300">
                      Additional Details
                    </label>

                    <textarea
                      rows={4}
                      placeholder="Tell us more about the issue..."
                      className="
                        w-full
                        resize-none
                        rounded-lg
                        border
                        border-gray-200
                        bg-white
                        p-3
                        text-[12px]
                        leading-4
                        text-black
                        outline-none
                        placeholder:text-gray-400
                        focus:border-[#ffd83d]
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

                      <span className="text-[12px] leading-4 text-gray-900">
                        I confirm that the information provided is correct.
                      </span>
                    </label>

                    <ThemeBtnOne
                      type="submit"
                      icon={<FiRefreshCw size={12} />}
                      text=" Submit Return"
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
                        text-[12px]
                        font-extrabold
                        text-black
                        transition
                        hover:bg-[#ffcf12]
                        sm:h-11
                        sm:min-w-38.75
                      "
                    />
                  </div>
                </form>
              )}
            </section>
          </div>

          {/* SIDEBAR */}
          <aside className="min-w-0 space-y-4">
            {/* REFUND TIMELINE */}
            <div
              className="
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-4
                sm:p-5
                lg:sticky
                lg:top-25
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
                      dark:text-white
                    "
                  >
                    Refund Timeline
                  </h2>

                  <p className="mt-0.5 text-[10px] text-gray-400">
                    Typical return process
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <TimelineItem
                  number="1"
                  title="Return Requested"
                  text="Request submitted for review."
                />

                <TimelineItem
                  number="2"
                  title="Product Received"
                  text="Returned product reaches our team."
                />

                <TimelineItem
                  number="3"
                  title="Inspection"
                  text="Product condition is reviewed."
                />

                <TimelineItem
                  number="4"
                  title="Refund Processed"
                  text="Approved refund is initiated."
                  last
                />
              </div>

              <div
                className="
                  mt-4
                  rounded-xl
                  bg-[#f8f8f8]
                  p-3
                  dark:bg-[#202020]
                "
              >
                <p className="text-[12px] font-bold text-black dark:text-white">
                  Refund Processing
                </p>

                <p className="mt-1 text-[10px] leading-4 text-gray-400">
                  Final refund timing can depend on the original payment method
                  and payment provider.
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* BOTTOM NOTICE */}
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
              Questions about your return?
            </h2>

            <p className="mt-1 text-[12px] text-gray-400 sm:text-[12px]">
              Our customer support team is available to help.
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
              rounded-xl
              bg-[#ffd83d]
              px-5
              text-[12px]
              font-extrabold
              text-black
              transition
              hover:bg-[#ffcf12]
            "
          >
            Contact Us
          </Link>
        </section>
      </div>
    </main>
  );
};

/* ============================= */
/* INFO CARD */
/* ============================= */

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
          text-[12px]
          font-bold
          text-black
          sm:text-[12px]
          dark:text-white
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-1
          text-[10px]
          leading-3.5
          text-gray-400
          sm:text-[12px]
        "
      >
        {text}
      </p>
    </div>
  );
};

/* ============================= */
/* STEP CARD */
/* ============================= */

const StepCard = ({
  number,
  icon,
  title,
  text,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  text: string;
}) => {
  return (
    <div
      className="
        relative
        rounded-xl
        border
        border-gray-200
        bg-[#fafafa]
        p-3
        sm:p-4
        dark:border-gray-700
        dark:bg-[#202020]
      "
    >
      <span
        className="
          absolute
          right-3
          top-3
          text-[12px]
          font-extrabold
          text-gray-900
          dark:text-gray-700
        "
      >
        {number}
      </span>

      <div
        className="
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-lg
          bg-[#ffd83d]
          text-black
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
          dark:text-white
        "
      >
        {title}
      </h3>

      <p className="mt-1 text-[10px] leading-4 text-gray-900">{text}</p>
    </div>
  );
};

/* ============================= */
/* CHECK ITEM */
/* ============================= */

const CheckItem = ({ text }: { text: string }) => {
  return (
    <div className="flex items-start gap-2">
      <FiCheckCircle
        size={12}
        className="
          mt-0.5
          shrink-0
          text-green-600
        "
      />

      <span className="text-[12px] leading-4 text-gray-500 sm:text-[12px] dark:text-gray-400">
        {text}
      </span>
    </div>
  );
};

/* ============================= */
/* NEUTRAL ITEM */
/* ============================= */

const NeutralItem = ({ text }: { text: string }) => {
  return (
    <div className="flex items-start gap-2">
      <FiXCircle
        size={12}
        className="
          mt-0.5
          shrink-0
          text-gray-400
        "
      />

      <span className="text-[12px] leading-4 text-gray-500 sm:text-[12px] dark:text-gray-400">
        {text}
      </span>
    </div>
  );
};

/* ============================= */
/* INPUT */
/* ============================= */

const ReturnInput = ({
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
      <label className="mb-1.5 block text-[12px] font-semibold font-serif text-gray-900 dark:text-gray-300">
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
          text-[12px]
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
  );
};

/* ============================= */
/* TIMELINE ITEM */
/* ============================= */

const TimelineItem = ({
  number,
  title,
  text,
  last = false,
}: {
  number: string;
  title: string;
  text: string;
  last?: boolean;
}) => {
  return (
    <div className="relative flex gap-3">
      {!last && (
        <span
          className="
            absolute
            left-3.25
            top-7
            h-[calc(100%-8px)]
            w-px
            bg-gray-200
            dark:bg-gray-700
          "
        />
      )}

      <span
        className="
          relative
          z-10
          flex
          h-7
          w-7
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-[#fff6ce]
          text-[12px]
          font-extrabold
          text-[#806300]
          dark:bg-[#2b260f]
          dark:text-[#ffd83d]
        "
      >
        {number}
      </span>

      <div className={last ? "" : "pb-5"}>
        <p className="text-[12px] font-bold text-black dark:text-white">
          {title}
        </p>

        <p className="mt-0.5 text-[10px] leading-4 text-gray-400">{text}</p>
      </div>
    </div>
  );
};

export default Returns;
