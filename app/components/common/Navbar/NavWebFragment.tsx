//components/common/Navbar.tsx
"use client";
import Image from "next/image";
import React from "react";
import mtnLogo from "@/public/images/mtn-logo.svg";
import { Bell, ChevronDown, Globe, LogOut, Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch } from "react-redux";
import { logout } from "@/app/lib/redux/features/authSlice";
import { useRouter } from "next/navigation";
const NavWebFragment = ({
  locale,
  t,
  menuItems,
  handleLanguageChange,
  handleNavigation,
  user,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  // handlers
  const handleLogout = () => {
    // logout user
    dispatch(logout());
    router.push("/login");
    router.refresh();
  };
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
          <Menubar className="bg-transparent border-none">
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
          </Menubar>
          {/* Avatar */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
              <Avatar className="h-10">
                <AvatarFallback>{user?.name?.slice(0, 2)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel
                onClick={handleLogout}
                className="flex items-center gap-2 cursor-pointer"
              >
                Logout <LogOut size={14} />
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
};
export default NavWebFragment;
