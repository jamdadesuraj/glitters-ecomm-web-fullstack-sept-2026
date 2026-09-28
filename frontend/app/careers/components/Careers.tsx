"use client";

import React, { useMemo, useState } from "react";

import {
  FiArrowRight,
  FiBriefcase,
  FiCheckCircle,
  FiClock,
  FiCoffee,
  FiDollarSign,
  FiMapPin,
  FiSearch,
  FiShield,
  FiStar,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";

import ThemeBtnOne from "@/app/components/ThemeBtnOne";

type Job = {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  featured?: boolean;
};

const jobs: Job[] = [
  {
    id: 1,
    title: "Frontend Developer",
    department: "Engineering",
    location: "Dubai, UAE",
    type: "Full Time",
    experience: "2+ Years",
    description:
      "Build responsive and user-friendly ecommerce experiences using modern frontend technologies.",
    featured: true,
  },
  {
    id: 2,
    title: "Backend Developer",
    department: "Engineering",
    location: "Dubai, UAE",
    type: "Full Time",
    experience: "3+ Years",
    description:
      "Develop scalable backend systems, APIs and integrations for our ecommerce platform.",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    department: "Design",
    location: "Dubai, UAE",
    type: "Full Time",
    experience: "2+ Years",
    description:
      "Create clean, intuitive and customer-focused digital shopping experiences.",
  },
  {
    id: 4,
    title: "Digital Marketing Executive",
    department: "Marketing",
    location: "Dubai, UAE",
    type: "Full Time",
    experience: "1+ Years",
    description:
      "Plan and execute digital campaigns across social media, search and performance channels.",
  },
  {
    id: 5,
    title: "Customer Support Executive",
    department: "Customer Support",
    location: "Dubai, UAE",
    type: "Full Time",
    experience: "1+ Years",
    description:
      "Support customers with orders, payments, returns, delivery and product-related queries.",
  },
  {
    id: 6,
    title: "Warehouse Coordinator",
    department: "Operations",
    location: "Dubai, UAE",
    type: "Full Time",
    experience: "1+ Years",
    description:
      "Coordinate inventory, packing, dispatch and warehouse operations efficiently.",
  },
];

const departments = [
  "All",
  "Engineering",
  "Design",
  "Marketing",
  "Customer Support",
  "Operations",
];

const Careers = () => {
  const [department, setDepartment] = useState("All");

  const [search, setSearch] = useState("");

  const filteredJobs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return jobs.filter((job) => {
      const departmentMatch =
        department === "All" || job.department === department;

      const searchMatch =
        !query ||
        job.title.toLowerCase().includes(query) ||
        job.department.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query);

      return departmentMatch && searchMatch;
    });
  }, [department, search]);

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
            py-8
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
              relative
              grid
              grid-cols-1
              items-center
              gap-7
              lg:grid-cols-[minmax(0,1fr)_420px]
            "
          >
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
                <FiBriefcase size={11} />
                Join our team
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
                Build Your Career
                <span className="text-[#b38900] dark:text-[#ffd83d]">
                  {" "}
                  With Us
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
                  lg:text-[12px]
                  dark:text-gray-400
                "
              >
                Join a growing ecommerce team working across technology,
                operations, customer support, marketing and design.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <ThemeBtnOne
                  text="View Open Positions"
                  icon={<FiArrowRight size={11} />}
                  url="#open-positions"
                  className="
                    flex
                    h-10
                    items-center
                    justify-center
                    gap-1.5
                    rounded-xl
                    bg-[#ffd83d]
                    px-4
                    text-[9px]
                    font-extrabold
                    text-black
                    transition
                    font-serif
                    hover:bg-[#ffcf12]
                  "
                />
              </div>
            </div>
          </div>
        </section>

        {/* BENEFITS */}
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
              Employee Benefits
            </span>

            <h2
              className="
                mt-1
                font-serif
                text-[17px]
                font-extrabold
                text-black
                dark:text-white
              "
            >
              Benefits That Support You
            </h2>

            <div
              className="
                mt-5
                grid
                grid-cols-1
                gap-2.5
                sm:grid-cols-2
              "
            >
              <SmallBenefit
                icon={<FiDollarSign size={14} />}
                title="Competitive Salary"
              />

              <SmallBenefit
                icon={<FiClock size={14} />}
                title="Flexible Work Hours"
              />

              <SmallBenefit
                icon={<FiShield size={14} />}
                title="Health Benefits"
              />

              <SmallBenefit
                icon={<FiCoffee size={14} />}
                title="Paid Time Off"
              />

              <SmallBenefit
                icon={<FiTrendingUp size={14} />}
                title="Learning & Development"
              />

              <SmallBenefit
                icon={<FiStar size={14} />}
                title="Performance Rewards"
              />
            </div>
          </div>

          {/* CULTURE */}
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
                -right-20
                -top-20
                h-52
                w-52
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
                <FiUsers size={17} />
              </div>

              <h2
                className="
                  mt-3
                  font-serif
                  text-[17px]
                  font-extrabold
                  text-white
                "
              >
                Our Culture
              </h2>

              <p
                className="
                  mt-2
                  text-[8px]
                  leading-4
                  text-gray-400
                  sm:text-[12px]
                "
              >
                We believe the best work happens when people feel trusted,
                supported and encouraged to contribute ideas.
              </p>

              <div className="mt-4 space-y-2">
                <CultureItem text="Open communication" />
                <CultureItem text="Collaborative environment" />
                <CultureItem text="Continuous learning" />
                <CultureItem text="Ownership and responsibility" />
                <CultureItem text="Customer-focused thinking" />
              </div>
            </div>
          </div>
        </section>

        {/* OPEN POSITIONS */}
        <section
          id="open-positions"
          className="
            mt-4
            scroll-mt-25
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
              gap-3
              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >
            <div>
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
                Careers
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
                Open Positions
              </h2>

              <p className="mt-1 text-[10px] text-gray-400">
                {filteredJobs.length} roles available
              </p>
            </div>

            {/* SEARCH */}
            <div
              className="
                flex
                h-10
                w-full
                items-center
                rounded-lg
                border
                border-gray-200
                bg-[#fafafa]
                px-3
                focus-within:border-[#ffd83d]
                sm:w-70
                dark:border-gray-700
                dark:bg-[#202020]
              "
            >
              <FiSearch size={13} className="shrink-0 text-gray-400" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search jobs..."
                className="
                  h-full
                  min-w-0
                  flex-1
                  bg-transparent
                  px-2
                  text-[9px]
                  text-black
                  outline-none
                  placeholder:text-gray-400
                  dark:text-white
                "
              />
            </div>
          </div>

          {/* DEPARTMENTS */}
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
            {departments.map((item) => {
              const active = item === department;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setDepartment(item)}
                  className={`
                    h-9
                    shrink-0
                    cursor-pointer
                    rounded-lg
                    border
                    px-3
                    text-[12px]
                    font-bold
                    transition

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
                          text-gray-500
                          hover:border-[#ffd83d]
                          hover:text-black

                          dark:border-gray-700
                          dark:bg-[#202020]
                          dark:text-gray-300
                        `
                    }
                  `}
                >
                  {item}
                </button>
              );
            })}
          </div>

          {/* JOB LIST */}
          {filteredJobs.length > 0 ? (
            <div
              className="
                mt-5
                grid
                grid-cols-1
                gap-3
                md:grid-cols-2
              "
            >
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div
              className="
                mt-5
                flex
                min-h-62.5
                flex-col
                items-center
                justify-center
                rounded-xl
                border
                border-dashed
                border-gray-200
                bg-[#fafafa]
                text-center
                dark:border-gray-700
                dark:bg-[#202020]
              "
            >
              <FiSearch size={22} className="text-gray-300" />

              <p
                className="
                  mt-3
                  font-serif
                  text-[13px]
                  font-bold
                  text-black
                  dark:text-white
                "
              >
                No jobs found
              </p>

              <p className="mt-1 text-[8px] text-gray-400">
                Try another department or keyword.
              </p>
            </div>
          )}
        </section>

        {/* HIRING PROCESS */}
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
                text-[12px]
                font-bold
                uppercase
                tracking-[1px]
                text-[#9b7600]
                dark:text-[#ffd83d]
              "
            >
              Hiring Process
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
              What Happens After You Apply
            </h2>
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
            <ProcessStep
              number="01"
              title="Apply"
              text="Submit your application and resume."
            />

            <ProcessStep
              number="02"
              title="Screening"
              text="Our HR team reviews your profile."
            />

            <ProcessStep
              number="03"
              title="Interview"
              text="Meet the team and discuss the role."
            />

            <ProcessStep
              number="04"
              title="Offer"
              text="Selected candidates receive an offer."
            />
          </div>
        </section>

        {/* FINAL CTA */}
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
              Don&apos;t see the right role?
            </h2>

            <p
              className="
                mt-1
                text-[8px]
                text-gray-400
                sm:text-[9px]
              "
            >
              Send your resume to our HR team and we&apos;ll keep your profile
              for future opportunities.
            </p>
          </div>

          <ThemeBtnOne
            text="Send Your Resume"
            url="mailto:careers@example.com"
            icon={<FiArrowRight size={11} />}
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
          />
        </section>
      </div>
    </main>
  );
};

/* ============================= */
/* SMALL BENEFIT */
/* ============================= */

const SmallBenefit = ({
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
      </span>

      <span
        className="
          text-[8px]
          font-bold
          text-gray-700
          sm:text-[12px]
          dark:text-gray-300
        "
      >
        {title}
      </span>
    </div>
  );
};

/* ============================= */
/* CULTURE ITEM */
/* ============================= */

const CultureItem = ({ text }: { text: string }) => {
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
          bg-[#ffd83d]
          text-black
        "
      >
        <FiCheckCircle size={10} />
      </span>

      <span className="text-[8px] text-gray-300 sm:text-[12px]">{text}</span>
    </div>
  );
};

/* ============================= */
/* JOB CARD */
/* ============================= */

const JobCard = ({ job }: { job: Job }) => {
  return (
    <article
      className="
        group
        relative
        rounded-xl
        border
        border-gray-200
        bg-[#fafafa]
        p-4
        transition-all
        hover:border-[#ffd83d]
        hover:shadow-[0_7px_22px_rgba(0,0,0,0.05)]
        dark:border-gray-700
        dark:bg-[#202020]
      "
    >
      {job.featured && (
        <span
          className="
            absolute
            right-3
            top-3
            rounded-full
            bg-[#ffd83d]
            px-2
            py-1
            text-[6px]
            font-extrabold
            text-black
          "
        >
          Featured
        </span>
      )}

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
        <FiBriefcase size={15} />
      </div>

      <p
        className="
          mt-3
          text-[10px]
          font-bold
          uppercase
          tracking-[0.7px]
          text-[#9b7600]
          dark:text-[#ffd83d]
        "
      >
        {job.department}
      </p>

      <h3
        className="
          mt-1
          font-serif
          text-[14px]
          font-extrabold
          text-black
          sm:text-[14px]
          dark:text-white
        "
      >
        {job.title}
      </h3>

      <p
        className="
          mt-2
          text-[10px]
          leading-4
          text-gray-500
          dark:text-gray-400
        "
      >
        {job.description}
      </p>

      <div
        className="
          mt-3
          flex
          flex-wrap
          gap-1.5
        "
      >
        <JobBadge icon={<FiMapPin size={9} />} text={job.location} />

        <JobBadge icon={<FiClock size={9} />} text={job.type} />

        <JobBadge icon={<FiTrendingUp size={9} />} text={job.experience} />
      </div>

      <div
        className="
          mt-4
          flex
          items-center
          justify-between
          gap-3
          border-t
          border-gray-200
          pt-3
          dark:border-gray-700
        "
      >
        <span
          className="
            text-[10px]
            text-gray-400
          "
        >
          Posted recently
        </span>

        <ThemeBtnOne
          text="Apply Now"
          icon={<FiArrowRight size={9} />}
          url={`/careers/${job.id}`}
          className="
            flex
            h-8
            items-center
            justify-center
            gap-1
            rounded-lg
            bg-[#ffd83d]
            px-3
            text-[8px]
            font-extrabold
            text-black
            transition
            cursor-pointer
            hover:bg-[#ffcf12]
          "
        />
      </div>
    </article>
  );
};

/* ============================= */
/* JOB BADGE */
/* ============================= */

const JobBadge = ({ icon, text }: { icon: React.ReactNode; text: string }) => {
  return (
    <span
      className="
        inline-flex
        items-center
        gap-1
        rounded-full
        border
        border-gray-200
        bg-white
        px-2
        py-1
        text-[10px]
        font-semibold
        text-gray-500
        dark:border-gray-700
        dark:bg-[#181818]
        dark:text-gray-400
      "
    >
      {icon}
      {text}
    </span>
  );
};

/* ============================= */
/* PROCESS STEP */
/* ============================= */

const ProcessStep = ({
  number,
  title,
  text,
}: {
  number: string;
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
        p-4
        dark:border-gray-700
        dark:bg-[#202020]
      "
    >
      <span
        className="
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-lg
          bg-[#ffd83d]
          text-[8px]
          font-extrabold
          text-black
        "
      >
        {number}
      </span>

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

      <p
        className="
          mt-1
          text-[10px]
          leading-4
          text-gray-400
        "
      >
        {text}
      </p>
    </div>
  );
};

export default Careers;
