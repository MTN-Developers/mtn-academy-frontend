import ContactUsComp from '@/app/components/contactus/ContactUsComp';
import { Footer } from '@/app/components/ui/home/Footer';
import Navbar from '@/app/Sitecomponents/layout/Navbar';
import React from 'react';

const page = () => {
  return (
    <>
      <Navbar />
      <div className="flex w-fit mx-auto flex-col gap-10 justify-between items-center">
        <div dir="ltr">
          <div className="py-6 md:py-10  text-gray-800">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Contact us</h2>

            <div className="mb-10">
              <h3 className="text-xl font-semibold mb-2">UAE</h3>
              <p className="mb-1">MTN LLC</p>
              <p className="mb-1">
                <strong>Phone :</strong> +971502151131
              </p>
              <p className="mb-1">
                <strong>Address :</strong> p2-0189, 4D Street, Rega Al Buteen,, Dubai
              </p>
              <p className="mb-1">
                <strong>Email :</strong>
                <a href="mailto:info@managethenow.com" className="text-blue-600 hover:underline">
                  info@managethenow.com
                </a>
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Egypt</h3>
              <p className="mb-1">MTN LLC</p>
              <p className="mb-1">
                41 Mohammed Tawfik Diab, Al Mintaqah as Sādisah, Nasr City, Cairo Governorate 4450340, Egypt Cairo
              </p>
              <p className="mb-1">Governorate 4450340 Egypt</p>
              <p className="mb-1">
                <strong>Phone:</strong> 02 22732722
              </p>
              <p className="mb-1">
                <strong>Email :</strong>
                <a
                  href="mailto:info@managethenow.com

"
                  className="text-blue-600 hover:underline"
                >
                  info@managethenow.com
                </a>
              </p>
            </div>
          </div>
        </div>
        <ContactUsComp />
      </div>
      <Footer />
    </>
  );
};

export default page;
