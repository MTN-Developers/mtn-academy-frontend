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
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import img from "@/public/images/ellipse.svg";

const slides = [
  {
    id: 1,
    image: img,
    name: "Rick Wright",
  },
  {
    id: 2,
    image: img,
    name: "Rick Wright",
  },
  {
    id: 3,
    image: img,
    name: "Rick Wright",
  },
  {
    id: 4,
    image: img,
    name: "Rick Wright",
  },
  {
    id: 5,
    image: img,
    name: "Rick Wright",
  },
  {
    id: 6,
    image: img,
    name: "Rick Wright",
  },
];

export function FeedbackCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [current, setCurrent] = React.useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

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
          align: "center",
          loop: true,
        }}
        setApi={setApi}
      >
        <CarouselContent className="mx-2 my-5">
          {slides.map((slide) => (
            <CarouselItem
              key={slide.id}
              className="pl-0 mx-10 md:basis-2/5"
            >
              <div className="relative bg-white shadow-lg rounded-lg p-8 mt-16">
                {/* Image Container */}
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                  <Image
                    src={slide.image}
                    alt={slide.name || "User profile"}
                    className="w-32 h-32 rounded-full border-2 border-white shadow-md"
                  />
                </div>

                {/* Content Container */}
                <div className="mt-16 flex flex-col items-center space-y-4">
                  {/* Testimonial Text */}
                  <p className="text-gray-600 text-center text-sm leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nunc vulputate libero et velit interdum, ac aliquet odio
                    mattis. Class aptent taciti sociosqu ad litora torquent per
                    conubia nostra, per inceptos himenaeos.
                  </p>

                  {/* Name */}
                  <h3 className="text-blue-600 text-xl font-semibold">
                    {slide.name}
                  </h3>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex justify-center items-center gap-10 mt-4">
        {/* Back Button */}
        <div
          className="w-12 h-12 flex justify-center items-center rounded-full bg-white shadow-lg cursor-pointer"
          onClick={() => api?.scrollPrev()} // Scroll to the previous slide
        >
          <IoIosArrowBack className="text-4xl text-primary-blue" />
        </div>

        {/* Forward Button */}
        <div
          className="w-12 h-12 flex justify-center items-center rounded-full bg-white shadow-lg cursor-pointer"
          onClick={() => api?.scrollNext()} // Scroll to the next slide
        >
          <IoIosArrowForward className="text-4xl text-primary-blue" />
        </div>
      </div>
    </div>
  );
}
