'use client';

import * as React from 'react';
import Image from 'next/image';
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
// import saleImg from "@/public/images/sale-slide.svg";
import { cn } from '@/lib/utils';
import tamahy from '@/public/images/tamahy.png';
import tamahyMob from '@/public/images/TamahiMob.png';
import lucher from '@/public/images/LuscherOffer.png';
import lucherMob from '@/public/images/luscherMob.png';
import epm from '@/public/images/EBMOffer.png';
import epmMob from '@/public/images/EBMMob.png';

const slides = [
  {
    id: 1,
    image: tamahy,
    imageMob: tamahyMob,
  },
  {
    id: 2,
    image: lucher,
    imageMob: lucherMob,
  },
  {
    id: 3,
    image: epm,
    imageMob: epmMob,
  },
];

export function MainCarousel({ direction }: { direction: 'ltr' | 'rtl' }) {
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
        onSwiper={swiper => {
          swiperRef.current = swiper;
        }}
        onSlideChange={swiper => setActiveIndex(swiper.realIndex)}
        className="w-full"
      >
        {slides.map(slide => (
          <SwiperSlide key={slide.id}>
            <div className="relative  w-full h-[400px] md:h-[200px] rounded-lg overflow-hidden">
              <Image
                src={slide.image}
                alt="carousel background"
                fill
                className="hidden md:block object-cover w-full"
                priority
              />
              <Image
                src={slide.imageMob}
                alt="carousel background"
                fill
                className="md:hidden block object-contain w-full"
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
              'w-2 h-2 rounded-full transition-all',
              activeIndex === index
                ? 'bg-blue-600 w-6' // Active dot
                : 'bg-gray-300 hover:bg-gray-400', // Inactive dot
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
