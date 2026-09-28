"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  FiUser,
  FiPhone,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiX,
  FiArrowLeft,
} from "react-icons/fi";
import ThemeBtnOne from "./ThemeBtnOne";

type AuthMode = "mobile" | "email" | "register";

const AccountMenu = () => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>("mobile");

  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  const [otpSent, setOtpSent] = useState(false);

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");

  const handleSendOtp = (e: FormEvent) => {
    e.preventDefault();

    if (!mobile.trim()) return;

    // CALL SEND OTP API HERE
    setOtpSent(true);
  };

  const handleVerifyOtp = (e: FormEvent) => {
    e.preventDefault();

    if (!otp.trim()) return;

    // CALL VERIFY OTP API HERE
  };

  return (
    <div className="relative">
      {/* ACCOUNT BUTTON */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Account"
        className="
    flex
    h-9
    w-9
    shrink-0
    cursor-pointer
    items-center
    justify-center
    rounded-full
    border
    border-gray-100
    bg-white
    text-left
    text-black
    shadow-[0_2px_10px_rgba(0,0,0,0.08)]
    transition-all
    duration-200

    hover:border-gray-200
    hover:bg-gray-50
    hover:text-[#b58b00]
    hover:shadow-[0_3px_12px_rgba(0,0,0,0.12)]

    sm:h-10
    sm:w-10

    lg:h-auto
    lg:w-auto
    lg:gap-2.5
    lg:rounded-none
    lg:border-0
    lg:bg-transparent
    lg:shadow-none

    lg:hover:border-transparent
    lg:hover:bg-transparent
    lg:hover:shadow-none

    dark:border-gray-700
    dark:bg-[#181818]
    dark:text-white
    dark:shadow-[0_2px_10px_rgba(0,0,0,0.30)]

    lg:dark:border-0
    lg:dark:bg-transparent
    lg:dark:shadow-none
  "
      >
        <FiUser
          className="
      h-4.5
      w-4.5
      shrink-0
      text-black

      sm:h-5
      sm:w-5

      lg:h-7
      lg:w-7

      dark:text-white
    "
          strokeWidth={1.8}
        />

        <div className="hidden leading-none lg:block">
          <p className="mb-1 text-[12px] font-semibold leading-3.5 text-black dark:text-white">
            Account
          </p>

          <span className="block text-[10px] leading-2.75 text-gray-400 dark:text-gray-300">
            Sign In
          </span>
        </div>
      </button>

      {/* ACCOUNT DROPDOWN */}
      {open && (
        <div
          className="
            absolute
            right-0
            top-[calc(100%+18px)]
            z-200
            w-90
            max-w-[calc(100vw-24px)]
            rounded-2xl
            border
            border-gray-200
            bg-white
            p-5
            shadow-[0_18px_50px_rgba(0,0,0,0.15)]
          "
        >
          {/* ARROW */}
          <div
            className="
              absolute
              -top-1.75
              right-10
              h-3.5
              w-3.5
              rotate-45
              border-l
              border-t
              border-gray-200
              bg-white
            "
          />

          {/* HEADER */}
          <div className="relative mb-4 flex items-start justify-between">
            <div>
              <h3 className="text-[17px] font-extrabold text-black font-serif">
                {mode === "register" ? "Create Account" : "Welcome Back"}
              </h3>

              <p className="mt-1 text-[11px] text-gray-500">
                {mode === "register"
                  ? "Create your account to start shopping"
                  : "Login to access your account"}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                bg-gray-100
                text-gray-500
                transition cursor-pointer
                hover:bg-gray-200
                hover:text-black
              "
            >
              <FiX size={15} />
            </button>
          </div>

          {/* LOGIN MODES */}
          {mode !== "register" && (
            <div className="mb-5 grid grid-cols-2 rounded-xl bg-gray-100 p-1">
              <button
                type="button"
                onClick={() => {
                  setMode("mobile");
                  setOtpSent(false);
                }}
                className={`
                  flex
                  h-10
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  text-[11px]
                  font-bold
                  transition cursor-pointer
                  ${
                    mode === "mobile"
                      ? "bg-white text-black shadow-sm"
                      : "text-gray-500"
                  }
                `}
              >
                <FiPhone size={14} />
                Mobile + OTP
              </button>

              <button
                type="button"
                onClick={() => setMode("email")}
                className={`
                  flex
                  h-10
                  items-center
                  justify-center
                  gap-2
                  rounded-lg cursor-pointer
                  text-[11px]
                  font-bold
                  transition
                  ${
                    mode === "email"
                      ? "bg-white text-black shadow-sm"
                      : "text-gray-500"
                  }
                `}
              >
                <FiMail size={14} />
                Email Login
              </button>
            </div>
          )}

          {/* ======================== */}
          {/* MOBILE + OTP */}
          {/* ======================== */}

          {mode === "mobile" && !otpSent && (
            <form onSubmit={handleSendOtp}>
              <label className="mb-1.5 block text-[11px] font-semibold text-gray-700">
                Mobile Number
              </label>

              <div className="flex h-11 overflow-hidden rounded-xl border border-gray-200 transition focus-within:border-[#ffd51c] focus-within:ring-2 focus-within:ring-[#ffd51c]/20">
                <div className="flex shrink-0 items-center border-r border-gray-200 bg-gray-50 px-3 text-[12px] font-semibold text-black">
                  +91
                </div>

                <div className="relative flex-1">
                  <FiPhone
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={mobile}
                    onChange={(e) =>
                      setMobile(e.target.value.replace(/\D/g, ""))
                    }
                    placeholder="Enter mobile number"
                    className="
                      h-full
                      w-full
                      bg-white
                      pl-9
                      pr-3
                      text-[12px]
                      text-black
                      outline-none
                      placeholder:text-gray-400
                    "
                  />
                </div>
              </div>

              <ThemeBtnOne
                text="     Get OTP"
                url="/login"
                className="
                  mt-4
                  flex
                  h-11
                  w-full
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#ffd51c]
                  text-[12px]
                  font-extrabold
                  text-black
                  transition
                  hover:bg-[#ffca00]
                  hover:shadow-[0_6px_18px_rgba(255,213,28,0.30)]
                "
              />
            </form>
          )}

          {/* OTP SCREEN */}
          {mode === "mobile" && otpSent && (
            <form onSubmit={handleVerifyOtp}>
              <button
                type="button"
                onClick={() => {
                  setOtpSent(false);
                  setOtp("");
                }}
                className="mb-4 flex items-center gap-1.5 text-[10px] font-bold text-gray-500 hover:text-black"
              >
                <FiArrowLeft />
                Change Mobile Number
              </button>

              <div className="rounded-xl border border-[#ffe27a] bg-[#fffbea] p-3">
                <p className="text-[10px] text-gray-500">OTP sent to</p>

                <p className="mt-0.5 text-[12px] font-bold text-black">
                  +91 {mobile}
                </p>
              </div>

              <label className="mb-1.5 mt-4 block text-[11px] font-semibold text-gray-700">
                Enter OTP
              </label>

              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                placeholder="Enter 6 digit OTP"
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  px-4
                  text-center
                  text-[16px]
                  font-bold
                  tracking-[8px]
                  text-black
                  outline-none
                  transition
                  placeholder:text-[11px]
                  placeholder:font-normal
                  placeholder:tracking-normal
                  placeholder:text-gray-400
                  focus:border-[#ffd51c]
                  focus:ring-2
                  focus:ring-[#ffd51c]/20
                "
              />

              <div className="mt-2 flex justify-between">
                <span className="text-[10px] text-gray-400">
                  Didn&apos;t receive OTP?
                </span>

                <button
                  type="button"
                  className="text-[10px] font-bold text-[#b58b00] hover:underline"
                >
                  Resend OTP
                </button>
              </div>

              <ThemeBtnOne
                text="Verify & Login"
                url="/login"
                className="
                  mt-4
                  flex
                  h-11
                  w-full
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#ffd51c]
                  text-[12px]
                  font-extrabold
                  text-black
                  transition
                  hover:bg-[#ffca00]
                  hover:shadow-[0_6px_18px_rgba(255,213,28,0.30)]
                "
              />
            </form>
          )}

          {/* ======================== */}
          {/* EMAIL + PASSWORD */}
          {/* ======================== */}

          {mode === "email" && (
            <form className="space-y-3">
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold text-gray-700">
                  Email Address
                </label>

                <div className="relative">
                  <FiMail
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    placeholder="Enter email address"
                    className="
                      h-11
                      w-full
                      rounded-xl
                      border
                      border-gray-200
                      pl-10
                      pr-3
                      text-[12px]
                      text-black
                      outline-none
                      transition
                      placeholder:text-gray-400
                      focus:border-[#ffd51c]
                      focus:ring-2
                      focus:ring-[#ffd51c]/20
                    "
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[11px] font-semibold text-gray-700">
                  Password
                </label>

                <div className="relative">
                  <FiLock
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    className="
                      h-11
                      w-full
                      rounded-xl
                      border
                      border-gray-200
                      pl-10
                      pr-10
                      text-[12px]
                      text-black
                      outline-none
                      transition
                      placeholder:text-gray-400
                      focus:border-[#ffd51c]
                      focus:ring-2
                      focus:ring-[#ffd51c]/20
                    "
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                  >
                    {showPassword ? (
                      <FiEyeOff size={15} />
                    ) : (
                      <FiEye size={15} />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 accent-[#ffd51c]"
                  />

                  <span className="text-[10px] text-gray-500">Remember me</span>
                </label>

                <Link
                  href="/forgot-password"
                  className="text-[10px] font-bold text-[#b58b00] hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <ThemeBtnOne
                text="Login"
                url="/login"
                className="
                  mt-4
                  flex
                  h-11
                  w-full
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#ffd51c]
                  text-[12px]
                  font-extrabold
                  text-black
                  transition
                  hover:bg-[#ffca00]
                  hover:shadow-[0_6px_18px_rgba(255,213,28,0.30)]
                "
              />
            </form>
          )}

          {/* ======================== */}
          {/* CREATE ACCOUNT */}
          {/* ======================== */}

          {mode === "register" && (
            <form className="space-y-3">
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold text-gray-700">
                  Full Name
                </label>

                <div className="relative">
                  <FiUser
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="
                      h-11
                      w-full
                      rounded-xl
                      border
                      border-gray-200
                      pl-10
                      pr-3
                      text-[12px]
                      outline-none
                      focus:border-[#ffd51c]
                      focus:ring-2
                      focus:ring-[#ffd51c]/20
                    "
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[11px] font-semibold text-gray-700">
                  Mobile Number
                </label>

                <div className="flex h-11 overflow-hidden rounded-xl border border-gray-200 focus-within:border-[#ffd51c] focus-within:ring-2 focus-within:ring-[#ffd51c]/20">
                  <span className="flex items-center border-r border-gray-200 bg-gray-50 px-3 text-[12px] font-semibold">
                    +91
                  </span>

                  <input
                    type="tel"
                    placeholder="Enter mobile number"
                    className="min-w-0 flex-1 px-3 text-[12px] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[11px] font-semibold text-gray-700">
                  Email Address
                </label>

                <div className="relative">
                  <FiMail
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    placeholder="Enter email address"
                    className="
                      h-11
                      w-full
                      rounded-xl
                      border
                      border-gray-200
                      pl-10
                      pr-3
                      text-[12px]
                      outline-none
                      focus:border-[#ffd51c]
                      focus:ring-2
                      focus:ring-[#ffd51c]/20
                    "
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[11px] font-semibold text-gray-700">
                  Create Password
                </label>

                <div className="relative">
                  <FiLock
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type={showRegisterPassword ? "text" : "password"}
                    placeholder="Create password"
                    className="
                      h-11
                      w-full
                      rounded-xl
                      border
                      border-gray-200
                      pl-10
                      pr-10
                      text-[12px]
                      outline-none
                      focus:border-[#ffd51c]
                      focus:ring-2
                      focus:ring-[#ffd51c]/20
                    "
                  />

                  <button
                    type="button"
                    onClick={() => setShowRegisterPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showRegisterPassword ? (
                      <FiEyeOff size={15} />
                    ) : (
                      <FiEye size={15} />
                    )}
                  </button>
                </div>
              </div>

              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  className="mt-0.5 h-3.5 w-3.5 accent-[#ffd51c]"
                />

                <span className="text-[9px] leading-4 text-gray-500">
                  I agree to the{" "}
                  <Link href="/terms" className="font-bold text-black">
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy-policy" className="font-bold text-black">
                    Privacy Policy
                  </Link>
                </span>
              </label>

              <ThemeBtnOne
                text=" Create Account"
                url="/login"
                className="
                  mt-4
                  flex
                  h-11
                  w-full
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#ffd51c]
                  text-[12px]
                  font-extrabold
                  text-black
                  transition
                  hover:bg-[#ffca00]
                  hover:shadow-[0_6px_18px_rgba(255,213,28,0.30)]
                "
              />
            </form>
          )}

          {/* CREATE / LOGIN SWITCH */}
          <div className="mt-5 border-t border-gray-100 pt-4 text-center">
            {mode !== "register" ? (
              <p className="text-[10px] text-gray-500">
                New to Glitters?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("register");
                    setOtpSent(false);
                  }}
                  className="font-extrabold text-black hover:text-[#b58b00]"
                >
                  Create Account
                </button>
              </p>
            ) : (
              <p className="text-[10px] text-gray-500">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("mobile")}
                  className="font-extrabold text-black hover:text-[#b58b00]"
                >
                  Login
                </button>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountMenu;
