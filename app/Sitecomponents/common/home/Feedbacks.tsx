import { FeedbackCarousel } from "./FeedbackCarousel";

export default function Feedbacks() {
  return (
    <div className="container w-full mx-auto flex  items-center flex-col">
      <div className="flex flex-col items-center justify-center p-4 my-5">
        <h3 className="font-bold text-lg">TESTIMONIALS</h3>
        <h1 className="hidden md:block text-5xl text-primary-blue font-bold">
          What Our Customers Say
        </h1>
        <h1 className="block md:hidden text-[2.5rem] text-primary-blue font-bold">
          Our Customers
        </h1>
        <p className="w-full md:w-3/5 text-center mt-5 text-lg text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet odio mattis. Class
          aptent taciti sociosqu ad litora torquent per conubia nostra, per
          inceptos himenaeos.
        </p>
      </div>
      <FeedbackCarousel />
    </div>
  );
}
