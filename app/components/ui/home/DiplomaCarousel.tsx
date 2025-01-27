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
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Image from "next/image";
import { Diploma, diplomasData } from "@/app/types/diploma";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";

export function DiplomaCarousel({ direction }: { direction: "ltr" | "rtl" }) {
  return (
    <section className="py-16 ">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#2d5482] font-bold mb-2">Explore our new</p>
          <h2 className="text-3xl font-bold mb-4">Mtn Institute Diplomas</h2>
          <p className="text-gray-600">Take a new step towards your career</p>
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
            // navigation
            pagination={{ clickable: true }}
            // autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
            dir={direction}
            className="pb-12" // Add padding bottom to make room for pagination
            breakpoints={{
              350: {
                slidesPerView: "auto",
              },

              640: {
                slidesPerView: 3,
                spaceBetween: 10,
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
            {diplomasData.map((diploma) => (
              <SwiperSlide key={diploma.id} className="h-auto">
                <DiplomaCard diploma={diploma} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

// DiplomaCard component
interface DiplomaCardProps {
  diploma: Diploma;
}

function DiplomaCard({ diploma }: DiplomaCardProps) {
  return (
    <Link href={`/diploma/${diploma.id}`}>
      <Card className="p-6 h-full flex flex-col">
        <div className="flex justify-center mb-6 flex-shrink-0">
          <Image
            src={diploma.logoUrl}
            alt={diploma.title}
            width={120}
            height={120}
            className="object-contain"
          />
        </div>

        <h3 className="text-xl text-[#10458c] font-bold text-center mb-6 flex-shrink-0">
          {diploma.title}
        </h3>

        <div className="space-y-3 flex-grow">
          {diploma.features.map((feature) => (
            <div key={feature.id} className="flex items-start gap-2">
              <Check className="h-4 w-4 text-blue-600 flex-shrink-0 mt-1" />
              <span className="text-sm text-gray-700">{feature.name}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-3 flex-shrink-0">
          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            Enroll Now
          </Button>
          <Button
            variant="outline"
            className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            Show More
          </Button>
        </div>
      </Card>
    </Link>
  );
}
