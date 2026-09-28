"use client";

import Image from "next/image";
import Link from "next/link";

const banners = [
  {
    id: 1,
    image: "/img/offer-banner/8.png",
    href: "/product-list",
    alt: "Special Offer Banner",
  },
  {
    id: 2,
    image: "/img/offer-banner/8.png",
    href: "/product-list",
    alt: "New Offer Banner",
  },
];

const NewOfferBanner = () => {
  return (
    <section className="w-full bg-white py-4 dark:bg-[#111]">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-4">
          {banners.map((banner) => (
            <Link
              key={banner.id}
              href={banner.href}
              className="
                group
                relative
                block
                h-30
                w-full
                overflow-hidden
                rounded-xl
                bg-gray-100

                min-[420px]:h-35
                sm:h-40
                md:h-42.5
                lg:h-47.5
                xl:h-55
                2xl:h-55
              "
            >
              <Image
                src={banner.image}
                alt={banner.alt}
                fill
                sizes="
                  (max-width: 767px) 100vw,
                  50vw
                "
                className="
                  object-cover
                  object-center
                  transition-transform
                  duration-500
                  group-hover:scale-[1.02]
                "
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewOfferBanner;
