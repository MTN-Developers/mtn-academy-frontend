// src/app/[locale]/login/page.tsx
"use client";

import { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import bannerMob from "@/public/images/login-banner-mob.svg";
import mtnLogo from "@/public/images/mtn-logo.svg";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  return (
    <div
      dir={locale === "ar" ? "rtl" : "lrt"}
      className="w-full h-full bg-white"
    >
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
    </div>
  );
}
