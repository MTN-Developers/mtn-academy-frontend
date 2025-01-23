//components/common/Navbar.tsx
"use client";

import Image from "next/image";
import React from "react";
import mtnLogo from "@/public/images/mtn-logo.svg";
import { Bell, ChevronDown, Globe, Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";

import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/redux/store";

const Navbar = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const t = useTranslations("navbar");
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;

  console.log("user is", user);

  const handleLanguageChange = (newLocale: string) => {
    // Get the current pathname without the locale
    const currentPathname = window.location.pathname;
    const pathWithoutLocale = currentPathname.replace(`/${locale}`, "");

    // Construct new path with new locale
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    router.push(newPath);
  };

  return (
    <div
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="w-full lg:py-[12px] lg:px-[16px] bg-[#f2f2f2] shadow-2xl flex justify-between items-center"
    >
      {/* logo */}
      <Image src={mtnLogo} width={45} height={45} alt="mtn logo" />

      {/* search input */}
      <div className="relative hidden lg:block">
        <input
          type="search"
          placeholder={t("search.placeholder")}
          className={`h-full w-[690px] py-2 ${
            locale === "ar" ? "pr-10 pl-4" : "pl-10 pr-4"
          } rounded-full outline-none shadow-sm`}
        />
        <Search
          className={`absolute ${
            locale === "ar" ? "right-3" : "left-3"
          } top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400`}
        />
      </div>

      {/* menu items */}
      <div>
        <Menubar className="bg-transparent border-none">
          <MenubarMenu>
            <MenubarTrigger>{t("menu.home")}</MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>{t("menu.freeStudy")}</MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>{t("menu.academy")}</MenubarTrigger>
          </MenubarMenu>
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
          <MenubarMenu>
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
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>
              <Avatar className="h-10">
                <AvatarFallback>{user?.name?.slice(0, 2)}</AvatarFallback>
              </Avatar>
            </MenubarTrigger>
          </MenubarMenu>
        </Menubar>
      </div>
    </div>
  );
};

export default Navbar;
