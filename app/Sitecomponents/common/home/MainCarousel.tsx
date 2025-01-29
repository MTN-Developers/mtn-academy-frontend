// components/ui/home/MainCarousel.tsx
"use client";
import * as React from "react";
import Image from "next/image";

import saleImg from "@/public/images/slider.png";

export function MainCarousel() {
  // const [current, setCurrent] = React.useState(0);

  // useEffect(() => {
  //   if (!api) {
  //     return;
  //   }

  //   api.on("select", () => {
  //     setCurrent(api.selectedScrollSnap());
  //   });
  // }, [api]);

  // const handleDotClick = React.useCallback(
  //   (index: number) => {
  //     api?.scrollTo(index);
  //   },
  //   [api]
  // );

  // const slideInterval = 4000;

  //Auto sliding animation
  // useEffect(() => {
  //   if (!api) {
  //     return;
  //   }

  //   const interval = setInterval(() => {
  //     api.scrollNext();
  //   }, slideInterval);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [api]);

  return (
    <div className="relative w-full">
      <div className="relative w-full h-[450px] rounded-lg overflow-hidden">
        <Image src={saleImg} alt="background" className="object-cover w-full" />
      </div>

      {/* Dots */}
      {/* <div className="flex justify-center gap-2 mt-4">
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
      </div> */}
    </div>
  );
}
