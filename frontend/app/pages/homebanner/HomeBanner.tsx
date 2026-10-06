/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";

import { useGetHomeBannerQuery } from "@/store/homeBannerApi";

type HomeBannerItem = {
  _id: string;

  title?: string;
  subTitle?: string;
  shortDesc?: string;

  banner?: string;
  bgVideo?: string;

  status?: "active" | "inactive";
  isDeleted?: boolean;
};

const HomeBanner = () => {
  const {
    data: homeBannerResponse,
    isLoading,
    isError,
  } = useGetHomeBannerQuery();

  const sliderRef = useRef<Slider | null>(null);

  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});

  const [activeSlide, setActiveSlide] = useState(0);

  // ==========================================
  // GET API DATA
  // ==========================================
  const banners = useMemo(() => {
    let data: HomeBannerItem[] = [];

    if (Array.isArray(homeBannerResponse)) {
      data = homeBannerResponse;
      // @ts-ignore
    } else if (Array.isArray(homeBannerResponse?.data)) {
      // @ts-ignore
      data = homeBannerResponse.data;
      // @ts-ignore
    } else if (Array.isArray(homeBannerResponse?.data?.data)) {
      // @ts-ignore
      data = homeBannerResponse.data.data;
    }

    // active + not deleted + valid media
    return data.filter((item) => {
      const hasImage = Boolean(item.banner);
      const hasVideo = Boolean(item.bgVideo);

      const active = item.status === undefined || item.status === "active";

      const notDeleted =
        item.isDeleted === undefined || item.isDeleted === false;

      return (hasImage || hasVideo) && active && notDeleted;
    });
  }, [homeBannerResponse]);

  // ==========================================
  // ACTIVE VIDEO PLAY
  // ==========================================
  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([key, video]) => {
      if (!video) return;

      const index = Number(key);

      if (index === activeSlide) {
        video.currentTime = 0;

        video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [activeSlide]);

  // ==========================================
  // SLIDER SETTINGS
  // ==========================================
  const settings = {
    dots: true,

    arrows: false,

    infinite: banners.length > 1,

    speed: 700,

    slidesToShow: 1,
    slidesToScroll: 1,

    autoplay: banners.length > 1,

    autoplaySpeed: 5000,

    pauseOnHover: false,
    pauseOnFocus: false,

    swipe: true,
    draggable: true,

    cssEase: "ease-in-out",

    beforeChange: (_current: number, next: number) => {
      setActiveSlide(next);
    },

    appendDots: (dots: React.ReactNode) => (
      <div>
        <ul className="m-0 flex items-center justify-center gap-2">{dots}</ul>
      </div>
    ),

    customPaging: () => (
      <button
        type="button"
        className="
          h-2!
          w-2!
          rounded-full
          bg-white/70!
        "
      />
    ),
  };

  // ==========================================
  // LOADING
  // ==========================================
  if (isLoading) {
    return (
      <section className="w-full">
        <div
          className="
            h-30
            w-full
            animate-pulse
            bg-gray-200

            sm:h-40
            md:h-70
            lg:h-90
            xl:h-125
          "
        />
      </section>
    );
  }

  if (isError) {
    return null;
  }

  if (!banners.length) {
    return null;
  }

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-[#f7f7f7]
        dark:bg-[#111]
      "
    >
      <div className="relative w-full">
        <Slider ref={sliderRef} {...settings} className="home-banner-slider">
          {banners.map((item, index) => {
            // IMPORTANT:
            // if bgVideo exists -> video
            // otherwise banner -> image

            const isVideo = Boolean(item.bgVideo);

            const mediaUrl = isVideo ? item.bgVideo : item.banner;

            if (!mediaUrl) return null;

            return (
              <div key={item._id}>
                <div
                  className="
                    relative
                    h-50
                    w-full
                    overflow-hidden
                    bg-[#f4f4f4]

                    sm:h-40
                    md:h-70
                    lg:h-90
                    xl:h-150

                    dark:bg-[#181818]
                  "
                >
                  {/* ===================== */}
                  {/* VIDEO */}
                  {/* ===================== */}

                  {isVideo ? (
                    <video
                      ref={(element) => {
                        videoRefs.current[index] = element;
                      }}
                      src={mediaUrl}
                      muted
                      playsInline
                      loop
                      preload="auto"
                      autoPlay={index === 0}
                      className="
                        absolute
                        inset-0
                        h-full
                        w-full
                        object-fill
                      "
                      onLoadedData={(event) => {
                        if (index === activeSlide) {
                          event.currentTarget.play().catch(() => {});
                        }
                      }}
                    />
                  ) : (
                    /* ===================== */
                    /* IMAGE */
                    /* ===================== */

                    <Image
                      src={mediaUrl}
                      alt={item.title || "Home Banner"}
                      fill
                      priority={index === 0}
                      sizes="100vw"
                      className="
                        object-cover
                        transition-transform
                        duration-700
                      "
                    />
                  )}

                  {/* Overlay */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-linear-to-r
                      from-black/10
                      via-transparent
                      to-black/5
                    "
                  />
                </div>
              </div>
            );
          })}
        </Slider>

        {/* ================================== */}
        {/* COUNTER */}
        {/* ================================== */}

        {banners.length > 1 && (
          <div
            className="
              absolute
              right-5
              bottom-5
              z-20
              rounded-full
              bg-black/40
              px-3
              py-1.5
              text-[11px]
              font-semibold
              text-white
              backdrop-blur-md
            "
          >
            {String(activeSlide + 1).padStart(2, "0")}

            <span className="mx-1.5 opacity-50">/</span>

            {String(banners.length).padStart(2, "0")}
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeBanner;
