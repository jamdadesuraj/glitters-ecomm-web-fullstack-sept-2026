"use client";

import React, { useState } from "react";

import Link from "next/link";

import {
  FiArrowLeft,
  FiCheck,
  FiCreditCard,
  FiEdit2,
  FiMapPin,
  FiPackage,
  FiPlus,
  FiShield,
  FiSmartphone,
  FiTruck,
} from "react-icons/fi";
import OrderSummary from "./OrderSummary";

type PaymentMethod =
  | "card"
  | "upi"
  | "razorpay"
  | "tabby"
  | "cod"
  | "apple-pay";

type SavedAddress = {
  id: number;
  name: string;
  type: string;
  address: string;
  phone: string;
  isDefault?: boolean;
};

const savedAddresses: SavedAddress[] = [
  {
    id: 1,
    name: "John Doe",
    type: "Home",
    address:
      "Apartment 1204, Marina Heights Tower, Dubai Marina, Dubai, United Arab Emirates",
    phone: "+971 50 123 4567",
    isDefault: true,
  },
  {
    id: 2,
    name: "John Doe",
    type: "Office",
    address:
      "Office 504, Business Bay Tower, Business Bay, Dubai, United Arab Emirates",
    phone: "+971 55 987 6543",
  },
];

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");

  const [selectedAddress, setSelectedAddress] = useState(1);

  const [useDifferentAddress, setUseDifferentAddress] = useState(false);

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

        <div
          className="
            mb-5
            flex
            items-center
            justify-between
            gap-3
          "
        >
          <div>
            <h1
              className="
                font-serif
                text-[20px]
                font-extrabold
                text-black

                sm:text-[24px]

                lg:text-[28px]

                dark:text-white
              "
            >
              Checkout
            </h1>

            <p
              className="
                mt-1
                text-[9px]
                text-gray-500

                sm:text-[10px]

                dark:text-gray-400
              "
            >
              Complete your order securely
            </p>
          </div>

          <Link
            href="/cart"
            className="
              flex
              items-center
              gap-1.5
              text-[9px]
              font-bold
              text-gray-600
              transition

              hover:text-black

              sm:text-[10px]

              dark:text-gray-300
              dark:hover:text-white
            "
          >
            <FiArrowLeft size={13} />
            Back to Cart
          </Link>
        </div>

        {/* ============================== */}
        {/* CHECKOUT STEPS */}
        {/* ============================== */}

        <div
          className="
            mb-5
            flex
            items-center
            overflow-hidden
            rounded-xl
            border
            border-gray-200
            bg-white
            p-3

            dark:border-gray-800
            dark:bg-[#181818]
          "
        >
          <div className="flex flex-1 items-center gap-2">
            <span
              className="
                flex
                h-7
                w-7
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#ffd83d]
                text-black
              "
            >
              <FiCheck size={13} />
            </span>

            <div className="hidden min-[420px]:block">
              <p className="text-[12px] font-serif font-bold text-black dark:text-white">
                Cart
              </p>

              <p className="text-[10px] text-gray-900">Completed</p>
            </div>
          </div>

          <div className="h-px flex-1 bg-[#ffd83d]" />

          <div
            className="
              flex
              flex-1
              items-center
              justify-center
              gap-2
            "
          >
            <span
              className="
                flex
                h-7
                w-7
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#ffd83d]
                text-[9px]
                font-bold
                text-black
              "
            >
              2
            </span>

            <div className="hidden min-[420px]:block">
              <p className="text-[12px] font-serif font-bold text-black dark:text-white">
                Checkout
              </p>

              <p className="text-[10px] text-gray-900">Shipping & Payment</p>
            </div>
          </div>

          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />

          <div
            className="
              flex
              flex-1
              items-center
              justify-end
              gap-2
            "
          >
            <span
              className="
                flex
                h-7
                w-7
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-gray-100
                text-[9px]
                font-bold
                text-gray-400

                dark:bg-[#252525]
              "
            >
              3
            </span>

            <div className="hidden min-[420px]:block">
              <p className="text-[12px] font-serif font-bold text-gray-400">
                Complete
              </p>

              <p className="text-[10px] text-gray-900">Order placed</p>
            </div>
          </div>
        </div>

        {/* ============================== */}
        {/* LAYOUT */}
        {/* ============================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-4

            lg:grid-cols-[minmax(0,1fr)_350px]

            xl:grid-cols-[minmax(0,1fr)_390px]
            xl:gap-6
          "
        >
          {/* ============================== */}
          {/* LEFT */}
          {/* ============================== */}

          <div className="min-w-0 space-y-4">
            {/* ============================== */}
            {/* SHIPPING ADDRESS */}
            {/* ============================== */}

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
              <div
                className="
                  mb-4
                  flex
                  items-start
                  justify-between
                  gap-3
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
                      bg-[#fff6ce]
                      text-[#8b6a00]

                      dark:bg-[#2b260f]
                      dark:text-[#ffd83d]
                    "
                  >
                    <FiMapPin size={15} />
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
                      Shipping Address
                    </h2>

                    <p className="mt-0.5 text-[10px] text-gray-900">
                      Choose your delivery address
                    </p>
                  </div>
                </div>

                {!useDifferentAddress && (
                  <button
                    type="button"
                    onClick={() => setUseDifferentAddress(true)}
                    className="
                      flex
                      shrink-0
                      cursor-pointer
                      items-center
                      gap-1
                      rounded-lg
                      border
                      border-gray-200
                      bg-white
                      px-2.5
                      py-2
                      text-[8px]
                      font-bold
                      text-gray-900
                      transition
                      font-serif
                      hover:border-[#ffd83d]
                      hover:text-black

                      dark:border-gray-700
                      dark:bg-[#202020]
                      dark:text-gray-300
                    "
                  >
                    <FiPlus size={11} />

                    <span className="hidden sm:inline">Different Address</span>

                    <span className="sm:hidden">New</span>
                  </button>
                )}
              </div>

              {!useDifferentAddress ? (
                <div className="space-y-2.5">
                  {savedAddresses.map((address) => {
                    const active = selectedAddress === address.id;

                    return (
                      <button
                        key={address.id}
                        type="button"
                        onClick={() => setSelectedAddress(address.id)}
                        className={`
                            relative
                            flex
                            w-full
                            cursor-pointer
                            items-start
                            gap-3
                            rounded-xl
                            border
                            p-3
                            text-left
                            transition-all

                            sm:p-4

                            ${
                              active
                                ? `
                                  border-[#ffd83d]
                                  bg-[#fffdf4]
                                  shadow-[0_3px_14px_rgba(255,216,61,0.08)]

                                  dark:bg-[#29260f]
                                `
                                : `
                                  border-gray-200
                                  bg-white

                                  hover:border-gray-300

                                  dark:border-gray-700
                                  dark:bg-[#202020]
                                `
                            }
                          `}
                      >
                        <span
                          className={`
                              mt-1
                              flex
                              h-4
                              w-4
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              border

                              ${
                                active
                                  ? "border-[#ffd83d] bg-[#ffd83d]"
                                  : "border-gray-300 dark:border-gray-600"
                              }
                            `}
                        >
                          {active && (
                            <FiCheck size={9} className="text-black" />
                          )}
                        </span>

                        <div className="min-w-0 flex-1">
                          <div
                            className="
                                flex
                                flex-wrap
                                items-center
                                gap-1.5
                              "
                          >
                            <h3
                              className="
                                  text-[10px]
                                  font-bold
                                  text-black
                                  font-serif
                                  sm:text-[11px]

                                  dark:text-white
                                "
                            >
                              {address.name}
                            </h3>

                            <span
                              className="
                                  rounded-full
                                  bg-[#fff4be]
                                  px-2
                                  py-0.5
                                  text-[10px]
                                  font-bold
                                  text-gray-900

                                  dark:bg-[#332c0b]
                                  dark:text-[#ffd83d]
                                "
                            >
                              {address.type}
                            </span>

                            {address.isDefault && (
                              <span
                                className="
                                    rounded-full
                                    bg-green-50
                                    px-2
                                    py-0.5
                                    text-[7px]
                                    font-bold
                                    text-green-600

                                    dark:bg-green-500/10
                                  "
                              >
                                Default
                              </span>
                            )}
                          </div>

                          <p
                            className="
                                mt-1.5
                                max-w-175
                                text-[8px]
                                leading-4
                                text-gray-900

                                sm:text-[10px]

                                dark:text-gray-400
                              "
                          >
                            {address.address}
                          </p>

                          <p
                            className="
                                mt-1
                                text-[10px]
                                font-semibold
                                text-gray-900
                                font-serif
                                dark:text-gray-300
                              "
                          >
                            {address.phone}
                          </p>
                        </div>

                        <span
                          className="
                              flex
                              h-8
                              w-8
                              shrink-0
                              items-center
                              justify-center
                              rounded-lg
                              border
                              border-gray-200
                              bg-blue-300
                              text-white

                              dark:border-gray-700
                              dark:bg-[#252525]
                              dark:text-gray-300
                            "
                          onClick={(event) => {
                            event.stopPropagation();

                            setUseDifferentAddress(true);
                          }}
                        >
                          <FiEdit2 size={11} />
                        </span>
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() => setUseDifferentAddress(true)}
                    className="
                      flex
                      w-full
                      cursor-pointer
                      items-center
                      justify-center
                      gap-1.5
                      rounded-xl
                      border
                      border-dashed
                      border-gray-300
                      px-3
                      py-3
                      text-[12px]
                      font-bold
                      text-gray-900
                      transition
                      font-serif
                      hover:border-[#ffd83d]
                      hover:text-black

                      dark:border-gray-700
                      dark:text-gray-400
                      dark:hover:text-white
                    "
                  >
                    <FiPlus size={11} />
                    Add New Address
                  </button>
                </div>
              ) : (
                /* ============================== */
                /* DIFFERENT ADDRESS FORM */
                /* ============================== */

                <div>
                  <div
                    className="
                      mb-4
                      flex
                      items-center
                      justify-between
                      gap-3
                      rounded-lg
                      bg-[#f8f8f8]
                      px-3
                      py-2.5

                      dark:bg-[#202020]
                    "
                  >
                    <div>
                      <p
                        className="
                          text-[9px]
                          font-bold
                          text-black

                          dark:text-white
                        "
                      >
                        Add Different Address
                      </p>

                      <p className="mt-0.5 text-[7px] text-gray-400">
                        Enter shipping details
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setUseDifferentAddress(false)}
                      className="
                        cursor-pointer
                        text-[8px]
                        font-bold
                        text-[#9a7600]

                        hover:underline

                        dark:text-[#ffd83d]
                      "
                    >
                      Saved Address
                    </button>
                  </div>

                  <div
                    className="
                      grid
                      grid-cols-1
                      gap-3

                      sm:grid-cols-2
                    "
                  >
                    <CheckoutInput
                      label="First Name"
                      placeholder="First name"
                    />

                    <CheckoutInput label="Last Name" placeholder="Last name" />

                    <CheckoutInput
                      label="Email Address"
                      placeholder="example@email.com"
                      type="email"
                    />

                    <CheckoutInput
                      label="Phone Number"
                      placeholder="+971 50 123 4567"
                      type="tel"
                    />

                    <div className="sm:col-span-2">
                      <CheckoutInput
                        label="Address"
                        placeholder="Building, street, apartment"
                      />
                    </div>

                    <CheckoutInput
                      label="City / Area"
                      placeholder="Enter city or area"
                    />

                    <div className="sm:col-span-2">
                      <label
                        className="
                          mb-1.5
                          block
                          text-[10px]
                          font-semibold
                          text-gray-900
                          font-serif
                          dark:text-gray-300
                        "
                      >
                        Delivery Instructions
                        <span className="ml-1 font-normal text-gray-400">
                          (Optional)
                        </span>
                      </label>

                      <textarea
                        rows={3}
                        placeholder="Add delivery instructions..."
                        className="
                          w-full
                          resize-none
                          rounded-lg
                          border
                          border-gray-200
                          bg-white
                          p-3
                          text-[9px]
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
                  </div>

                  <label
                    className="
                      mt-3
                      flex
                      cursor-pointer
                      items-center
                      gap-2
                    "
                  >
                    <input
                      type="checkbox"
                      className="h-3.5 w-3.5 accent-[#ffd83d]"
                    />

                    <span className="text-[8px] text-gray-500 dark:text-gray-400">
                      Save this address for future orders
                    </span>
                  </label>
                </div>
              )}
            </section>

            {/* ============================== */}
            {/* DELIVERY METHOD */}
            {/* ============================== */}

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
              <SectionHeading
                icon={<FiTruck size={15} />}
                title="Delivery Method"
                subtitle="Choose your preferred delivery"
              />

              <label
                className="
                  flex
                  cursor-pointer
                  items-center
                  gap-3
                  rounded-xl
                  border
                  border-[#ffd83d]
                  bg-[#fffdf3]
                  p-3

                  dark:bg-[#29260f]
                "
              >
                <input
                  type="radio"
                  checked
                  readOnly
                  className="h-4 w-4 accent-[#ffd83d]"
                />

                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-white
                    shadow-sm

                    dark:bg-[#202020]
                    dark:text-white
                  "
                >
                  <FiPackage size={16} />
                </div>

                <div className="min-w-0 flex-1">
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      gap-3
                    "
                  >
                    <p className="text-[12px]  font-serif font-bold text-black dark:text-white">
                      Standard Delivery
                    </p>

                    <span className="text-[8px] font-bold text-green-600">
                      FREE
                    </span>
                  </div>

                  <p className="mt-0.5 text-[10px] text-gray-900">
                    Estimated delivery in 2-4 business days
                  </p>
                </div>
              </label>
            </section>

            {/* ============================== */}
            {/* PAYMENT METHODS */}
            {/* ============================== */}

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
              <SectionHeading
                icon={<FiCreditCard size={15} />}
                title="Payment Method"
                subtitle="Choose your preferred payment option"
              />

              <div
                className="
                  grid
                  grid-cols-1
                  gap-2

                  sm:grid-cols-2
                "
              >
                <PaymentCard
                  active={paymentMethod === "card"}
                  onClick={() => setPaymentMethod("card")}
                  icon={<FiCreditCard size={16} />}
                  title="Credit / Debit Card"
                  subtitle="Visa, Mastercard & more"
                />

                <PaymentCard
                  active={paymentMethod === "upi"}
                  onClick={() => setPaymentMethod("upi")}
                  icon={<FiSmartphone size={16} />}
                  title="UPI"
                  subtitle="Pay using your UPI ID"
                />

                <PaymentCard
                  active={paymentMethod === "razorpay"}
                  onClick={() => setPaymentMethod("razorpay")}
                  icon={
                    <span
                      className="
                        text-[8px]
                        font-extrabold
                        text-[#2b59c3]
                      "
                    >
                      RZP
                    </span>
                  }
                  title="Razorpay"
                  subtitle="Cards, UPI & wallets"
                />

                <PaymentCard
                  active={paymentMethod === "tabby"}
                  onClick={() => setPaymentMethod("tabby")}
                  icon={
                    <span
                      className="
                        text-[8px]
                        font-extrabold
                        text-black
                      "
                    >
                      tabby
                    </span>
                  }
                  title="Tabby"
                  subtitle="Buy now, pay later"
                />

                <PaymentCard
                  active={paymentMethod === "cod"}
                  onClick={() => setPaymentMethod("cod")}
                  icon={<FiPackage size={16} />}
                  title="Cash on Delivery"
                  subtitle="Pay when order arrives"
                />

                <PaymentCard
                  active={paymentMethod === "apple-pay"}
                  onClick={() => setPaymentMethod("apple-pay")}
                  icon={<span className="text-[8px] font-bold">Pay</span>}
                  title="Apple Pay"
                  subtitle="Fast secure checkout"
                />
              </div>

              {/* CARD DETAILS */}
              {paymentMethod === "card" && (
                <div
                  className="
                    mt-3
                    grid
                    grid-cols-1
                    gap-3
                    rounded-xl
                    border
                    border-gray-200
                    bg-[#fafafa]
                    p-3

                    sm:grid-cols-2

                    dark:border-gray-700
                    dark:bg-[#202020]
                  "
                >
                  <div className="sm:col-span-2">
                    <CheckoutInput
                      label="Card Number"
                      placeholder="0000 0000 0000 0000"
                    />
                  </div>

                  <CheckoutInput label="Expiry Date" placeholder="MM / YY" />

                  <CheckoutInput
                    label="CVV"
                    placeholder="•••"
                    type="password"
                  />
                </div>
              )}

              {/* UPI */}
              {paymentMethod === "upi" && (
                <div
                  className="
                    mt-3
                    rounded-xl
                    border
                    border-gray-200
                    bg-[#fafafa]
                    p-3

                    dark:border-gray-700
                    dark:bg-[#202020]
                  "
                >
                  <label className="mb-1.5 block text-[8px] font-semibold text-gray-500">
                    UPI ID
                  </label>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="username@bank"
                      className="
                        h-10
                        min-w-0
                        flex-1
                        rounded-lg
                        border
                        border-gray-200
                        bg-white
                        px-3
                        text-[9px]
                        outline-none

                        focus:border-[#ffd83d]

                        dark:border-gray-700
                        dark:bg-[#181818]
                        dark:text-white
                      "
                    />

                    <button
                      type="button"
                      className="
                        h-10
                        shrink-0
                        cursor-pointer
                        rounded-lg
                        bg-[#ffd83d]
                        px-4
                        text-[8px]
                        font-bold
                        text-black

                        hover:bg-[#ffcf12]
                      "
                    >
                      Verify
                    </button>
                  </div>
                </div>
              )}

              {paymentMethod === "razorpay" && (
                <PaymentInfo
                  title="Pay securely with Razorpay"
                  text="Click Place Order to continue to the Razorpay secure payment window."
                />
              )}

              {paymentMethod === "tabby" && (
                <PaymentInfo
                  title="Pay later with Tabby"
                  text="Continue with Tabby to check eligibility and available installment options."
                />
              )}

              {paymentMethod === "cod" && (
                <PaymentInfo
                  title="Cash on Delivery"
                  text="Pay for your order when it is delivered to your address."
                />
              )}

              {paymentMethod === "apple-pay" && (
                <PaymentInfo
                  title="Pay with Apple Pay"
                  text="You will be asked to confirm payment using Apple Pay."
                />
              )}
            </section>
          </div>

          {/* ============================== */}
          {/* ORDER SUMMARY */}
          {/* ============================== */}

          <OrderSummary />
        </div>
      </div>
    </main>
  );
};

/* ====================================================== */
/* INPUT */
/* ====================================================== */

const CheckoutInput = ({
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
          text-[10px]
          font-semibold
          text-gray-900
          font-serif    
          dark:text-gray-300
        "
      >
        {label}
      </label>

      <input
        type={type}
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

          dark:border-gray-700
          dark:bg-[#202020]
          dark:text-white
        "
      />
    </div>
  );
};

/* ====================================================== */
/* SECTION HEADING */
/* ====================================================== */

const SectionHeading = ({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="mb-4 flex items-center gap-2.5">
      <div
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
        {icon}
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
          {title}
        </h2>

        <p className="mt-0.5 text-[10px] text-gray-900">{subtitle}</p>
      </div>
    </div>
  );
};

/* ====================================================== */
/* PAYMENT CARD */
/* ====================================================== */

const PaymentCard = ({
  active,
  onClick,
  icon,
  title,
  subtitle,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex
        min-w-0
        cursor-pointer
        items-center
        gap-2.5
        rounded-xl
        border
        p-3
        text-left
        transition-all

        ${
          active
            ? `
              border-[#ffd83d]
              bg-[#fffdf3]
              shadow-[0_3px_12px_rgba(255,216,61,0.08)]

              dark:bg-[#29260f]
            `
            : `
              border-gray-200
              bg-white

              hover:border-gray-300

              dark:border-gray-700
              dark:bg-[#202020]
            `
        }
      `}
    >
      <span
        className="
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-lg
          bg-[#f5f5f5]
          text-gray-700

          dark:bg-[#292929]
          dark:text-gray-200
        "
      >
        {icon}
      </span>

      <span className="min-w-0 flex-1">
        <span
          className="
            block
            truncate
            text-[9px]
            font-bold
            text-black
              font-serif
            sm:text-[10px]

            dark:text-white
          "
        >
          {title}
        </span>

        <span
          className="
            mt-0.5
            block
            truncate
            text-[10px]
            text-gray-900
          "
        >
          {subtitle}
        </span>
      </span>

      <span
        className={`
          flex
          h-4
          w-4
          shrink-0
          items-center
          justify-center
          rounded-full
          border

          ${
            active
              ? `
                border-[#ffd83d]
                bg-[#ffd83d]
                text-black
              `
              : `
                border-gray-300

                dark:border-gray-600
              `
          }
        `}
      >
        {active && <FiCheck size={9} />}
      </span>
    </button>
  );
};

/* ====================================================== */
/* PAYMENT INFO */
/* ====================================================== */

const PaymentInfo = ({ title, text }: { title: string; text: string }) => {
  return (
    <div
      className="
        mt-3
        flex
        items-start
        gap-2.5
        rounded-xl
        border
        border-gray-200
        bg-[#fafafa]
        p-3

        dark:border-gray-700
        dark:bg-[#202020]
      "
    >
      <FiShield
        className="
          mt-0.5
          shrink-0
          text-green-600
        "
        size={14}
      />

      <div>
        <p
          className="
            text-[9px]
            font-bold
            text-black

            dark:text-white
          "
        >
          {title}
        </p>

        <p
          className="
            mt-1
            text-[8px]
            leading-3.5
            text-gray-400
          "
        >
          {text}
        </p>
      </div>
    </div>
  );
};

export default Checkout;
