"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiLoader, FiShoppingBag, FiX } from "react-icons/fi";
import { toast } from "react-toastify";

import { auth } from "@/firebase/config";
import { openAccountMenu } from "@/lib/authPopover";
import {
  ICreateOrderBody,
  IRazorpayPayment,
  useCancelPaymentMutation,
  useCreateOrderMutation,
  useCreateRazorpayPaymentMutation,
  useCreateTabbyPaymentMutation,
  useVerifyRazorpayPaymentMutation,
} from "@/store/ordersApi";

/* ====================================================== */
/* RAZORPAY BROWSER TYPES (checkout.js adds window.Razorpay) */
/* ====================================================== */

interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  order_id: string;
  prefill?: { name?: string; email?: string; contact?: string };
  theme?: { color?: string };
  handler: (response: RazorpaySuccessResponse) => void;
  modal?: { ondismiss?: () => void };
}

interface RazorpayInstance {
  open: () => void;
  on: (
    event: "payment.failed",
    callback: (response: { error: { description?: string } }) => void,
  ) => void;
}

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

/* ====================================================== */
/* HELPERS */
/* ====================================================== */

type Gateway = "razorpay" | "tabby";

const GATEWAYS: {
  id: Gateway;
  title: string;
  subtitle: string;
  badge: string;
}[] = [
  {
    id: "razorpay",
    title: "Razorpay",
    subtitle: "Cards, UPI & wallets",
    badge: "RZP",
  },
  {
    id: "tabby",
    title: "Tabby",
    subtitle: "Buy now, pay later",
    badge: "tabby",
  },
];

const RAZORPAY_SCRIPT = "https://checkout.razorpay.com/v1/checkout.js";

