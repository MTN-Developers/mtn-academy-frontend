'use client';

import { useParams } from 'next/navigation';
import { Footer } from '../components/ui/home/Footer';
//the land page which is in
// app/[locale]/page.tsx

import HomeBanner from '../Sitecomponents/common/home/Banner';
import { FeedbackCarousel } from '../Sitecomponents/common/home/FeedbackCarousel';
import FreeStudySection from '../Sitecomponents/common/home/FreeStudySection';
import HomeContent from '../Sitecomponents/common/home/HomeContent';
// import { MainCarousel } from '../Sitecomponents/common/home/MainCarousel';
import OurDiplomas from '../Sitecomponents/common/home/OurDiplomas';
import Navbar from '../Sitecomponents/layout/Navbar';
import { MainCarousel } from '@/app/components/ui/home/MainCarousel';
import { getLangDir } from 'rtl-detect';
import StandaloneStudy from '../components/standaloneStudy/StandaloneStudy';
import ContactUsComp from '../components/contactus/ContactUsComp';

export default function Page() {
  const params = useParams();
  const locale = params.locale as string;

  const direction = getLangDir(locale);

  // cred

  // console.log('NEXT_PUBLIC_ZOOM_MEETING_NUMBER', process.env.NEXT_PUBLIC_ZOOM_MEETING_NUMBER);
  // // console.log('NEXT_PUBLIC_ZOOM_MEETING_PASSWORD', process.env.NEXT_PUBLIC_ZOOM_MEETING_PASSWORD);
  // console.log('ZOOM_SDK_KEY', process.env.ZOOM_SDK_KEY);
  // console.log('ZOOM_SDK_SECRET', process.env.ZOOM_SDK_SECRET);

  return (
    <>
      <Navbar />
      <div className="w-full pt-5 px-3 bg-background">
        {/* <MainCarousel /> */}
        <MainCarousel key={locale} direction={direction} />

        <HomeContent />
        <FreeStudySection />
        <StandaloneStudy isPublic={true} />
        {/* <FreeStudiesComp semesters={semesters} direction="ltr" /> */}
        <HomeBanner />
        <OurDiplomas />
        <FeedbackCarousel />
        <ContactUsComp />
        <Footer />
      </div>
    </>
  );
}
