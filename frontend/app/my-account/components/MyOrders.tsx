import Link from "next/link";
import React from "react";
import { FiPackage } from "react-icons/fi";

const orders = [
  {
    id: "#ORD-100245",
    product: "Apple iPhone 16 Pro Max 256GB",
    date: "24 Sep 2026",
    amount: "AED 1,199.00",
    status: "Delivered",
  },
  {
    id: "#ORD-100232",
    product: "Nike Air Max Sneakers",
    date: "18 Sep 2026",
    amount: "AED 189.00",
    status: "Processing",
  },
  {
    id: "#ORD-100219",
    product: "Apple AirPods Pro",
    date: "11 Sep 2026",
    amount: "AED 249.00",
    status: "Shipped",
  },
];

const MyOrders = () => {
  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#111111]">
        <div className="border-b border-gray-100 p-5 dark:border-white/10 sm:p-6">
          <h2 className="text-xl font-black text-gray-950 dark:text-white">
            My Orders
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            View and manage your recent purchases.
          </p>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-white/10">
          {orders.map((order) => (
            <article
              key={order.id}
              className="p-5 transition hover:bg-gray-50 dark:hover:bg-white/2 sm:p-6"
            >
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-600 dark:bg-white/5 dark:text-gray-300">
                    <FiPackage size={19} />
                  </div>

                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                      {order.id}
                    </p>

                    <h3 className="mt-1 text-sm font-black text-gray-900 dark:text-white">
                      {order.product}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                      Ordered on {order.date}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <span className="text-sm font-black text-gray-950 dark:text-white">
                    {order.amount}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1.5 text-[10px] font-extrabold ${
                      order.status === "Delivered"
                        ? "bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400"
                        : order.status === "Shipped"
                          ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                          : "bg-yellow-50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400"
                    }`}
                  >
                    {order.status}
                  </span>

                  <Link
                    href={"/track-order"}
                    className="cursor-pointer text-xs font-extrabold text-[#9d7b00] hover:underline dark:text-[#ffd83d]"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyOrders;
