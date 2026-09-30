"use client";

import { useGetTopSaleBannerQuery } from "@/store/topSaleBannerApi";
import Image from "next/image";
import Link from "next/link";

const NewOfferBanner = () => {
  const { data: banners = [], isLoading, isError } = useGetTopSaleBannerQuery();

  if (isLoading || isError || !banners?.length) {
    return null;
  }

  const banner = banners[0];

  const firstBanner = banner?.offerBannerImg2 || "";
  const secondBanner = banner?.offerBannerImg3 || "";

  return (
    <section className="w-full bg-white py-4 dark:bg-[#111]">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-4">
          {/* First Banner */}
          {firstBanner && (
            <div>
              <Link
                href="/product-list"
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
                  src={firstBanner}
                  alt="Offer Banner"
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
            </div>
          )}

          {/* Second Banner */}
          {secondBanner && (
            <div>
              <Link
                href="/product-list"
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
                  src={secondBanner}
                  alt="Offer Banner"
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
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewOfferBanner;
