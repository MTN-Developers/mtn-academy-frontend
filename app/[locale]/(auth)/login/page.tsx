// src/app/[locale]/login/page.tsx
"use client";

import { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import bannerMob from "@/public/images/login-banner-mob.svg";
import bannerWeb from "@/public/images/login-banner-web.svg";
import mtnLogo from "@/public/images/mtn-logo.svg";
import googleIcon from "@/public/icons/google-icon.svg";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react"; // Import icons
import { Switch } from "@/components/ui/switch";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("login");
  const params = useParams();
  const locale = params.locale as string;

  // Change from redirect to callbackUrl to match middleware
  const callbackUrl = searchParams.get("redirect"); // Changed from "callbackUrl"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login({ email, password });
    if (success) {
      // Use the locale from params, not from searchParams
      const redirectTo = callbackUrl
        ? `/${locale}${callbackUrl}`
        : `/${locale}/dashboard`;
      router.push(redirectTo);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      dir={locale === "ar" ? "rtl" : "lrt"}
      className="w-full h-full bg-white"
    >
      <div className=" w-full h-screen flex justify-center items-center  ">
        {/* bannner web */}
        <div className="w-full h-full hidden lg:block bg-gray-400 overflow-hidden">
          <Image
            src={bannerWeb}
            alt="banner web"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          {/* banner mob */}
        <div className="block overflow-hidden relative lg:hidden w-full  h-[360px]">
          <Image
            src={bannerMob}
            alt="banner-mob"
            className="object-cover w-full"
          />
          <div className={`absolute bottom-4 p-4`}>
            <Image src={mtnLogo} alt="mtn logo" />
            <h2 className="font-bold mt-6">{t("Nice to see you again")}</h2>
          </div>
        </div>
        
        {/* from body */}
        <div className="lg:w-[456px] w-full p-4 lg:p-[48px]">
          <div className={`hidden lg:block`}>
            <Image src={mtnLogo} alt="mtn logo" />
            <h2 className="font-bold my-6">{t("Nice to see you again")}</h2>
          </div>

          <div className="grid w-full mb-8 items-center gap-1.5">
            <Label htmlFor="email">{t("email.label")}</Label>
            <Input
              type="email"
              id="email"
              placeholder={t("email.label")}
              className="bg-[#f2f2f2] focus:bg-white transition-colors"
            />
          </div>

          <div className="grid w-full mb-8 items-center gap-1.5">
            <Label htmlFor="password">{t("password.label")}</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("password.label")}
                className="bg-[#f2f2f2] focus:bg-white transition-colors pr-10"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className={`absolute ${
                  locale === "ar" ? "left-3" : "right-3"
                } top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none`}
              >
                {showPassword ? (
                  <EyeOff className=" h-4 w-4" />
                ) : (
                  <Eye className=" h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          <div className="flex w-full justify-between items-center">
            <div className="flex items-center space-x-2">
              <Switch
                id="remember-me"
                className="data-[state=checked]:bg-primary"
              />
              <Label htmlFor="remember-me">{t("button.RememberMe")}</Label>
            </div>
            <div>
              <button className="text-xs text-blue-600 underline ">
                {t("password.forgotPassword")}
              </button>
            </div>
          </div>

          <div className="grid w-full mb-8 items-center gap-1.5">
            <Button className="bg-[#007aff] py-2 my-[28px] text-white">
              {t("button.submit")}
            </Button>

            <Button className="bg-[#333333] py-2 my-[28px] text-white">
              <Image src={googleIcon} alt="google icon" />
              {t("button.signWithGoogle")}
            </Button>

            <p className="text-center text-sm">
              {t("button.dontHaveAccount")}{" "}
              <Link
                href={"/register"}
                className="cursor-pointer text-blue-500 underline"
              >
                {t("button.createAccount")}
              </Link>
            </p>
          </div>

          {/* Language switcher */}
          <div className="mt-4 text-center">
            <Link
              href={locale === "en" ? "/ar/login" : "/en/login"}
              className="text-sm text-primary hover:text-primary/90"
            >
              {locale === "en" ? "العربية" : "English"}
            </Link>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
