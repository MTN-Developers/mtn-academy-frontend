// components/ui/home/DiplomaCarousel.tsx
"use client";

import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
  FreeMode,
} from "swiper/modules";
import { Button } from "@/components/ui/button";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useAcademicPaths } from "@/app/hooks/useAcademicPaths";
import { DiplomaCardSkeleton } from "./DiplomaCardSkeleton";
import { useTranslations } from "next-intl";
import DiplomaCard from "./DiplomaCard";
import { AlertCircle } from "lucide-react";

export function DiplomaCarousel({ direction }: { direction: "ltr" | "rtl" }) {
  const { error, isLoading, paths } = useAcademicPaths();
  const t = useTranslations("diplomaCarousel");

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {t("diplomaCarousel.error.title")}
        </h3>
        <p className="text-gray-600 mb-4">{t("error.message")}</p>
        <Button onClick={() => window.location.reload()}>
          {t("{diplomaCarousel.error.tryAgain}")}
        </Button>
      </div>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto w-full">
        <div className="text-center mb-12">
          <p className="text-[#2d5482] font-bold mb-2">
            {t("header.explore")}
          </p>
          <h2 className="text-3xl font-bold mb-4">
            {t("header.title")}
          </h2>
          <p className="text-gray-600">
            {t("header.subtitle")}
          </p>
        </div>

        <div className="relative h-auto w-full">
          <Swiper
            modules={[
              Navigation,
              Pagination,
              EffectCoverflow,
              FreeMode,
              Autoplay,
            ]}
            spaceBetween={50}
            slidesPerView={1}
            effect="coverflow"
            pagination={{ clickable: true }}
            loop={!isLoading && paths?.length > 3}
            dir={direction}
            className="pb-12"
            breakpoints={{
              350: {
                slidesPerView: "auto",
              },
              640: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
              1400: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
              1800: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
              scale: 1,
            }}
          >
            {isLoading
              ? Array(3)
                  .fill(null)
                  .map((_, index) => (
                    <SwiperSlide key={`skeleton-${index}`} className="h-auto">
                      <DiplomaCardSkeleton />
                    </SwiperSlide>
                  ))
              : paths?.map((path) => (
                  <SwiperSlide key={path.id} className="h-auto">
                    <DiplomaCard path={path} direction={direction} />
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
