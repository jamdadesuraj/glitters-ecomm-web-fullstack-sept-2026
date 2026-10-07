"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { FiUser, FiPhone, FiMail, FiX } from "react-icons/fi";
import { auth } from "@/firebase/config";
import MobileOtpLogin from "./MobileOtpLogin";
import EmailPasswordLogin from "./EmailPasswordLogin";
import RegisterForm from "./RegisterForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import AccountLinks from "./AccountLinks";

type AuthMode = "mobile" | "email" | "register" | "forgot";

const AccountMenu = () => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>("mobile");
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);

      // Login success par dropdown band + mode reset
      if (currentUser) {
        setOpen(false);
        setMode("mobile");
      }
    });

    return () => unsubscribe();
  }, []);

  const firstName = user
    ? (user.displayName || user.email || user.phoneNumber || "Account")
        .split(" ")[0]
        .slice(0, 12)
    : "";

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
            {user ? "Hello," : "Account"}
          </p>

          <span className="block text-[10px] leading-2.75 text-gray-400 dark:text-gray-300">
            {user ? firstName : "Sign In"}
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
              <h3 className="font-serif text-[17px] font-extrabold text-black">
                {user
                  ? "My Account"
                  : mode === "register"
                    ? "Create Account"
                    : mode === "forgot"
                      ? "Forgot Password"
                      : "Welcome Back"}
              </h3>

              <p className="mt-1 text-[11px] text-gray-500">
                {user
                  ? "Manage your profile, orders and wishlist"
                  : mode === "register"
                    ? "Create your account to start shopping"
                    : mode === "forgot"
                      ? "We will email you a link to reset your password"
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
                cursor-pointer
                items-center
                justify-center
                rounded-full
                bg-gray-100
                text-gray-500
                transition
                hover:bg-gray-200
                hover:text-black
              "
            >
              <FiX size={15} />
            </button>
          </div>

          {authLoading ? (
            <p className="py-6 text-center text-[11px] text-gray-400">
              Loading...
            </p>
          ) : user ? (
            /* LOGGED IN */
            <AccountLinks user={user} onClose={() => setOpen(false)} />
          ) : (
            /* LOGGED OUT */
            <>
              {/* LOGIN MODE TABS */}
              {(mode === "mobile" || mode === "email") && (
                <div className="mb-5 grid grid-cols-2 rounded-xl bg-gray-100 p-1">
                  <button
                    type="button"
                    onClick={() => setMode("mobile")}
                    className={`
                      flex
                      h-10
                      cursor-pointer
                      items-center
                      justify-center
                      gap-2
                      rounded-lg
                      text-[11px]
                      font-bold
                      transition
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
                      cursor-pointer
                      items-center
                      justify-center
                      gap-2
                      rounded-lg
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

              {/* FORMS */}
              {mode === "mobile" && <MobileOtpLogin />}
              {mode === "email" && (
                <EmailPasswordLogin
                  onForgotPassword={() => setMode("forgot")}
                />
              )}
              {mode === "register" && <RegisterForm />}
              {mode === "forgot" && (
                <ForgotPasswordForm onBack={() => setMode("email")} />
              )}

              {/* CREATE / LOGIN SWITCH */}
              {mode !== "forgot" && (
                <div className="mt-5 border-t border-gray-100 pt-4 text-center">
                  {mode !== "register" ? (
                    <p className="text-[10px] text-gray-500">
                      New to Glitters?{" "}
                      <button
                        type="button"
                        onClick={() => setMode("register")}
                        className="cursor-pointer font-extrabold text-black hover:text-[#b58b00]"
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
                        className="cursor-pointer font-extrabold text-black hover:text-[#b58b00]"
                      >
                        Login
                      </button>
                    </p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AccountMenu;
