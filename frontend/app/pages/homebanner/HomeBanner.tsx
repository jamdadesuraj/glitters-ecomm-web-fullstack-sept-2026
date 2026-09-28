"use client";

import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";

type MediaItem = {
  id: number;
  src: string;
  type?: "image" | "video";
  alt?: string;
};

const bannerMedia: MediaItem[] = [
  {
    id: 1,
    src: "/img/homebanner/1.png",
    type: "image",
    alt: "Banner 1",
  },

  {
    id: 3,
    src: "/img/homebanner/3.png",
    type: "image",
    alt: "Banner 2",
  },
];

const isVideoFile = (src: string) => {
  return /\.(mp4|webm|ogg|mov)$/i.test(src);
};

const HomeBanner = () => {
  const sliderRef = useRef<Slider | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const [activeSlide, setActiveSlide] = useState(0);

  const playActiveVideo = (index: number) => {
    videoRefs.current.forEach((video, videoIndex) => {
      if (!video) return;

      if (videoIndex === index) {
        video.currentTime = 0;

        video.play().catch(() => {
          // Browser autoplay restriction
        });
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  };

  useEffect(() => {
    playActiveVideo(activeSlide);
  }, [activeSlide]);

  const settings = {
    dots: true,
    arrows: false,

    infinite: true,
    speed: 700,

    slidesToShow: 1,
    slidesToScroll: 1,

    autoplay: true,
    autoplaySpeed: 5000,

    pauseOnHover: false,
    pauseOnFocus: false,

    swipe: true,
    draggable: true,

    cssEase: "cubic-bezier(0.45, 0, 0.15, 1)",

    beforeChange: (_current: number, next: number) => {
      setActiveSlide(next);
    },

    appendDots: (dots: React.ReactNode) => (
      <div>
        <ul className="m-0! flex items-center justify-center gap-1.5">
          {dots}
        </ul>
      </div>
    ),

    customPaging: () => (
      <button
        type="button"
        className="
          h-1.5! w-1.5!
          rounded-full
          bg-white/60
          transition-all
        "
      />
    ),
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#f7f7f7] dark:bg-[#111]">
      <div className="relative mx-auto w-full">
        {/* SLIDER */}
        <Slider ref={sliderRef} {...settings} className="home-banner-slider">
          {bannerMedia.map((item, index) => {
            const video =
              item.type === "video" || (!item.type && isVideoFile(item.src));

            return (
              <div key={item.id}>
                <div
                  className="
                    relative
                    h-30
                    w-full
                    overflow-hidden
                    bg-[#f4f4f4]
                   
                    sm:h-40
                    md:h-70
                    lg:h-90
                    xl:h-125
                    dark:bg-[#181818]
                  "
                >
                  {video ? (
                    /* VIDEO */
                    <video
                      ref={(element) => {
                        videoRefs.current[index] = element;
                      }}
                      src={item.src}
                      muted
                      playsInline
                      loop
                      preload="metadata"
                      className="
                        h-full w-full
                        object-cover
                      "
                    />
                  ) : (
                    /* IMAGE */
                    <Image
                      src={item.src}
                      alt={item.alt || "Home banner"}
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

                  {/* SOFT OVERLAY */}
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-black/10 via-transparent to-black/5" />
                </div>
              </div>
            );
          })}
        </Slider>

        {/* COUNTER */}
        <div
          className="
            absolute bottom-5 right-5 z-20
            rounded-full
            bg-black/35
            px-3 py-1.5
            text-[10px]
            font-semibold
            text-white
            backdrop-blur-md
          "
        >
          {String(activeSlide + 1).padStart(2, "0")}
          <span className="mx-1.5 opacity-50">/</span>
          {String(bannerMedia.length).padStart(2, "0")}
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
