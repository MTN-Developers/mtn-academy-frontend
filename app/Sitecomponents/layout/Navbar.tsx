//components/common/Navbar.ts
"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
// import { useSelector } from "react-redux";
// import { RootState } from "@/app/lib/redux/store";
import NavWebFragment from "./NavWebFragment";
import NavMobileFragment from "./NavMobileFragment";
// import { RootState } from "@/lib/redux/store";

const Navbar = () => {
  const t = useTranslations("navbar");
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const [isOpen, setIsOpen] = useState(false);
  const handleLanguageChange = (newLocale: string) => {
    const currentPathname = window.location.pathname;
    const pathWithoutLocale = currentPathname.replace(`/${locale}`, "");
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    router.push(newPath);
    setIsOpen(false);
  };
  const menuItems = [
    { label: t("menu.home"), href: `/${locale}/` },
    { label: t("menu.freeStudy"), href: `/${locale}/free-study` },
    { label: t("menu.academy"), href: `/${locale}/academy` },
  ];
  const handleNavigation = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };
  return (
    <div
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="w-full py-3 px-4 lg:py-[12px] lg:px-[16px] bg-[#F2F2F2] shadow-lg"
    >
      <NavMobileFragment
        handleLanguageChange={handleLanguageChange}
        handleNavigation={handleNavigation}
        isOpen={isOpen}
        locale={locale}
        menuItems={menuItems}
        setIsOpen={setIsOpen}
        t={t}
      />
      <NavWebFragment
        handleLanguageChange={handleLanguageChange}
        handleNavigation={handleNavigation}
        locale={locale}
        menuItems={menuItems}
        t={t}
      />
    </div>
  );
};

export default Navbar;
