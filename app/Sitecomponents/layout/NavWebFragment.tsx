/* eslint-disable @typescript-eslint/no-explicit-any */
//components/common/Navbar.tsx
"use client";
import Image from "next/image";
import React from "react";
import mtnLogo from "@/public/images/mtn-logo.svg";
import { ChevronDown, Globe, Search } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Button } from "../ui/button";

interface NavbarProps {
  locale: string;
  t: any;
  menuItems: any[];
  handleLanguageChange: (value: string) => void;
  handleNavigation: (value: string) => void;
}

const NavWebFragment = ({
  locale,
  t,
  menuItems,
  handleLanguageChange,
  handleNavigation,
}: NavbarProps) => {
  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden lg:flex justify-between items-center">
        {/* Logo */}
        <Image src={mtnLogo} width={45} height={45} alt="mtn logo" />
        {/* Desktop Search */}
        <div className="relative">
          <input
            type="search"
            placeholder={t("search.placeholder")}
            className={`h-full w-[690px] py-2 ${
              locale === "ar" ? "pr-10 pl-4" : "pl-10 pr-4"
            } rounded-full outline-none shadow-sm`}
          />
          <Search
            className={`absolute ${
              locale === "ar" ? "left-10" : "right-10"
            } top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400`}
          />
        </div>
        {/* Desktop Menu */}
        <div className="flex items-center gap-4">
          <Menubar className="bg-transparent shadow-none border-none">
            {menuItems.map((item) => (
              <MenubarMenu key={item.href}>
                <MenubarTrigger onClick={() => handleNavigation(item.href)}>
                  {item.label}
                </MenubarTrigger>
              </MenubarMenu>
            ))}
            <MenubarMenu>
              <MenubarTrigger className="flex gap-1">
                <Globe size={20} />
                {t("menu.language")}
                <ChevronDown />
              </MenubarTrigger>
              <MenubarContent>
                <MenubarRadioGroup value={locale}>
                  <MenubarRadioItem
                    value="ar"
                    onClick={() => handleLanguageChange("ar")}
                  >
                    العربية
                  </MenubarRadioItem>
                  <MenubarRadioItem
                    value="en"
                    onClick={() => handleLanguageChange("en")}
                  >
                    English
                  </MenubarRadioItem>
                </MenubarRadioGroup>
              </MenubarContent>
            </MenubarMenu>
            {/* Notifications */}
            {/* <MenubarMenu>
              <MenubarTrigger>
                <Bell size={20} />
              </MenubarTrigger>
              <MenubarContent>
                <div className="p-2">
                  <h3 className="mb-2 font-semibold">
                    {t("menu.notifications.title")}
                  </h3>
                  <div className="space-y-2">
                    <div>{t("menu.notifications.one")}</div>
                    <div>{t("menu.notifications.two")}</div>
                    <div>{t("menu.notifications.three")}</div>
                  </div>
                </div>
              </MenubarContent>
            </MenubarMenu> */}
            <div className="flex items-center space-x-3">
              <Button className=" bg-white border text-primary-blue  mx-2 border-primary-blue hover:bg-primary-blue hover:text-white">
                {locale === "ar" ? "اشتراك" : "Signup"}
              </Button>
              <Button className="bg-primary-blue border-primary-blue min-w-fit  hover:bg-primary-blue">
                {locale === "ar" ? "تسجيل الدخول" : "Login"}
              </Button>
            </div>
          </Menubar>
          {/* Avatar */}
          {/* <Avatar className="h-10">
            <AvatarFallback>{user?.name?.slice(0, 2)}</AvatarFallback>
          </Avatar> */}
        </div>
      </div>
    </>
  );
};
export default NavWebFragment;
