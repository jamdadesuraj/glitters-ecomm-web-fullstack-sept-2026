"use client";

import React, { useState } from "react";
import Link from "next/link";

import {
  FiArrowLeft,
  FiArrowRight,
  FiBriefcase,
  FiCheckCircle,
  FiClock,
  FiDollarSign,
  FiFileText,
  FiMail,
  FiMapPin,
  FiSend,
  FiShield,
  FiTrendingUp,
  FiUpload,
  FiUsers,
} from "react-icons/fi";
import ThemeBtnOne from "@/app/components/ThemeBtnOne";

const CareersDetails = () => {
  const [showApplyForm, setShowApplyForm] = useState(false);

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
        {/* BACK */}
        <div className="mb-4">
          <Link
            href="/careers"
            className="
              inline-flex
              items-center
              gap-1.5
              text-[8px]
              font-bold
              text-gray-500
              transition
              hover:text-black
              sm:text-[9px]
              dark:text-gray-400
              dark:hover:text-white
            "
          >
            <FiArrowLeft size={11} />
            Back to Careers
          </Link>
        </div>

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
            p-4
            sm:p-6
            lg:p-8
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

          <div
            className="
              relative
              flex
              flex-col
              gap-5
              lg:flex-row
              lg:items-end
              lg:justify-between
            "
          >
            <div className="max-w-200">
              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  gap-2
                "
              >
                <span
                  className="
                    inline-flex
                    items-center
                    gap-1
                    rounded-full
                    bg-[#fff6ce]
                    px-2.5
                    py-1
                    text-[7px]
                    font-bold
                    text-[#806300]
                    sm:text-[10px]
                    dark:bg-[#2b260f]
                    dark:text-[#ffd83d]
                  "
                >
                  <FiBriefcase size={10} />
                  Engineering
                </span>

                <span
                  className="
                    rounded-full
                    bg-green-50
                    px-2.5
                    py-1
                    text-[7px]
                    font-bold
                    text-green-600
                    sm:text-[10px]
                    dark:bg-green-500/10
                  "
                >
                  Hiring Now
                </span>
              </div>

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
                Frontend Developer
              </h1>

              <p
                className="
                  mt-2
                  max-w-175
                  text-[9px]
                  leading-5
                  text-gray-500
                  sm:text-[10px]
                  lg:text-[11px]
                  dark:text-gray-400
                "
              >
                We are looking for a Frontend Developer to build responsive,
                high-quality ecommerce interfaces and help improve our customer
                shopping experience.
              </p>

              <div
                className="
                  mt-4
                  flex
                  flex-wrap
                  gap-2
                "
              >
                <JobMeta icon={<FiMapPin size={10} />} text="Dubai, UAE" />

                <JobMeta icon={<FiClock size={10} />} text="Full Time" />

                <JobMeta
                  icon={<FiTrendingUp size={10} />}
                  text="2+ Years Experience"
                />

                <JobMeta icon={<FiUsers size={10} />} text="Engineering Team" />
              </div>
            </div>
            <ThemeBtnOne
              type="button"
              icon={<FiArrowRight size={11} />}
              onClick={() => {
                setShowApplyForm(true);

                window.setTimeout(() => {
                  document.getElementById("apply-job")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }, 100);
              }}
              text="Apply for this Job"
              className="
                flex
                h-10
                shrink-0
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
                transition
                hover:bg-[#ffcf12]
                hover:shadow-[0_6px_18px_rgba(255,216,61,0.25)]
                sm:h-11
              "
            />
          </div>
        </section>

        {/* ================================= */}
        {/* MAIN */}
        {/* ================================= */}
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
          {/* ================================= */}
          {/* LEFT */}
          {/* ================================= */}
          <div className="min-w-0 space-y-4">
            {/* ABOUT ROLE */}
            <JobSection title="About the Role" icon={<FiBriefcase size={15} />}>
              <p className=" text-[12px]">
                As a Frontend Developer, you will work closely with our design,
                backend and product teams to build fast, responsive and reliable
                ecommerce experiences.
              </p>
            </JobSection>

            {/* RESPONSIBILITIES */}
            <JobSection
              title="Key Responsibilities"
              icon={<FiCheckCircle size={15} />}
            >
              <BulletList
                items={[
                  "Build responsive ecommerce interfaces using React and Next.js.",
                  "Convert UI/UX designs into reusable frontend components.",
                  "Maintain responsive layouts across mobile, tablet and desktop.",
                  "Integrate frontend components with REST APIs and backend services.",
                  "Improve website performance, usability and page load speed.",
                  "Work closely with designers and backend developers.",
                  "Debug frontend issues and maintain clean reusable code.",
                  "Implement cross-browser compatible UI components.",
                ]}
              />
            </JobSection>

            {/* REQUIREMENTS */}
            <JobSection title="Requirements" icon={<FiFileText size={15} />}>
              <BulletList
                items={[
                  "2+ years of frontend development experience.",
                  "Strong knowledge of React.js and Next.js.",
                  "Good understanding of JavaScript or TypeScript.",
                  "Strong HTML5 and CSS3 fundamentals.",
                  "Experience with Tailwind CSS or similar frontend frameworks.",
                  "Experience integrating REST APIs.",
                  "Understanding of responsive and mobile-first design.",
                  "Basic knowledge of Git and GitHub workflows.",
                  "Ability to work independently and within a team.",
                ]}
              />
            </JobSection>

            {/* GOOD TO HAVE */}
            <JobSection title="Good to Have" icon={<FiTrendingUp size={15} />}>
              <BulletList
                items={[
                  "Experience working on ecommerce websites.",
                  "Understanding of SEO-friendly frontend development.",
                  "Experience with state management libraries.",
                  "Knowledge of performance optimisation techniques.",
                  "Experience working from Figma designs.",
                  "Understanding of payment gateway frontend integrations.",
                ]}
              />
            </JobSection>

            {/* BENEFITS */}
            <section
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
                  <FiShield size={15} />
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
                    Benefits & Perks
                  </h2>

                  <p className="mt-0.5 text-[10px] text-gray-400">
                    What you can expect when you join
                  </p>
                </div>
              </div>

              <div
                className="
                  mt-4
                  grid
                  grid-cols-1
                  gap-2.5
                  sm:grid-cols-2
                "
              >
                <BenefitItem
                  title="Competitive Salary"
                  text="Salary based on experience and skills."
                />

                <BenefitItem
                  title="Career Growth"
                  text="Opportunities to grow with the company."
                />

                <BenefitItem
                  title="Learning Support"
                  text="Continuous learning and skill development."
                />

                <BenefitItem
                  title="Flexible Environment"
                  text="Supportive and collaborative work culture."
                />

                <BenefitItem
                  title="Paid Leave"
                  text="Annual leave and company holidays."
                />

                <BenefitItem
                  title="Performance Rewards"
                  text="Recognition based on contribution."
                />
              </div>
            </section>

            {/* ================================= */}
            {/* APPLY FORM */}
            {/* ================================= */}
            {showApplyForm && (
              <section
                id="apply-job"
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
                {!submitted ? (
                  <>
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
                        Apply for Frontend Developer
                      </h2>

                      <p
                        className="
                          mt-1
                          text-[8px]
                          text-gray-400
                          sm:text-[10px]
                        "
                      >
                        Fill in your details and submit your application.
                      </p>
                    </div>

                    <form
                      onSubmit={handleSubmit}
                      className="
                        grid
                        grid-cols-1
                        gap-3
                        sm:grid-cols-2
                      "
                    >
                      <CareerInput
                        label="First Name"
                        placeholder="Enter first name"
                      />

                      <CareerInput
                        label="Last Name"
                        placeholder="Enter last name"
                      />

                      <CareerInput
                        label="Email Address"
                        placeholder="example@email.com"
                        type="email"
                      />

                      <CareerInput
                        label="Phone Number"
                        placeholder="+971 50 123 4567"
                        type="tel"
                      />

                      <CareerInput
                        label="Current Position"
                        placeholder="Frontend Developer"
                      />

                      <CareerInput
                        label="Experience"
                        placeholder="Example: 3 Years"
                      />

                      <div>
                        <label
                          className="
                            mb-1.5
                            block
                            text-[12px]
                            font-semibold
                            text-gray-900
                            font-serif
                            dark:text-gray-300
                          "
                        >
                          Current Location
                        </label>

                        <input
                          required
                          type="text"
                          placeholder="Dubai, UAE"
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label
                          className="
                            mb-1.5
                            block
                            text-[12px]
                            font-semibold
                            text-gray-900
                            font-serif
                            dark:text-gray-300
                          "
                        >
                          Expected Salary
                        </label>

                        <input
                          type="text"
                          placeholder="Enter expected salary"
                          className={inputClass}
                        />
                      </div>

                      {/* LINKEDIN */}
                      <div className="sm:col-span-2">
                        <CareerInput
                          label="LinkedIn / Portfolio URL"
                          placeholder="https://..."
                          type="url"
                        />
                      </div>

                      {/* RESUME */}
                      <div className="sm:col-span-2">
                        <label
                          className="
                            mb-1.5
                            block
                            text-[12px]
                            font-semibold
                            text-gray-900
                            font-serif
                            dark:text-gray-300
                          "
                        >
                          Upload Resume
                        </label>

                        <label
                          className="
                            flex
                            min-h-25
                            cursor-pointer
                            flex-col
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-dashed
                            border-gray-300
                            bg-[#fafafa]
                            px-4
                            text-center
                            transition
                            hover:border-[#ffd83d]
                            dark:border-gray-700
                            dark:bg-[#202020]
                          "
                        >
                          <FiUpload size={18} className="text-gray-400" />

                          <p
                            className="
                              mt-2
                              text-[8px]
                              font-bold
                              text-black
                              dark:text-white
                            "
                          >
                            Click to upload resume
                          </p>

                          <p
                            className="
                              mt-0.5
                              text-[7px]
                              text-gray-400
                            "
                          >
                            PDF, DOC or DOCX
                          </p>

                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                          />
                        </label>
                      </div>

                      {/* COVER */}
                      <div className="sm:col-span-2">
                        <label
                          className="
                            mb-1.5
                            block
                            text-[12px]
                            font-semibold
                            text-gray-900
                            font-serif
                            dark:text-gray-300
                          "
                        >
                          Cover Letter
                          <span className="ml-1 font-normal text-gray-400">
                            (Optional)
                          </span>
                        </label>

                        <textarea
                          rows={5}
                          placeholder="Tell us why you would be a good fit for this role..."
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
                            required
                            type="checkbox"
                            className="
                              mt-0.5
                              h-3.5
                              w-3.5
                              accent-[#ffd83d]
                            "
                          />

                          <span
                            className="
                              max-w-125
                              text-[10px]
                              leading-4
                              text-gray-400
                            "
                          >
                            I confirm that the information provided in my
                            application is accurate.
                          </span>
                        </label>

                        <ThemeBtnOne
                          type="submit"
                          className="
                            flex
                            h-10
                            shrink-0
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
                            transition
                            hover:bg-[#ffcf12]
                            sm:h-11
                            sm:min-w-40
                          "
                          icon={<FiSend size={11} />}
                          text="Submit Application"
                        />
                      </div>
                    </form>
                  </>
                ) : (
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
                        text-[16px]
                        font-extrabold
                        text-black
                        dark:text-white
                      "
                    >
                      Application Submitted
                    </h3>

                    <p
                      className="
                        mt-1
                        max-w-95
                        text-[8px]
                        leading-4
                        text-gray-500
                        dark:text-gray-400
                      "
                    >
                      Thank you for applying. Our HR team will review your
                      application and contact you if your profile matches the
                      role.
                    </p>

                    <Link
                      href="/careers"
                      className="
                        mt-5
                        flex
                        h-9
                        items-center
                        justify-center
                        gap-1.5
                        rounded-lg
                        bg-[#ffd83d]
                        px-4
                        text-[8px]
                        font-bold
                        text-black
                      "
                    >
                      View More Jobs
                      <FiArrowRight size={9} />
                    </Link>
                  </div>
                )}
              </section>
            )}
          </div>

          {/* ================================= */}
          {/* SIDEBAR */}
          {/* ================================= */}
          <aside className="min-w-0">
            <div
              className="
                space-y-4
                lg:sticky
                lg:top-25
              "
            >
              {/* JOB SUMMARY */}
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
                <h2
                  className="
                    font-serif
                    text-[13px]
                    font-extrabold
                    text-black
                    dark:text-white
                  "
                >
                  Job Overview
                </h2>

                <div
                  className="
                    mt-4
                    divide-y
                    divide-gray-100
                    dark:divide-gray-800
                  "
                >
                  <OverviewRow
                    icon={<FiBriefcase size={12} />}
                    label="Department"
                    value="Engineering"
                  />

                  <OverviewRow
                    icon={<FiMapPin size={12} />}
                    label="Location"
                    value="Dubai, UAE"
                  />

                  <OverviewRow
                    icon={<FiClock size={12} />}
                    label="Job Type"
                    value="Full Time"
                  />

                  <OverviewRow
                    icon={<FiTrendingUp size={12} />}
                    label="Experience"
                    value="2+ Years"
                  />

                  <OverviewRow
                    icon={<FiDollarSign size={12} />}
                    label="Salary"
                    value="Based on Experience"
                  />

                  <OverviewRow
                    icon={<FiUsers size={12} />}
                    label="Openings"
                    value="2 Positions"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowApplyForm(true);

                    window.setTimeout(() => {
                      document.getElementById("apply-job")?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }, 100);
                  }}
                  className="
                    mt-4
                    flex
                    h-10
                    w-full
                    cursor-pointer
                    items-center
                    justify-center
                    gap-1.5
                    rounded-xl
                    bg-[#ffd83d]
                    text-[9px]
                    font-extrabold
                    text-black
                    transition
                    hover:bg-[#ffcf12]
                  "
                >
                  Apply Now
                  <FiArrowRight size={10} />
                </button>
              </section>

              {/* SHARE / HR */}
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
                  <FiMail size={14} />
                </div>

                <h3
                  className="
                    mt-3
                    font-serif
                    text-[12px]
                    font-extrabold
                    text-black
                    dark:text-white
                  "
                >
                  Have a Question?
                </h3>

                <p
                  className="
                    mt-1
                    text-[10px]
                    leading-4
                    text-gray-500
                    dark:text-gray-400
                  "
                >
                  Contact our HR team if you need more information about this
                  position.
                </p>

                <Link
                  href="mailto:careers@example.com"
                  className="
                    mt-3
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
                  careers@example.com
                  <FiArrowRight size={9} />
                </Link>
              </section>

              {/* POSTED */}
              <section
                className="
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  p-4
                  dark:border-gray-800
                  dark:bg-[#181818]
                "
              >
                <p className="text-[10px] text-gray-400">Job ID</p>

                <p
                  className="
                    mt-0.5
                    text-[12px]
                    font-bold
                    text-black
                    dark:text-white
                  "
                >
                  JOB-FE-001
                </p>

                <div
                  className="
                    my-3
                    border-t
                    border-gray-100
                    dark:border-gray-800
                  "
                />

                <p className="text-[7px] text-gray-400">Posted</p>

                <p
                  className="
                    mt-0.5
                    text-[9px]
                    font-bold
                    text-black
                    dark:text-white
                  "
                >
                  September 24, 2026
                </p>
              </section>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

const inputClass = `
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
`;

/* ============================= */
/* JOB META */
/* ============================= */

const JobMeta = ({ icon, text }: { icon: React.ReactNode; text: string }) => {
  return (
    <span
      className="
        inline-flex
        items-center
        gap-1
        rounded-full
        border
        border-gray-200
        bg-[#fafafa]
        px-2.5
        py-1.5
        text-[7px]
        font-semibold
        text-gray-500
        dark:border-gray-700
        dark:bg-[#202020]
        dark:text-gray-400
      "
    >
      {icon}
      {text}
    </span>
  );
};

/* ============================= */
/* JOB SECTION */
/* ============================= */

const JobSection = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <section
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
          {icon}
        </div>

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
      </div>

      <div
        className="
          mt-4
          space-y-3
          text-[8px]
          leading-5
          text-gray-500
          sm:text-[9px]
          dark:text-gray-400
        "
      >
        {children}
      </div>
    </section>
  );
};

/* ============================= */
/* BULLET LIST */
/* ============================= */

const BulletList = ({ items }: { items: string[] }) => {
  return (
    <ul className="space-y-2.5">
      {items.map((item, index) => (
        <li
          key={index}
          className="
            flex
            items-start
            gap-2.5
          "
        >
          <span
            className="
              mt-1.25
              flex
              h-4
              w-4
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[#fff6ce]
              text-[#8b6a00]
              dark:bg-[#2b260f]
              dark:text-[#ffd83d]
            "
          >
            <FiCheckCircle size={9} />
          </span>

          <span className="text-[12px]">{item}</span>
        </li>
      ))}
    </ul>
  );
};

/* ============================= */
/* BENEFIT */
/* ============================= */

const BenefitItem = ({ title, text }: { title: string; text: string }) => {
  return (
    <div
      className="
        rounded-xl
        border
        border-gray-100
        bg-[#fafafa]
        p-3
        dark:border-gray-700
        dark:bg-[#202020]
      "
    >
      <div className="flex items-start gap-2">
        <FiCheckCircle
          size={12}
          className="
            mt-0.5
            shrink-0
            text-green-600
          "
        />

        <div>
          <p
            className="
              text-[8px]
              font-bold
              text-black
              sm:text-[12px]
              dark:text-white
            "
          >
            {title}
          </p>

          <p
            className="
              mt-0.5
              text-[10px]
              leading-4
              text-gray-400
            "
          >
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};

/* ============================= */
/* INPUT */
/* ============================= */

const CareerInput = ({
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
          text-[12px]
          font-semibold
          text-gray-900
          font-serif
          dark:text-gray-300
        "
      >
        {label}
      </label>

      <input
        required
        type={type}
        placeholder={placeholder}
        className={inputClass}
      />
    </div>
  );
};

/* ============================= */
/* OVERVIEW ROW */
/* ============================= */

const OverviewRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => {
  return (
    <div
      className="
        flex
        items-center
        gap-2.5
        py-3
        first:pt-0
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
          rounded-lg
          bg-[#f7f7f7]
          text-gray-500
          dark:bg-[#242424]
          dark:text-gray-400
        "
      >
        {icon}
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-[10px] text-gray-500">{label}</p>

        <p
          className="
            mt-0.5
            truncate
            text-[8px]
            font-bold
            text-black
            sm:text-[12px]
            dark:text-white
          "
        >
          {value}
        </p>
      </div>
    </div>
  );
};

export default CareersDetails;
