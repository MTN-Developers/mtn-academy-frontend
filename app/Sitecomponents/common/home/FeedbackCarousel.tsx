// components/ui/home/MainCarousel.tsx
'use client';
import * as React from 'react';
import Image from 'next/image';
import { useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import img from '@/public/images/ellipse.svg';
import { useParams } from 'next/navigation';

const slides = [
  {
    id: 1,
    image: img,
    name: 'Marwa',
    content_ar:
      'بالنسبة للخمسة أيام لبرنامج لوشر مع دكتور اندرياس كان بالنسبة لي كا نظرة عامة لبرنامج لوشر للحاجات الأساسية وازاي نفهم حساب الأكواد بالنبسو لدكتور احمد طاقة غير في طاقة غير في تقب وتفهم وكمان بيفيد ويستزيد في المعلومة وحابب من كل قلبو انو يوصل ان احنا نشعر المعلومة بالنسبة لبرنامج لوشر انا بنصح أي حد كا معالجين ومدربين ممكن يستفيدو استفادة كبيرة او ممكن يبسطلهم ويوصلهم لجذر المشكلة ويسرعلك طريقة العلاجية الي أصلا ممكن تتعاملي معاها مع العميل',
    content_en:
      'As for the five days of the Lüscher program with Dr. Andreas, it was, for me, an overview of the essential foundations of the Lüscher program and how to understand the code calculations.Regarding Dr. Ahmed—he is truly a different kind of energy: energy in giving, understanding, and a genuine passion for sharing knowledge. He always adds value and enriches the information, and he wholeheartedly wants to deliver it in a way that makes us truly feel and connect with it.As for the Lüscher program, I highly recommend it to any therapists or trainers—it can be incredibly beneficial. It simplifies and reveals the root of the issue, and it can accelerate your therapeutic approach when working with clients.',
  },
  {
    id: 2,
    image: img,
    name: 'Hanan',
    content_ar:
      'لوشر للامانة كان حالة خاصة ان انا مثلا صعب ان كل الناس نتحاور معاها ويعترفو بالمشاعر حتي نحن الدكترو قعد يشرح ان بكتيب صغير بالوان بسيطة ان احنا ممكن نعرف عالم ها الانسان',
    content_en:
      "Lüscher, honestly, was a unique case—it's usually hard to get people to open up and express emotions, but as the doctor explained, with a small booklet and simple colors, we can uncover an entire inner world of a person.",
  },
  {
    id: 3,
    image: img,
    name: 'Hanan Henaidy',
    content_ar:
      'انا اخترت احضر برنامج لوشر لاني مهتمة جدا بفهم النفس البشرية من اجل انا اساعد الاشخاص الذين اتعامل معاهم',
    content_en:
      "I chose to attend the Lüscher program because I'm deeply interested in understanding human psychology so I can better help the people I work with.",
  },
  {
    id: 4,
    image: img,
    name: 'Manal Al-Hammady',
    content_ar:
      'شركة MTN انا معاهم من سنة ونصف تقريبا كل فترة بيبهروني بانجازاتهم وايضا بالتنظيم الي بينظموه وانا متاكدة اني اعطيهم بالكتير سنة او سنة ونصف وهيبهرو العالم',
    content_en:
      "I've been with MTN for about a year and a half, and they continue to amaze me with their achievements and the organization they maintain—and I'm confident that within a year or a year and a half, they'll impress the world.",
  },
  {
    id: 5,
    image: img,
    name: 'Hafiza Abu-Zaidany',
    content_ar:
      'أنا هاي أول مرة بحضر الاختبار والحقيقة كان يعني شي رائع  وعمل لي نقلة كثير كبيرة بالوعي علمني كيف أشعر كيف أعرف أني أوصف مشاعري لأنه إحنا الحقيقة عايشين بس منفكر بأفعالنا بس ما منفكر من مشاعرنا',
    content_en:
      'This was my first time taking the test, and honestly, it was an amazing experience that created a major shift in my awareness. It taught me how to feel and how to identify and describe my emotions—because in reality, we live thinking about our actions, but rarely about our feelings.',
  },
];

export function FeedbackCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [current, setCurrent] = React.useState(0);
  const { locale } = useParams();

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on('select', () => {
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
          align: 'center',
          loop: true,
        }}
        setApi={setApi}
      >
        <CarouselContent className="mx-2 my-5">
          {slides.map(slide => (
            <CarouselItem key={slide.id} className="pl-0 mx-10 md:basis-2/5">
              <div className="relative bg-white shadow-lg rounded-lg p-8 mt-16">
                {/* Image Container */}
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                  <Image
                    src={slide.image}
                    alt={slide.name || 'User profile'}
                    className="w-32 h-32 rounded-full border-2 border-white shadow-md"
                  />
                </div>

                {/* Content Container */}
                <div className="mt-16 flex flex-col items-center space-y-4">
                  {/* Testimonial Text */}
                  <p className="text-gray-600 text-center text-sm leading-relaxed">
                    {locale === 'ar' ? slide.content_ar : slide.content_en}
                  </p>

                  {/* Name */}
                  <h3 className="text-blue-600 text-xl font-semibold">{slide.name}</h3>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex justify-center items-center gap-10 mt-4">
        {/* Forward Button */}
        <div
          className="w-12 h-12 flex justify-center items-center rounded-full bg-white shadow-lg cursor-pointer"
          onClick={() => api?.scrollNext()} // Scroll to the next slide
        >
          <IoIosArrowForward className="text-4xl text-primary-blue" />
        </div>
        {/* Back Button */}
        <div
          className="w-12 h-12 flex justify-center items-center rounded-full bg-white shadow-lg cursor-pointer"
          onClick={() => api?.scrollPrev()} // Scroll to the previous slide
        >
          <IoIosArrowBack className="text-4xl text-primary-blue" />
        </div>
      </div>
    </div>
  );
}
