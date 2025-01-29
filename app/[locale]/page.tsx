//the land page which is in
// app/[locale]/page.tsx

import HomeBanner from "../Sitecomponents/common/home/Banner";
import Feedbacks from "../Sitecomponents/common/home/Feedbacks";
import FreeStudySection from "../Sitecomponents/common/home/FreeStudySection";
import HomeContent from "../Sitecomponents/common/home/HomeContent";
import { MainCarousel } from "../Sitecomponents/common/home/MainCarousel";
import OurDiplomas from "../Sitecomponents/common/home/OurDiplomas";
import { Footer } from "../Sitecomponents/layout/Footer";
import Navbar from "../Sitecomponents/layout/Navbar";

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="w-full pt-5 px-3 bg-background">
        <MainCarousel />
        <HomeContent />
        <FreeStudySection />
        <HomeBanner />
        <OurDiplomas />
        <Feedbacks />
        <Footer />
      </div>
    </>
  );
}
