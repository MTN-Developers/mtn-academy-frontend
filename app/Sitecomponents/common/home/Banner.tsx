import bannerImage from "@/public/images/banner.svg";
import starImage from "@/public/icons/star.svg";
import waveImage from "@/public/icons/waves.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HomeBanner() {
  return (
    <div className="bg-primary-lightBlue mx-auto my-10 w-full md:w-[90%] rounded-2xl md:h-[380px] flex items-center justify-center">
      <div className="p-10 md:w-[70%] mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Banner Image with Star Positioned Relatively */}
        <div className="relative flex items-center justify-center">
          {/* Banner Image */}
          <Image src={bannerImage} alt="bannerImage" />

          {/* Star Image Positioned Relative to the Banner */}
          <Image
            src={starImage}
            alt="star"
            className="absolute top-[20%] left-[-2rem] w-14"
          />
          <Image
            src={starImage}
            alt="star"
            className="absolute -bottom-9 w-8"
          />

          <Image
            src={starImage}
            alt="star"
            className="absolute top-1 -right-10 md:-right-18 w-10"
          />
        </div>

        <div className="flex flex-col w-full md:w-1/2 lg:w-[40%] justify-center">
          <div className="relative">
            <h1 className="text-2xl lg:text-4xl font-bold">
              Take the next step toward your{" "}
              <span className="text-secondary-blue">Career</span>
            </h1>
            <Image
              alt="waves"
              src={waveImage}
              className="hidden lg:block lg:absolute top-10 right-[1rem] w-30"
            />
          </div>

          <p className="text-sm my-5">
            Join now to receive personalized recommendations from the full
            Therapy GYM catalog.
          </p>
          <Button className="text-lg w-fit px-8 py-6 bg-secondary-blue hover:bg-white hover:text-secondary-blue">
            Join Now
          </Button>
        </div>
      </div>
    </div>
  );
}
