import checkIcon from "@/public/icons/Check.svg";
import diplomasImg1 from "@/public/diplomas/diplomas1.svg";
import diplomasImg2 from "@/public/diplomas/diplomas2.svg";
import diplomasImg3 from "@/public/diplomas/diplomas3.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
const diplomasInfo = [
  {
    title: "Classification Medicine Diploma",
    image: diplomasImg1,
    items: [
      "Emotional Literacy",
      "Psychological Fitness Training",
      "Self-Healing Guide",
      "Emotional Balance Technique",
      "Adam and Eve - Basic Level",
      "Male-Female Communication",
      "Adam and Eve Marriage",
      "Typological Medicine",
    ],
  },
  {
    title: "Classification Medicine Diploma",
    image: diplomasImg2,
    items: [
      "Emotional Literacy",
      "Psychological Fitness Training",
      "Self-Healing Guide",
      "Emotional Balance Technique",
      "Adam and Eve - Basic Level",
      "Male-Female Communication",
      "Adam and Eve Marriage",
      "Typological Medicine",
      "Luscher Color Diagnostic",
      "Typological Medicine",
      "Color Diagnostic Psychological Clinic",
    ],
  },
  {
    title: "Classification Medicine Diploma",
    image: diplomasImg3,
    items: [
      "Emotional Literacy",
      "Psychological Fitness Training",
      "Self-Healing Guide",
      "Emotional Balance Technique",
      "Adam and Eve - Basic Level",
      "Male-Female Communication",
      "Adam and Eve Marriage",
      "Typological Medicine",
    ],
  },
];

export default function OurDiplomas() {
  return (
    <div className="container mx-auto my-32 flex items-center justify-center flex-col">
      <h2 className="text-primary-blue font-bold text-sm">Explore our new</h2>
      <h1 className="text-3xl font-bold my-3">Mtn institute Diplomas</h1>
      <p className="text-gray-700 font-normal">
        Take a new step towards your career
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 items-center mt-8 gap-5 w-full md:w-[80%] mx-auto">
        {diplomasInfo.map((diploma, index) => {
          return (
            <div
              key={index}
              className={`rounded-xl h-fit shadow-lg px-5 py-6 flex items-center flex-col space-y-3 ${
                index === 1 ? "order-1 lg:order-none" : "order-2 lg:order-none"
              }`}
            >
              <Image src={diploma.image} alt="diplomas" />
              <h2 className="text-primary-blue text-center font-bold text-2xl">
                {diploma.title}
              </h2>
              <div className="w-full my-5 space-y-2">
                {diploma.items.map((item, index) => {
                  return (
                    <div key={index} className="flex items-center">
                      <Image alt="check" src={checkIcon} className="mr-2" />
                      <p>{item}</p>
                    </div>
                  );
                })}
              </div>
              <Button className="w-full py-5 text-lg bg-primary-blue border-primary-blue hover:bg-white hover:text-primary-blue hover:border-2">
                Enroll Now
              </Button>
              <Button className="w-full py-5 text-lg bg-white border text-primary-blue border-primary-blue hover:bg-primary-blue hover:text-white">
                Show More
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
