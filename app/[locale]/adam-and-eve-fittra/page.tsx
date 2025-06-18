import ContentSec from '@/app/components/adam-and-eve/ContentSec';
import HeroSec from '@/app/components/adam-and-eve/HeroSec';
import Navbar from '@/app/components/adam-and-eve/Navbar';
import ObstSec from '@/app/components/adam-and-eve/ObstSec';
import SufferSec from '@/app/components/adam-and-eve/SufferSec';
import WaadSec from '@/app/components/adam-and-eve/WaadSec';
import React from 'react';

const page = () => {
  return (
    <div>
      <Navbar />
      <HeroSec />
      <ContentSec />
      <WaadSec />
      <ObstSec />
      <SufferSec />
    </div>
  );
};

export default page;
