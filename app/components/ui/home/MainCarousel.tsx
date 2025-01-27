"use client";

import * as React from "react";
import Image from "next/image";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import saleImg from "@/public/images/sale-slide.svg";
import imgPlaceholder from "@/public/images/image-placeholder.svg";
import { cn } from "@/lib/utils";

const slides = [
  {
    id: 1,
    image: saleImg,
  },
  {
    id: 2,
    image: imgPlaceholder,
  },
  {
    id: 3,
    image: saleImg,
  },
];

export function MainCarousel({ direction }: { direction: "ltr" | "rtl" }) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const swiperRef = React.useRef<SwiperType | null>(null);

  const handleDotClick = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideToLoop(index);
    }
  };

  return (
    <div className="relative w-full">
      <Swiper
        dir={direction}
        modules={[Autoplay, Pagination]}
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-[200px] rounded-lg overflow-hidden">
              <Image
                src={slide.image}
                alt="carousel background"
                fill
                className="object-cover w-full"
                priority
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              activeIndex === index
                ? "bg-blue-600 w-6" // Active dot
                : "bg-gray-300 hover:bg-gray-400" // Inactive dot
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
