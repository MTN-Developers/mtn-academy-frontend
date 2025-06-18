import ContentSec from '@/app/components/adam-and-eve/ContentSec';
import HeroSec from '@/app/components/adam-and-eve/HeroSec';
import Navbar from '@/app/components/adam-and-eve/Navbar';
import WaadSec from '@/app/components/adam-and-eve/WaadSec';
import React from 'react';

const page = () => {
  return (
    <div>
      <Navbar />
      <HeroSec />
      <ContentSec />
      <WaadSec />
    </div>
  );
};

export default page;
