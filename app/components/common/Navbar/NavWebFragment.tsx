// components/common/Navbar.tsx
'use client';
import Image from 'next/image';
import React from 'react';
import mtnLogo from '@/public/images/mtn-logo.svg';
import { ChevronDown, Globe, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarTrigger,
} from '@/components/ui/menubar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDispatch } from 'react-redux';
import { logout } from '@/app/lib/redux/features/authSlice';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const NavWebFragment = ({ locale, t, menuItems, handleLanguageChange, handleNavigation, user }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
    router.refresh();
  };

  return (
    <>
      {/* Add a spacer div to prevent content from going under the fixed navbar */}
      <div className="hidden lg:block h-[55px]" /> {/* Adjust height to match your navbar height */}
      <nav className="hidden lg:block fixed top-0 left-0 right-0 z-50 bg-[#f2f2f2] shadow-sm">
        <div className="max-w-[1920px] mx-auto px-6 py-3">
          <div className="flex justify-between items-center gap-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href={`/${locale}`}>
                <Image src={mtnLogo} width={45} height={45} alt="mtn logo" className="w-auto h-auto" />
              </Link>
            </div>

            {/* Search Bar */}
            {/* <div className="flex-1 max-w-[690px]">
              <div className="relative">
                <input
                  type="search"
                  placeholder={t('search.placeholder')}
                  className={`w-full py-2 ${
                    locale === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'
                  } rounded-full outline-none bg-gray-50 focus:bg-white transition-colors duration-200 border border-gray-200 focus:border-blue-500`}
                />
                <Search
                  className={`absolute ${
                    locale === 'ar' ? 'right-3' : 'left-3'
                  } top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400`}
                />
              </div>
            </div> */}

            {/* Navigation and User Controls */}
            <div className="flex items-center gap-4">
              <Menubar className="bg-transparent border-none">
                {menuItems.map(item => (
                  <MenubarMenu key={item.href}>
                    <MenubarTrigger
                      onClick={() => handleNavigation(item.href)}
                      className="hover:bg-gray-50 data-[state=open]:bg-gray-50"
                    >
                      {item.label}
                    </MenubarTrigger>
                  </MenubarMenu>
                ))}

                {/* Language Selector */}
                <MenubarMenu>
                  <MenubarTrigger className="flex items-center gap-1 hover:bg-gray-50 data-[state=open]:bg-gray-50">
                    <Globe className="h-5 w-5" />
                    <span>{t('menu.language')}</span>
                    <ChevronDown className="h-4 w-4" />
                  </MenubarTrigger>
                  <MenubarContent align="end">
                    <MenubarRadioGroup value={locale}>
                      <MenubarRadioItem value="ar" onClick={() => handleLanguageChange('ar')}>
                        العربية
                      </MenubarRadioItem>
                      <MenubarRadioItem value="en" onClick={() => handleLanguageChange('en')}>
                        English
                      </MenubarRadioItem>
                    </MenubarRadioGroup>
                  </MenubarContent>
                </MenubarMenu>

                {/* Notifications */}
                {/* <MenubarMenu>
                  <MenubarTrigger className="hover:bg-gray-50 data-[state=open]:bg-gray-50">
                    <Bell className="h-5 w-5" />
                  </MenubarTrigger>
                  <MenubarContent align="end" className="w-[300px]">
                    <div className="p-3">
                      <h3 className="font-semibold mb-2">{t('menu.notifications.title')}</h3>
                      <div className="space-y-2 text-sm">
                        <div className="p-2 hover:bg-gray-50 rounded-md">{t('menu.notifications.one')}</div>
                        <div className="p-2 hover:bg-gray-50 rounded-md">{t('menu.notifications.two')}</div>
                        <div className="p-2 hover:bg-gray-50 rounded-md">{t('menu.notifications.three')}</div>
                      </div>
                    </div>
                  </MenubarContent>
                </MenubarMenu> */}
              </Menubar>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-10 w-10 cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-blue-500 transition-all duration-200">
                    <AvatarFallback className="bg-blue-500 text-white">{user?.name?.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuLabel
                    onClick={handleLogout}
                    className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuLabel>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavWebFragment;
