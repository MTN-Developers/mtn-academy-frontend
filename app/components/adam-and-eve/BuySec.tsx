'use client';
import React from 'react';

export default function BuySec({ handleBuy }: { handleBuy: () => void }) {
  return (
    <section className="pt-16 px-4 bg-white text-center">
      <h2 className="text-2xl md:text-6xl font-bold text-gray-900 mb-32">اشترك الآن</h2>

      <div className="relative w-full lg:max-w-3xl mx-auto">
        {/* Background shapes */}
        <div className="absolute -top-4 -left-4 w-full h-full rounded-3xl bg-[#902c86] rotate-[-6deg] z-0" />
        <div className="absolute -top-6 -right-4 w-full h-full rounded-3xl bg-blue-600 rotate-[8deg] z-0" />

        {/* Main Card */}
        <div className="relative z-10 bg-white p-8 rounded-3xl shadow-lg border border-gray-200">
          <p className="text-gray-800 font-semibold text-2xl mb-1">اسرع بالاشتراك الان</p>
          <p className="text-gray-500 mb-4">سعر الاشتراك</p>
          <p className="text-6xl font-bold text-[#902c86] mb-2">$400</p>
          {/* <p className="text-sm text-gray-600 mb-6"> لقاء مع دكتور أحمد الدملاوي</p> */}

          <button
            onClick={() => handleBuy()}
            className="bg-[#902c86] text-white text-lg font-semibold px-8 py-3 rounded-xl hover:bg-purple-800 transition duration-300 w-full"
          >
            اشترك الآن
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center text-sm text-gray-500 space-y-2">
        <div className="flex justify-center gap-6 text-[#902c86] text-sm flex-wrap">
          <a href="#" className="hover:underline">
            Company
          </a>
          <a href="#" className="hover:underline">
            Youtube
          </a>
          <a href="#" className="hover:underline">
            X
          </a>
          <a href="#" className="hover:underline">
            Facebook
          </a>
        </div>
        <p className="text-xs text-gray-400 mt-4">© 2024 All Rights Reserved – Mange The Now</p>
      </footer>
    </section>
  );
}
