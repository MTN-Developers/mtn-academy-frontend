"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import mtnLogo from "@/public/images/mtn-logo.svg";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  locale: any;
  t: any;
  menuItems: any[];
  handleLanguageChange: (value: string) => void;
  handleNavigation: (value: string) => void;
}

const NavMobileFragment = ({
  isOpen,
  setIsOpen,
  locale,
  t,
  menuItems,
  handleLanguageChange,
  handleNavigation,
}: // user,
Props) => {
  return (
    <>
      {/* Mobile Layout */}
      <div className="flex lg:hidden items-center justify-between w-full">
        {/* Logo */}
        <Image src={mtnLogo} width={45} height={45} alt="mtn logo" />
        {/* Menu Button */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Menu">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side={locale === "ar" ? "left" : "right"}
            className="w-[300px]"
          >
            {/* <SheetHeader>
              <SheetTitle
                className={locale === "ar" ? "text-right" : "text-left"}
              >
                {t("menu.title")}
              </SheetTitle>
            </SheetHeader> */}
            <div className="mt-8 flex flex-col gap-4">
              {/* Mobile Search */}
              {/* <div className="relative">
                <input
                  type="search"
                  placeholder={t("search.placeholder")}
                  className="w-full py-2 px-4 rounded-full outline-none shadow-sm"
                />
                <Search
                  className={`absolute ${
                    locale === "ar" ? "left-3" : "right-3"
                  } top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400`}
                />
              </div> */}
              {/* Mobile Navigation Items */}
              {menuItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  className="justify-start"
                  onClick={() => handleNavigation(item.href)}
                >
                  {item.label}
                </Button>
              ))}
              {/* Mobile Language Switcher */}
              <div className="flex mx-4 flex-col gap-2">
                <p className="text-sm font-medium">{t("menu.language")}</p>
                <div className="flex gap-2">
                  <Button
                    variant={locale === "ar" ? "default" : "outline"}
                    onClick={() => handleLanguageChange("ar")}
                  >
                    العربية
                  </Button>
                  <Button
                    variant={locale === "en" ? "default" : "outline"}
                    onClick={() => handleLanguageChange("en")}
                  >
                    English
                  </Button>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button className=" bg-white border text-primary-blue  mx-2 border-primary-blue hover:bg-primary-blue hover:text-white">
                  {locale === "ar" ? "اشتراك" : "Signup"}
                </Button>
                <Button className="bg-primary-blue border-primary-blue min-w-fit  hover:bg-primary-blue">
                  {locale === "ar" ? "تسجيل الدخول" : "Login"}
                </Button>
              </div>
              {/* Mobile Notifications */}
              {/* <div className="flex items-center gap-2">
                <Bell size={20} />
                <span>{t("menu.notifications.title")}</span>
              </div> */}
              {/* Mobile Avatar */}
              {/* <div className="flex mx-4 items-center gap-2">
                <Avatar className="h-10">
                  <AvatarFallback>{user?.name?.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <span>{user?.name}</span>
              </div> */}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};
export default NavMobileFragment;
