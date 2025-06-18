import Image from 'next/image';
import React from 'react';
import logoWithText from '@/public/images/adam-and-eve/logo-with-text.svg';

const Navbar = () => {
  return (
    <div dir="ltr" className="bg-[#f7f7f7] flex px-10 py-2 items-center justify-between">
      <Image src={logoWithText} width={200} height={100} alt="logo with text" />
      <button className="bg-[#902c86] py-[8px] px-[16px] text-white rounded-lg">أشترك الان</button>
    </div>
  );
};

export default Navbar;
