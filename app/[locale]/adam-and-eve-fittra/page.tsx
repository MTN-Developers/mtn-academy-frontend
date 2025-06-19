'use client';
import AboutDr from '@/app/components/adam-and-eve/AboutDr';
import BuySec from '@/app/components/adam-and-eve/BuySec';
import ClientSec from '@/app/components/adam-and-eve/ClientSec';
import ContentSec from '@/app/components/adam-and-eve/ContentSec';
import Countdown from '@/app/components/adam-and-eve/Countdown';
import ElhahSec from '@/app/components/adam-and-eve/ElhahSec';
import HeroSec from '@/app/components/adam-and-eve/HeroSec';
import Navbar from '@/app/components/adam-and-eve/Navbar';
import ObstSec from '@/app/components/adam-and-eve/ObstSec';
import SufferSec from '@/app/components/adam-and-eve/SufferSec';
import SystemSec from '@/app/components/adam-and-eve/SystemSec';
import WaadSec from '@/app/components/adam-and-eve/WaadSec';
import { useRouter } from 'next/navigation';
import React from 'react';

const Page = () => {
  const link = 'https://mtninstitute.net/ar/dashboard/free-study/public/payment/adam-and-eve-mainlevel';
  const router = useRouter();

  const handleBuy = () => {
    router.push(link);
  };

  return (
    <div>
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <Navbar handleBuy={handleBuy} />
        <div className="border-t border-muted">
          <Countdown targetDate="2025-07-17T23:59:59" />
        </div>
      </div>

      <HeroSec handleBuy={handleBuy} />
      <ContentSec />
      <WaadSec handleBuy={handleBuy} />
      <ObstSec />
      <SufferSec />
      <AboutDr />
      <ClientSec handleBuy={handleBuy} />
      <ElhahSec />
      <SystemSec handleBuy={handleBuy} />
      <BuySec handleBuy={handleBuy} />
    </div>
  );
};

export default Page;
