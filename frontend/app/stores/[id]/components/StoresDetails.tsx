"use client";

import ThemeBtnOne from "@/app/components/ThemeBtnOne";
import Image from "next/image";
import React, { useState } from "react";
import {
  FiClock,
  FiMail,
  FiMapPin,
  FiMessageSquare,
  FiPhone,
  FiSend,
  FiUser,
} from "react-icons/fi";

const StoresDetails = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Contact Form:", formData);
  };

  const inputClass = `
    h-12
    w-full
    rounded-xl
    border
    border-gray-200
    bg-gray-50
    pl-11
    pr-4
    text-sm
    font-medium
    text-gray-900
    outline-none
    transition-all
    duration-200
    placeholder:font-normal
    placeholder:text-gray-400
    hover:border-gray-300
    focus:border-[#d2a900]
    focus:bg-white
    focus:ring-4
    focus:ring-[#ffd83d]/15
    dark:border-white/10
    dark:bg-[#0d0d0d]
    dark:text-white
    dark:placeholder:text-gray-600
    dark:hover:border-white/20
    dark:focus:border-[#ffd83d]/60
    dark:focus:bg-[#101010]
  `;

  return (
    <main className="min-h-screen bg-[#f7f7f8] py-8 transition-colors duration-300 dark:bg-[#080808] sm:py-10 lg:py-14">
      <div className="mx-auto w-full max-w-325 px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 flex flex-col gap-4 border-b border-gray-200 pb-6 dark:border-white/10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#ffd83d]" />

              <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#a98400] dark:text-[#ffd83d]">
                Store Information
              </span>
            </div>

            <h1 className="text-2xl font-black tracking-tight text-gray-950 dark:text-white sm:text-3xl lg:text-[34px]">
              Urban Style Store
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 dark:text-gray-400">
              View store information and send your enquiry directly to our team.
            </p>
          </div>

          {/* Status */}
          <div className="flex w-fit items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3.5 py-2 dark:border-green-500/20 dark:bg-green-500/10">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>

            <span className="text-xs font-bold text-green-700 dark:text-green-400">
              Store Open
            </span>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          {/* LEFT - STORE DETAILS */}
          <aside className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-[0_8px_35px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-[#111111] dark:shadow-none">
            {/* Image */}
            <div className="group relative h-65 overflow-hidden bg-gray-100 sm:h-75">
              <Image
                src="/img/store-placeholder.jpg"
                alt="Urban Style Store"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/15 to-transparent" />

              {/* Top Badge */}
              <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 backdrop-blur-md">
                <span className="text-[11px] font-bold text-white">
                  Fashion & Lifestyle
                </span>
              </div>

              {/* Bottom Info */}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">
                    Featured Store
                  </p>

                  <h2 className="mt-1 text-xl font-extrabold text-white sm:text-2xl">
                    Urban Style Store
                  </h2>
                </div>

                <div className="shrink-0 rounded-xl border border-white/20 bg-white/95 px-3 py-2 shadow-sm backdrop-blur-md dark:bg-black/70">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base text-[#f5b400]">★</span>
                    <span className="text-sm font-extrabold text-gray-900 dark:text-white">
                      4.8
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Store Content */}
            <div className="p-5 sm:p-6">
              <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
                Discover premium fashion, accessories and everyday essentials
                with the latest trends, quality products and trusted service.
              </p>

              {/* Info Boxes */}
              <div className="mt-6 space-y-3">
                {/* Address */}
                <div className="group flex items-start gap-4 rounded-2xl border border-gray-100 bg-gray-50/70 p-4 transition hover:border-[#ffd83d]/50 hover:bg-[#fffbea] dark:border-white/5 dark:bg-white/2.5 dark:hover:border-[#ffd83d]/20 dark:hover:bg-[#ffd83d]/5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#fff3bd] text-[#aa8700] dark:bg-[#ffd83d]/10 dark:text-[#ffd83d]">
                    <FiMapPin size={18} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-gray-400">
                      Store Address
                    </p>

                    <p className="mt-1.5 text-sm font-semibold leading-5 text-gray-800 dark:text-gray-200">
                      MG Road, Pune, Maharashtra 411001
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50/70 p-4 transition hover:border-[#ffd83d]/50 hover:bg-[#fffbea] dark:border-white/5 dark:bg-white/2.5 dark:hover:border-[#ffd83d]/20 dark:hover:bg-[#ffd83d]/5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#fff3bd] text-[#aa8700] dark:bg-[#ffd83d]/10 dark:text-[#ffd83d]">
                    <FiPhone size={18} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-gray-400">
                      Phone Number
                    </p>

                    <a
                      href="tel:+919876543210"
                      className="mt-1.5 block text-sm font-semibold text-gray-800 transition hover:text-[#b18d00] dark:text-gray-200 dark:hover:text-[#ffd83d]"
                    >
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50/70 p-4 transition hover:border-[#ffd83d]/50 hover:bg-[#fffbea] dark:border-white/5 dark:bg-white/2.5 dark:hover:border-[#ffd83d]/20 dark:hover:bg-[#ffd83d]/5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#fff3bd] text-[#aa8700] dark:bg-[#ffd83d]/10 dark:text-[#ffd83d]">
                    <FiMail size={18} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-gray-400">
                      Email Address
                    </p>

                    <a
                      href="mailto:urbanstore@example.com"
                      className="mt-1.5 block truncate text-sm font-semibold text-gray-800 transition hover:text-[#b18d00] dark:text-gray-200 dark:hover:text-[#ffd83d]"
                    >
                      urbanstore@example.com
                    </a>
                  </div>
                </div>

                {/* Timing */}
                <div className="group flex items-start gap-4 rounded-2xl border border-gray-100 bg-gray-50/70 p-4 transition hover:border-[#ffd83d]/50 hover:bg-[#fffbea] dark:border-white/5 dark:bg-white/2.5 dark:hover:border-[#ffd83d]/20 dark:hover:bg-[#ffd83d]/5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#fff3bd] text-[#aa8700] dark:bg-[#ffd83d]/10 dark:text-[#ffd83d]">
                    <FiClock size={18} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-gray-400">
                      Store Hours
                    </p>

                    <div className="mt-1.5 flex flex-col gap-1 text-sm sm:flex-row sm:items-center sm:justify-between">
                      <span className="font-semibold text-gray-800 dark:text-gray-200">
                        Mon - Sat
                      </span>

                      <span className="text-gray-500 dark:text-gray-400">
                        10:00 AM - 8:00 PM
                      </span>
                    </div>

                    <div className="mt-1 flex flex-col gap-1 text-sm sm:flex-row sm:items-center sm:justify-between">
                      <span className="font-semibold text-gray-800 dark:text-gray-200">
                        Sunday
                      </span>

                      <span className="text-gray-500 dark:text-gray-400">
                        11:00 AM - 6:00 PM
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT - CONTACT FORM */}
          <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-[0_8px_35px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-[#111111] dark:shadow-none">
            {/* Form Header */}
            <div className="border-b border-gray-100 bg-linear-to-r from-[#fffbea] to-white px-5 py-6 dark:border-white/10 dark:from-[#ffd83d]/6 dark:to-[#111111] sm:px-7 lg:px-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#ffd83d] text-black shadow-sm">
                  <FiMessageSquare size={21} />
                </div>

                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#9f7e00] dark:text-[#ffd83d]">
                    Contact Store
                  </p>

                  <h2 className="mt-1 text-xl font-black text-gray-950 dark:text-white sm:text-2xl">
                    Send an Enquiry
                  </h2>

                  <p className="mt-1.5 max-w-lg text-sm leading-6 text-gray-500 dark:text-gray-400">
                    Share your details and query. Our store team will contact
                    you as soon as possible.
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-5 sm:p-7 lg:p-8"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-xs font-bold text-gray-700 dark:text-gray-300"
                  >
                    Full Name
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <FiUser
                      size={17}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-xs font-bold text-gray-700 dark:text-gray-300"
                  >
                    Phone Number
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <FiPhone
                      size={17}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      required
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-bold text-gray-700 dark:text-gray-300"
                >
                  Email Address
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <div className="relative">
                  <FiMail
                    size={17}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-xs font-bold text-gray-700 dark:text-gray-300"
                >
                  Your Message
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <div className="relative">
                  <FiMessageSquare
                    size={17}
                    className="pointer-events-none absolute left-4 top-4 text-gray-400"
                  />

                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us what you're looking for..."
                    required
                    rows={7}
                    className="
                      w-full
                      resize-none
                      rounded-xl
                      border
                      border-gray-200
                      bg-gray-50
                      py-3.5
                      pl-11
                      pr-4
                      text-sm
                      font-medium
                      leading-6
                      text-gray-900
                      outline-none
                      transition-all
                      duration-200
                      placeholder:font-normal
                      placeholder:text-gray-400
                      hover:border-gray-300
                      focus:border-[#d2a900]
                      focus:bg-white
                      focus:ring-4
                      focus:ring-[#ffd83d]/15
                      dark:border-white/10
                      dark:bg-[#0d0d0d]
                      dark:text-white
                      dark:placeholder:text-gray-600
                      dark:hover:border-white/20
                      dark:focus:border-[#ffd83d]/60
                      dark:focus:bg-[#101010]
                    "
                  />
                </div>
              </div>

              {/* Submit Area */}
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 dark:border-white/5 dark:bg-white/2.5">
                <ThemeBtnOne
                  text="Send Enquiry"
                  icon={<FiSend size={16} />}
                  type="submit"
                  className="
                    flex
                    h-12
                    w-full
                    cursor-pointer
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[#ffd83d]
                    px-5
                    text-sm
                    font-extrabold
                    text-black
                    shadow-[0_6px_18px_rgba(255,216,61,0.22)]
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:bg-[#ffcf12]
                    hover:shadow-[0_9px_24px_rgba(255,216,61,0.3)]
                    active:translate-y-0
                  "
                />

                <div className="mt-3 flex items-center justify-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

                  <p className="text-center text-[11px] leading-5 text-gray-400 dark:text-gray-500">
                    Usually responds within a few hours
                  </p>
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
};

export default StoresDetails;
