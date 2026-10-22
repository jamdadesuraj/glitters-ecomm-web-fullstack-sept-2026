"use client";

import { useGetTopSaleBannerQuery } from "@/store/topSaleBannerApi";
import Image from "next/image";
import Link from "next/link";

// Match this to your real banner size (e.g. 1200x400 = 3/1, 1200x375 = 16/5)
const BANNER_ASPECT = "aspect-[3/1]";

const NewOfferBannerSkeleton = () => (
  <section className="w-full bg-white py-4 dark:bg-[#111]">
    <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-4">
        {[0, 1].map((i) => (
          <div
            key={i}
            className={`${BANNER_ASPECT} w-full animate-pulse rounded-xl bg-gray-200 dark:bg-neutral-800 ${
              i === 1 ? "hidden md:block" : ""
            }`}
          />
        ))}
      </div>
    </div>
  </section>
);

const NewOfferBanner = () => {
  const { data: banners = [], isLoading, isError } = useGetTopSaleBannerQuery();

  if (isLoading) return <NewOfferBannerSkeleton />;
  if (isError || !banners?.length) return null;

  const banner = banners[0];
  const images = [banner?.offerBannerImg2, banner?.offerBannerImg3].filter(
    Boolean,
  ) as string[];

  if (!images.length) return null;

  return (
    <section className="w-full bg-white py-4 dark:bg-[#111]">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 gap-3 lg:gap-4 ${
            images.length > 1 ? "md:grid-cols-2" : ""
          }`}
        >
          {images.map((src, i) => (
            <Link
              key={i}
              href="/product-list"
              className={`group relative block ${BANNER_ASPECT} w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-neutral-800`}
            >
              <Image
                src={src}
                alt={`Offer Banner ${i + 1}`}
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 1600px) 50vw, 760px"
                className="object-cover object-center transition-transform duration-500 [@media(hover:hover)]:group-hover:scale-[1.02]"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewOfferBanner;