"use client";

import React from "react";
import Link from "next/link";
import {
  FiArrowRight,
  FiCheckCircle,
  FiHeart,
  FiPackage,
  FiRefreshCw,
  FiShield,
  FiShoppingBag,
  FiStar,
  FiTruck,
  FiUsers,
} from "react-icons/fi";
import ThemeBtnOne from "@/app/components/ThemeBtnOne";

const AboutUs = () => {
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
            sm:py-10
            lg:px-10
            lg:py-14
            dark:border-gray-800
            dark:bg-[#181818]
          "
        >
          <div
            className="
              absolute
              -right-24
              -top-24
              h-72
              w-72
              rounded-full
              bg-[#ffd83d]/15
              blur-3xl
            "
          />

          <div
            className="
              absolute
              -bottom-24
              left-1/3
              h-60
              w-60
              rounded-full
              bg-[#ffd83d]/5
              blur-3xl
            "
          />

          <div
            className="
              relative
              grid
              grid-cols-1
              items-center
              gap-7
              lg:grid-cols-[minmax(0,1fr)_420px]
              xl:grid-cols-[minmax(0,1fr)_480px]
            "
          >
            {/* LEFT */}
            <div className="max-w-180">
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
                <FiHeart size={11} />
                About our store
              </span>

              <h1
                className="
                  mt-3
                  font-serif
                  text-[24px]
                  font-extrabold
                  leading-tight
                  text-black
                  sm:text-[30px]
                  lg:text-[38px]
                  dark:text-white
                "
              >
                Making Online Shopping
                <span className="text-[#b38900] dark:text-[#ffd83d]">
                  {" "}
                  Simple, Reliable & Better
                </span>
              </h1>

              <p
                className="
                  mt-3
                  max-w-162.5
                  text-[9px]
                  leading-5
                  text-gray-900
                  sm:text-[10px]
                  sm:leading-5
                  lg:text-[12px]
                  dark:text-gray-400
                "
              >
                We are an ecommerce platform focused on making everyday shopping
                easier with quality products, competitive prices, secure
                payments and dependable customer support.
              </p>

              <div
                className="
                  mt-5
                  flex
                  flex-wrap
                  gap-2
                "
              >
                <ThemeBtnOne
                  text=" Start Shopping"
                  icon={<FiShoppingBag />}
                  url="/products"
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
                    font-bold
                    font-serif
                    text-gray-600
                    transition
                    hover:border-[#ffd83d]
                    hover:text-black
                    dark:border-gray-700
                    dark:bg-[#202020]
                    dark:text-gray-300
                  "
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* RIGHT VISUAL */}
            <div
              className="
                relative
                overflow-hidden
                rounded-2xl
                border
                border-gray-200
                bg-[#fafafa]
                p-4
                sm:p-5
                dark:border-gray-700
                dark:bg-[#202020]
              "
            >
              <div
                className="
                  grid
                  grid-cols-2
                  gap-2.5
                "
              >
                <HeroMiniCard
                  icon={<FiShoppingBag size={18} />}
                  value="10K+"
                  label="Products"
                />

                <HeroMiniCard
                  icon={<FiUsers size={18} />}
                  value="25K+"
                  label="Customers"
                />

                <HeroMiniCard
                  icon={<FiTruck size={18} />}
                  value="50K+"
                  label="Deliveries"
                />

                <HeroMiniCard
                  icon={<FiStar size={18} />}
                  value="4.8/5"
                  label="Rating"
                />
              </div>

              <div
                className="
                  mt-3
                  rounded-xl
                  border
                  border-[#ffe681]
                  bg-[#fffdf3]
                  p-3
                  dark:border-[#5e5117]
                  dark:bg-[#29260f]
                "
              >
                <div className="flex items-start gap-2.5">
                  <FiShield
                    size={15}
                    className="
                      mt-0.5
                      shrink-0
                      text-[#9b7600]
                      dark:text-[#ffd83d]
                    "
                  />

                  <div>
                    <p
                      className="
                        text-[12px]
                        font-bold
                        text-black
                        font-serif
                        dark:text-white
                      "
                    >
                      Trusted Shopping Experience
                    </p>

                    <p
                      className="
                        mt-1
                        text-[12px]
                        leading-4
                        text-gray-500
                        dark:text-gray-400
                      "
                    >
                      Secure checkout, reliable delivery and dedicated customer
                      support.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================= */}
        {/* STATS */}
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
          <StatCard
            value="25K+"
            title="Happy Customers"
            text="Customers shopping with confidence."
          />

          <StatCard
            value="10K+"
            title="Products"
            text="Wide selection across multiple categories."
          />

          <StatCard
            value="50K+"
            title="Orders Delivered"
            text="Orders successfully shipped to customers."
          />

          <StatCard
            value="4.8/5"
            title="Customer Rating"
            text="Based on customer shopping experiences."
          />
        </section>

        {/* ================================= */}
        {/* OUR STORY */}
        {/* ================================= */}
        <section
          className="
            mt-4
            grid
            grid-cols-1
            overflow-hidden
            rounded-2xl
            border
            border-gray-200
            bg-white
            lg:grid-cols-[420px_minmax(0,1fr)]
            xl:grid-cols-[480px_minmax(0,1fr)]
            dark:border-gray-800
            dark:bg-[#181818]
          "
        >
          {/* IMAGE PLACEHOLDER */}
          <div
            className="
              relative
              flex
              min-h-65
              items-center
              justify-center
              overflow-hidden
              bg-[#f1f1f1]
              sm:min-h-80
              lg:min-h-full
              dark:bg-[#202020]
            "
          >
            <div
              className="
                absolute
                left-1/2
                top-1/2
                h-52
                w-52
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-[#ffd83d]/15
                blur-3xl
              "
            />

            <div
              className="
                relative
                flex
                h-24
                w-24
                items-center
                justify-center
                rounded-3xl
                bg-[#ffd83d]
                text-black
                shadow-[0_15px_40px_rgba(255,216,61,0.25)]
              "
            >
              <FiShoppingBag size={38} />
            </div>
          </div>

          {/* CONTENT */}
          <div
            className="
              p-4
              sm:p-6
              lg:p-8
            "
          >
            <span
              className="
                text-[12px]
                font-bold
                uppercase
                tracking-[1px]
                text-[#9b7600]
                dark:text-[#ffd83d]
              "
            >
              Our Story
            </span>

            <h2
              className="
                mt-2
                font-serif
                text-[18px]
                font-extrabold
                text-black
                sm:text-[22px]
                dark:text-white
              "
            >
              Built Around Better Shopping
            </h2>

            <p
              className="
                mt-3
                text-[12px]
                leading-5
                text-gray-900
                sm:text-[12px]
                dark:text-gray-400
              "
            >
              Our goal is simple: make online shopping convenient, transparent
              and reliable. From discovering products to checkout, delivery and
              support, every part of the shopping journey is designed to be
              easy.
            </p>

            <p
              className="
                mt-3
                text-[9px]
                leading-5
                text-gray-900
                sm:text-[12px]
                dark:text-gray-400
              "
            >
              We focus on useful product selections, clear information,
              competitive pricing and dependable service so customers can shop
              with confidence.
            </p>

            <div
              className="
                mt-5
                grid
                grid-cols-1
                gap-2.5
                sm:grid-cols-2
              "
            >
              <StoryPoint
                title="Customer First"
                text="Shopping experience designed around customer needs."
              />

              <StoryPoint
                title="Quality Focus"
                text="We aim to offer reliable and useful products."
              />

              <StoryPoint
                title="Transparent Pricing"
                text="Clear prices, offers and order information."
              />

              <StoryPoint
                title="Reliable Support"
                text="Help available throughout your shopping journey."
              />
            </div>
          </div>
        </section>

        {/* ================================= */}
        {/* VALUES */}
        {/* ================================= */}
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
          <div
            className="
              flex
              flex-col
              justify-between
              gap-2
              sm:flex-row
              sm:items-end
            "
          >
            <div>
              <span
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[1px]
                  text-[#9b7600]
                  dark:text-[#ffd83d]
                "
              >
                Our Values
              </span>

              <h2
                className="
                  mt-1
                  font-serif
                  text-[17px]
                  font-extrabold
                  text-black
                  sm:text-[20px]
                  dark:text-white
                "
              >
                What We Believe In
              </h2>
            </div>

            <p
              className="
                max-w-117.5
                text-[8px]
                leading-4
                text-gray-900
                sm:text-[10px]
                dark:text-white
              "
            >
              The principles that guide how we serve our customers and build our
              shopping experience.
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
            <ValueCard
              icon={<FiHeart size={17} />}
              title="Customer First"
              text="We focus on creating a smooth and dependable experience for every customer."
            />

            <ValueCard
              icon={<FiShield size={17} />}
              title="Trust & Security"
              text="We aim to keep checkout, payments and customer information protected."
            />

            <ValueCard
              icon={<FiCheckCircle size={17} />}
              title="Quality"
              text="We focus on useful products, clear details and better shopping decisions."
            />

            <ValueCard
              icon={<FiRefreshCw size={17} />}
              title="Continuous Improvement"
              text="We continue improving our platform, services and customer experience."
            />
          </div>
        </section>

        {/* ================================= */}
        {/* WHY CHOOSE US */}
        {/* ================================= */}
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
          <div className="text-center">
            <span
              className="
                text-[8px]
                font-bold
                uppercase
                tracking-[1px]
                text-[#9b7600]
                dark:text-[#ffd83d]
              "
            >
              Why Shop With Us
            </span>

            <h2
              className="
                mt-1
                font-serif
                text-[17px]
                font-extrabold
                text-black
                sm:text-[20px]
                dark:text-white
              "
            >
              A Better Shopping Experience
            </h2>

            <p
              className="
                mx-auto
                mt-1.5
                max-w-137.5
                text-[8px]
                leading-4
                text-gray-900
                sm:text-[12px]
              "
            >
              From product discovery to delivery, we focus on making every step
              simple.
            </p>
          </div>

          <div
            className="
              mt-5
              grid
              grid-cols-2
              gap-2.5
              sm:gap-3
              lg:grid-cols-4
            "
          >
            <ChooseCard
              icon={<FiPackage size={17} />}
              title="Wide Selection"
              text="Products across popular categories."
            />

            <ChooseCard
              icon={<FiTruck size={17} />}
              title="Fast Delivery"
              text="Reliable delivery for eligible orders."
            />

            <ChooseCard
              icon={<FiShield size={17} />}
              title="Secure Checkout"
              text="Safe and convenient payment options."
            />

            <ChooseCard
              icon={<FiRefreshCw size={17} />}
              title="Easy Returns"
              text="Simple return process for eligible products."
            />
          </div>
        </section>

        {/* ================================= */}
        {/* CUSTOMER PROMISE */}
        {/* ================================= */}
        <section
          className="
            mt-4
            grid
            grid-cols-1
            gap-4
            lg:grid-cols-2
          "
        >
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
              <FiShield size={16} />
            </div>

            <h2
              className="
                mt-3
                font-serif
                text-[15px]
                font-extrabold
                text-black
                sm:text-[17px]
                dark:text-white
              "
            >
              Our Promise
            </h2>

            <p
              className="
                mt-2
                text-[10px]
                leading-4
                text-gray-900
                sm:text-[12px]
                dark:text-gray-400
              "
            >
              We work to provide clear product information, fair pricing, secure
              transactions and reliable assistance before and after your
              purchase.
            </p>

            <div className="mt-4 space-y-2">
              <PromiseItem text="Clear product information" />
              <PromiseItem text="Secure payment experience" />
              <PromiseItem text="Reliable delivery updates" />
              <PromiseItem text="Helpful customer support" />
            </div>
          </div>

          <div
            className="
              relative
              overflow-hidden
              rounded-2xl
              bg-[#181818]
              p-4
              sm:p-5
              lg:p-6
            "
          >
            <div
              className="
                absolute
                -right-16
                -top-16
                h-44
                w-44
                rounded-full
                bg-[#ffd83d]/15
                blur-3xl
              "
            />

            <div className="relative">
              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  bg-[#ffd83d]
                  text-black
                "
              >
                <FiUsers size={16} />
              </div>

              <h2
                className="
                  mt-3
                  font-serif
                  text-[15px]
                  font-extrabold
                  text-white
                  sm:text-[17px]
                "
              >
                Customer Support
              </h2>

              <p
                className="
                  mt-2
                  max-w-125
                  text-[8px]
                  leading-4
                  text-gray-400
                  sm:text-[12px]
                "
              >
                Have a question about products, orders, payments, delivery or
                returns? Our support team is here to help.
              </p>
              <ThemeBtnOne
                text="Contact Support"
                icon={<FiArrowRight size={11} />}
                url="/contact-us"
                className="
                  mt-5
                  inline-flex
                  h-10
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
              />
            </div>
          </div>
        </section>

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
            border
            border-[#f2d45a]
            bg-[#fff9dd]
            px-4
            py-5
            text-center
            sm:flex-row
            sm:px-6
            sm:text-left
            lg:px-8
            dark:border-[#5e5117]
            dark:bg-[#29260f]
          "
        >
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
              Ready to start shopping?
            </h2>

            <p
              className="
                mt-1
                text-[8px]
                text-gray-900
                sm:text-[12px]
                dark:text-gray-400
              "
            >
              Explore products, discover offers and find what you need.
            </p>
          </div>

          <ThemeBtnOne
            url="/product-list"
            text="Shop Now"
            icon={<FiShoppingBag size={11} />}
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
              font-serif
            "
          />
        </section>
      </div>
    </main>
  );
};

/* ================================= */
/* HERO MINI CARD */
/* ================================= */

const HeroMiniCard = ({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) => {
  return (
    <div
      className="
        rounded-xl
        border
        border-gray-200
        bg-white
        p-3
        dark:border-gray-700
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

      <p
        className="
          mt-2.5
          font-serif
          text-[15px]
          font-extrabold
          text-black
          sm:text-[17px]
          dark:text-white
        "
      >
        {value}
      </p>

      <p className="mt-0.5 text-[12px] text-gray-900 dark:text-white">
        {label}
      </p>
    </div>
  );
};

/* ================================= */
/* STAT CARD */
/* ================================= */

const StatCard = ({
  value,
  title,
  text,
}: {
  value: string;
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
      <p
        className="
          font-serif
          text-[17px]
          font-extrabold
          text-[#a17b00]
          sm:text-[20px]
          dark:text-[#ffd83d]
        "
      >
        {value}
      </p>

      <h3
        className="
          mt-1
          text-[8px]
          font-bold
          text-black
          sm:text-[14px]
          font-serif
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
          text-gray-900
          sm:text-[12px]
          dark:text-gray-400
        "
      >
        {text}
      </p>
    </div>
  );
};

/* ================================= */
/* STORY POINT */
/* ================================= */

const StoryPoint = ({ title, text }: { title: string; text: string }) => {
  return (
    <div
      className="
        flex
        items-start
        gap-2.5
        rounded-xl
        border
        border-gray-100
        bg-[#fafafa]
        p-3
        dark:border-gray-700
        dark:bg-[#202020]
      "
    >
      <span
        className="
          mt-0.5
          flex
          h-5
          w-5
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-[#ffd83d]
          text-black
        "
      >
        <FiCheckCircle size={10} />
      </span>

      <div>
        <p
          className="
            text-[12px]
            font-bold
            text-black
            sm:text-[12px]
            font-serif
            dark:text-white
          "
        >
          {title}
        </p>

        <p
          className="
            mt-0.5
            text-[10px]
            leading-3.5
            text-gray-900
          "
        >
          {text}
        </p>
      </div>
    </div>
  );
};

/* ================================= */
/* VALUE CARD */
/* ================================= */

const ValueCard = ({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) => {
  return (
    <article
      className="
        rounded-xl
        border
        border-gray-200
        bg-[#fafafa]
        p-3
        transition
        hover:border-[#ffd83d]
        sm:p-4
        dark:border-gray-700
        dark:bg-[#202020]
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
          text-[14px]
          font-bold
          text-black
          dark:text-white
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-1
          text-[12px]
          leading-4
          text-gray-900
          sm:text-[12px]
          dark:text-white
        "
      >
        {text}
      </p>
    </article>
  );
};

/* ================================= */
/* CHOOSE CARD */
/* ================================= */

const ChooseCard = ({
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
        flex
        flex-col
        items-center
        rounded-xl
        border
        border-gray-200
        bg-[#fafafa]
        p-3
        text-center
        transition
        hover:border-[#ffd83d]
        sm:p-4
        dark:border-gray-700
        dark:bg-[#202020]
      "
    >
      <div
        className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-full
          bg-[#fff3ba]
          text-[#896900]
          dark:bg-[#2b260f]
          dark:text-[#ffd83d]
        "
      >
        {icon}
      </div>

      <h3
        className="
          mt-2.5
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
          text-[10px]
          leading-3.5
          text-gray-900
          dark:text-white
        "
      >
        {text}
      </p>
    </div>
  );
};

/* ================================= */
/* PROMISE ITEM */
/* ================================= */

const PromiseItem = ({ text }: { text: string }) => {
  return (
    <div
      className="
        flex
        items-center
        gap-2
      "
    >
      <span
        className="
          flex
          h-5
          w-5
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-green-50
          text-green-600
          dark:bg-green-500/10
        "
      >
        <FiCheckCircle size={10} />
      </span>

      <span
        className="
          text-[10px]
          text-gray-900
          sm:text-[12px]
          dark:text-gray-400
        "
      >
        {text}
      </span>
    </div>
  );
};

export default AboutUs;
