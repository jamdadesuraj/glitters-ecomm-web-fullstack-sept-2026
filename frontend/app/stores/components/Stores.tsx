import ThemeBtnOne from "@/app/components/ThemeBtnOne";
import Image from "next/image";
import React from "react";
import { FiArrowRight } from "react-icons/fi";

interface Store {
  id: number;
  name: string;
  description: string;
  address: string;
  image?: string;
  rating: number;
  status: "Open" | "Closed";
}

const stores: Store[] = [
  {
    id: 1,
    name: "Urban Style Store",
    description:
      "Discover premium fashion, accessories and everyday essentials with the latest trends.",
    address: "MG Road, Pune, Maharashtra 411001",
    image: "",
    rating: 4.8,
    status: "Open",
  },
];

const Stores = () => {
  return (
    <main className="min-h-screen bg-gray-50 py-8 transition-colors duration-300 dark:bg-[#090909] sm:py-10 lg:py-12">
      <div className="mx-auto w-full max-w-362.5 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="mb-2 inline-block text-xs font-bold uppercase tracking-[0.18em] text-[#b58b00]">
              Explore Nearby
            </span>

            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 transition-colors dark:text-white sm:text-3xl">
              Featured Stores
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500 dark:text-gray-400">
              Explore our trusted stores and discover quality products from
              popular sellers.
            </p>
          </div>

          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {stores.length} stores available
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {stores.map((store) => {
            const storeImage =
              store.image?.trim() || "/img/store-placeholder.jpg";

            return (
              <article
                key={store.id}
                className="
                  group
                  overflow-hidden
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-gray-300
                  hover:shadow-xl
                  dark:border-white/10
                  dark:bg-[#121212]
                  dark:shadow-none
                  dark:hover:border-white/20
                  dark:hover:bg-[#161616]
                "
              >
                {/* Image */}
                <div className="relative h-52.5 overflow-hidden bg-gray-100 dark:bg-neutral-900">
                  <Image
                    src={storeImage}
                    alt={store.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

                  {/* Status */}
                  <div
                    className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-[11px] font-bold text-white shadow-sm ${
                      store.status === "Open"
                        ? "bg-green-500"
                        : "bg-neutral-800 dark:bg-neutral-700"
                    }`}
                  >
                    {store.status}
                  </div>

                  {/* Rating */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-gray-900 shadow dark:bg-black/80 dark:text-white dark:backdrop-blur-md">
                    <span className="text-[#f5aa00]">★</span>
                    {store.rating.toFixed(1)}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h2 className="text-lg font-extrabold text-gray-900 transition-colors group-hover:text-[#b58b00] dark:text-white dark:group-hover:text-[#d5ad27]">
                    {store.name}
                  </h2>

                  <p className="mt-2 min-h-12 text-sm leading-6 text-gray-500 dark:text-gray-400">
                    {store.description}
                  </p>

                  <div className="my-4 h-px bg-gray-100 dark:bg-white/10" />

                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fff8dc] dark:bg-[#b58b00]/15">
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="text-[#b58b00]"
                      >
                        <path
                          d="M12 21C12 21 19 15.4 19 9.5C19 5.36 15.87 2 12 2C8.13 2 5 5.36 5 9.5C5 15.4 12 21 12 21Z"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        <circle
                          cx="12"
                          cy="9"
                          r="2.5"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        />
                      </svg>
                    </div>

                    <div className="min-w-0">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                        Address
                      </p>

                      <p className="mt-1 text-sm font-medium leading-5 text-gray-700 dark:text-gray-300">
                        {store.address}
                      </p>
                    </div>
                  </div>

                  <ThemeBtnOne
                    text="View Store"
                    url={`/stores/${store.id}`}
                    icon={<FiArrowRight />}
                    className="
                      mt-4
                      flex
                      h-10
                      w-full
                      cursor-pointer
                      items-center
                      justify-center
                      gap-1.5
                      rounded-lg
                      bg-[#ffd83d]
                      px-5
                      font-serif
                      text-[9px]
                      font-extrabold
                      text-black
                      transition
                      hover:bg-[#ffcf12]
                      sm:h-11
                    "
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Stores;
