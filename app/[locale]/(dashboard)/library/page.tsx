'use client';

import Navbar from '@/app/components/common/Navbar/Navbar';
import LibraryPage from '@/app/components/library/LibraryPage';
import { RootState } from '@/app/lib/redux/store';
import React from 'react';
import { default as PublicNav } from '../../../Sitecomponents/layout/Navbar';

import { useSelector } from 'react-redux';

const Page = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <div>
      {user ? <Navbar /> : <PublicNav />}
      <LibraryPage />
    </div>
  );
};

export default Page;
