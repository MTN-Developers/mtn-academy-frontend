// components/ui/home/MainCarousel.tsx
"use client";
import * as React from "react";
import Image from "next/image";
import { useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import saleImg from "@/public/images/slider.png";
import { cn } from "@/lib/utils";

const slides = [
  {
    id: 1,
    image: saleImg,
  },
  {
    id: 2,
    image: saleImg,
  },
  {
    id: 3,
    image: saleImg,
  },
];

export function MainCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleDotClick = React.useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  const slideInterval = 4000;

  //Auto sliding animation
  useEffect(() => {
    if (!api) {
      return;
    }

    const interval = setInterval(() => {
      api.scrollNext();
    }, slideInterval);

    return () => {
      clearInterval(interval);
    };
  }, [api]);

  return (
    <div className="relative w-full">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent className="-ml-0">
          {slides.map((slide) => (
            <CarouselItem key={slide.id} className="pl-0 w-full">
              <div className="relative w-full h-[450px] rounded-lg overflow-hidden">
                <Image
                  src={slide.image}
                  alt="carousel background"
                  fill
                  className="object-cover w-full"
                  priority
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              current === index
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
