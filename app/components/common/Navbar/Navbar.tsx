//components/common/Navbar.tsx
'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useParams, usePathname, useRouter } from 'next/navigation';

import { useSelector } from 'react-redux';
import { RootState } from '@/app/lib/redux/store';
import NavMobileFragment from './NavMobileFragment';
import NavWebFragment from './NavWebFragment';

const Navbar = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const t = useTranslations('navbar');
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  if (pathname.includes('live-session')) {
    return null;
  }

  console.log('pathname', pathname);

  const handleLanguageChange = (newLocale: string) => {
    const currentPathname = window.location.pathname;
    const pathWithoutLocale = currentPathname.replace(`/${locale}`, '');
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    router.push(newPath);
    setIsOpen(false);
  };

  const menuItems = [
    { label: t('menu.home'), href: `/${locale}/dashboard` },
    { label: t('menu.freeStudy'), href: `#` },
    // { label: t("menu.academy"), href: `/${locale}/academy` },
  ];

  const handleNavigation = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  return (
    <div dir={locale === 'ar' ? 'rtl' : 'ltr'} className="w-full py-3 px-4 lg:py-[12px] lg:px-[16px] z-90 bg-[#f2f2f2]">
      <NavMobileFragment
        handleLanguageChange={handleLanguageChange}
        handleNavigation={handleNavigation}
        isOpen={isOpen}
        locale={locale}
        menuItems={menuItems}
        setIsOpen={setIsOpen}
        t={t}
        user={user}
      />

      <NavWebFragment
        handleLanguageChange={handleLanguageChange}
        handleNavigation={handleNavigation}
        locale={locale}
        menuItems={menuItems}
        t={t}
        user={user}
      />
    </div>
  );
};

export default Navbar;