// loads checkout.js once (resolves false if it cannot be loaded)
const loadRazorpayScript = () =>
  new Promise<boolean>((resolve) => {
    if (window.Razorpay) return resolve(true);

    const script = document.createElement("script");
    script.src = RAZORPAY_SCRIPT;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

// backend message from an RTK Query error (or a plain Error)
const getErrorMessage = (error: unknown) => {
  const err = error as { data?: { message?: string }; message?: string };
  return (
    err?.data?.message ||
    err?.message ||
    "Something went wrong. Please try again."
  );
};

/* ====================================================== */
/* COMPONENT */
/* ====================================================== */

type PlaceOrderButtonProps = {
  shippingAddress?: ICreateOrderBody["shippingAddress"] | null;
  disabled?: boolean;
};

const PlaceOrderButton: React.FC<PlaceOrderButtonProps> = ({
  shippingAddress,
  disabled = false,
}) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  // gateway that is being started / is open right now
  const [busy, setBusy] = useState<Gateway | null>(null);

  const [createOrder] = useCreateOrderMutation();
  const [createRazorpayPayment] = useCreateRazorpayPaymentMutation();
  const [verifyRazorpayPayment] = useVerifyRazorpayPaymentMutation();
  const [createTabbyPayment] = useCreateTabbyPaymentMutation();
  const [cancelPayment] = useCancelPaymentMutation();

  // close the popup with the Escape key
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !busy) setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, busy]);

  // frees the reserved stock again (cart is kept). Safe to call twice.
  const cancelOrder = async (orderId: string) => {
    try {
      await cancelPayment({ orderId }).unwrap();
    } catch {
      /* the backend also cleans up old unpaid orders by itself */
    }
  };

  /* ---------- Place Order click ---------- */
  const handlePlaceOrder = () => {
    if (!auth.currentUser) {
      toast.info("Please log in to place your order");
      openAccountMenu();
      return;
    }

    if (!shippingAddress) {
      toast.error("Please select a delivery address first");
      return;
    }

    setOpen(true);
  };

  /* ---------- RAZORPAY ---------- */
  const payWithRazorpay = async (
    address: ICreateOrderBody["shippingAddress"],
  ) => {
    // load the script first so a failure here does not leave an unpaid order
    const loaded = await loadRazorpayScript();

    if (!loaded || !window.Razorpay) {
      throw new Error(
        "Could not load Razorpay. Check your internet connection and try again.",
      );
    }

    // 1. order is created as "pending" (cart stays until the payment is done)
    const created = await createOrder({
      shippingAddress: address,
      paymentMethod: "razorpay",
    }).unwrap();

    const orderId = created.data._id;

    try {
      // 2. backend creates the Razorpay order (amount comes from the server)
      const payment: IRazorpayPayment = (
        await createRazorpayPayment({ orderId }).unwrap()
      ).data;

      let paymentDone = false;

      // 3. open the Razorpay window
      const razorpay = new window.Razorpay({
        key: payment.keyId,
        amount: payment.amount,
        currency: payment.currency,
        name: "Glitters",
        description: `Order ${payment.orderNumber}`,
        order_id: payment.razorpayOrderId,
        prefill: payment.prefill,
        theme: { color: "#ffd83d" },

        // 4. payment done -> backend verifies the signature
        handler: async (response) => {
          paymentDone = true;

          try {
            await verifyRazorpayPayment({
              orderId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }).unwrap();

            router.replace(`/order-success?order=${orderId}`);
          } catch (error) {
            toast.error(
              `${getErrorMessage(error)} If money was deducted, please contact support with order ${payment.orderNumber}.`,
            );
            setBusy(null);
          }
        },

        // customer closed the window without paying
        modal: {
          ondismiss: async () => {
            if (paymentDone) return;

            await cancelOrder(orderId);
            toast.info("Payment cancelled. Your cart is safe.");
            setBusy(null);
          },
        },
      });

      razorpay.on("payment.failed", (response) => {
        toast.error(
          response.error.description || "Payment failed. Please try again.",
        );
      });

      razorpay.open();
    } catch (error) {
      await cancelOrder(orderId);
      throw error;
    }
  };

  /* ---------- TABBY ---------- */
  const payWithTabby = async (address: ICreateOrderBody["shippingAddress"]) => {
    // 1. order is created as "pending" (cart stays until the payment is done)
    const created = await createOrder({
      shippingAddress: address,
      paymentMethod: "tabby",
    }).unwrap();

    const orderId = created.data._id;

    try {
      // 2. backend creates the Tabby session
      const session = await createTabbyPayment({ orderId }).unwrap();

      // 3. go to the Tabby page. Tabby sends the customer back to
      //    /checkout/payment-status where the payment is verified.
      window.location.assign(session.data.webUrl);
    } catch (error) {
      await cancelOrder(orderId);
      throw error;
    }
  };

  /* ---------- gateway chosen in the popup ---------- */
  const startPayment = async (gateway: Gateway) => {
    if (busy) return;

    if (!shippingAddress) {
      toast.error("Please select a delivery address first");
      setOpen(false);
      return;
    }

    setBusy(gateway);

    try {
      if (gateway === "razorpay") {
        await payWithRazorpay(shippingAddress);
      } else {
        await payWithTabby(shippingAddress);
      }
      // success: busy stays on while the Razorpay window is open
      // or while the browser is going to the Tabby page
    } catch (error) {
      toast.error(getErrorMessage(error));
      setBusy(null);
    }
  };

  return (
    <>
      {/* PLACE ORDER */}
      <button
        type="button"
        onClick={handlePlaceOrder}
        disabled={disabled}
        className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#ffd83d] text-[11px] font-extrabold text-black transition-all hover:bg-[#ffcf12] hover:shadow-[0_6px_18px_rgba(255,216,61,0.28)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:h-12"
      >
        <FiShoppingBag size={14} /> Place Order
      </button>

      {/* CHOOSE PAYMENT GATEWAY */}
      {open && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 p-4"
          onClick={() => {
            if (!busy) setOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Choose how to pay"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl dark:bg-[#181818]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-serif text-[16px] font-extrabold text-black dark:text-white">
                  Choose how to pay
                </h3>
                <p className="mt-0.5 text-[10px] text-gray-500 dark:text-gray-400">
                  You will be taken to a secure payment window
                </p>
              </div>

              <button
                type="button"
                aria-label="Close"
                disabled={!!busy}
                onClick={() => setOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 disabled:opacity-40 dark:hover:bg-[#2a2a2a]"
              >
                <FiX size={16} />
              </button>
            </div>

            <div className="mt-4 space-y-2.5">
              {GATEWAYS.map((gateway) => {
                const loading = busy === gateway.id;

                return (
                  <button
                    key={gateway.id}
                    type="button"
                    disabled={!!busy}
                    onClick={() => startPayment(gateway.id)}
                    className="flex w-full items-center gap-3 rounded-xl border border-gray-200 p-3 text-left transition hover:border-[#ffd83d] hover:bg-[#fffbe8] disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:hover:bg-[#222]"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f3f3f4] text-[10px] font-extrabold text-blue-600 dark:bg-[#2a2a2a]">
                      {gateway.badge}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block font-serif text-[12px] font-bold text-black dark:text-white">
                        {gateway.title}
                      </span>
                      <span className="block text-[10px] text-gray-500 dark:text-gray-400">
                        {gateway.subtitle}
                      </span>
                    </span>

                    {loading && (
                      <FiLoader
                        size={16}
                        className="shrink-0 animate-spin text-gray-500"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlaceOrderButton;
