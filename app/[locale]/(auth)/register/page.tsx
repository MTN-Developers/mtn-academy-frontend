// src/app/[locale]/register/page.tsx
"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import bannerMob from "@/public/images/login-banner-mob.svg";
import bannerWeb from "@/public/images/login-banner-web.svg";
import mtnLogo from "@/public/images/mtn-logo.svg";
import googleIcon from "@/public/icons/google-icon.svg";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// Form schema
interface RegisterFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  country: string;
  gender: "male" | "female";
  agreeToTerms: boolean;
}

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  country: yup.string().required("Country is required"),
  gender: yup
    .string()
    .oneOf(["male", "female"], "Please select a gender")
    .required("Gender is required"),
  agreeToTerms: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required()
    .default(true),
});

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [phoneData, setPhoneData] = useState({ phone: "", country: "" });
  const router = useRouter();
  const t = useTranslations("register");
  const params = useParams();
  const locale = params.locale as string;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      country: "",
      gender: "female",
      agreeToTerms: true,
    },
  });

  const handlePhoneChange = (value: string, country: any) => {
    setPhoneData({
      phone: `+${value}`,
      country: country.name,
    });
    setValue("phone", `+${value}`);
    setValue("country", country.name);
  };

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const formattedData = {
        ...data,
        phone: phoneData.phone,
        country: phoneData.country,
      };

      console.log("onSubmit", formattedData);

      // Implement your registration logic here
      toast.success(t("registration.success"));
      router.push(`/${locale}/login`);
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error(t("registration.error"));
    }
  };

  return (
    <div
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="w-full h-full bg-white"
    >
      <div className="w-full h-screen flex justify-center items-center">
        {/* Banner web */}
        <div className="w-full h-full hidden lg:block bg-gray-400 overflow-hidden">
          <Image
            src={bannerWeb}
            alt="banner web"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          {/* Banner mob */}
          <div className="block overflow-hidden relative lg:hidden w-full h-[360px]">
            <Image
              src={bannerMob}
              alt="banner-mob"
              className="object-cover w-full"
            />
            <div className={`absolute bottom-4 p-4`}>
              <Image src={mtnLogo} alt="mtn logo" />
              <h2 className="font-bold mt-6">{t("Welcome onboard")}</h2>
            </div>
          </div>

          {/* Form body */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="lg:w-[456px] w-full p-4 lg:p-[48px]"
          >
            <div className={`hidden lg:block`}>
              <Image src={mtnLogo} alt="mtn logo" />
              <h2 className="font-bold my-6">{t("Welcome onboard")}</h2>
            </div>

            {/* Name field */}
            <div className="grid w-full mb-6 items-center gap-1.5">
              <Label htmlFor="name">{t("Name")}</Label>
              <Input
                {...register("name")}
                type="text"
                id="name"
                placeholder={t("Enter your name")}
                className="bg-[#f2f2f2] focus:bg-white transition-colors"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Email field */}
            <div className="grid w-full mb-6 items-center gap-1.5">
              <Label htmlFor="email">{t("Email")}</Label>
              <Input
                {...register("email")}
                type="email"
                id="email"
                placeholder={t("Email or phone number")}
                className="bg-[#f2f2f2] focus:bg-white transition-colors"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password field */}
            <div className="grid w-full mb-6 items-center gap-1.5">
              <Label htmlFor="password">{t("Password")}</Label>
              <div className="relative">
                <Input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder={t("Enter password")}
                  className="bg-[#f2f2f2] focus:bg-white transition-colors pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute ${
                    locale === "ar" ? "left-3" : "right-3"
                  } top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none`}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Phone number field with country code */}
            <div className="grid w-full mb-6 items-center gap-1.5">
              <Label htmlFor="phone">{t("Phone number")}</Label>
              <div dir="ltr">
                <PhoneInput
                  country={"eg"} // Default country
                  value={phoneData.phone}
                  onChange={handlePhoneChange}
                  inputClass="bg-[#f2f2f2] focus:bg-white transition-colors w-full"
                  containerClass="phone-input"
                  buttonClass="bg-[#f2f2f2]"
                />
              </div>
              {errors.phone && (
                <span className="text-red-500 text-sm">
                  {errors.phone.message}
                </span>
              )}
            </div>

            {/* Gender Selection */}
            <div className="grid w-full mb-6 items-center gap-1.5">
              <Label>{t("Gender")}</Label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    {...register("gender")}
                    value="male"
                    className="rounded border-gray-300"
                  />
                  {t("Male")}
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    {...register("gender")}
                    value="female"
                    className="rounded border-gray-300"
                  />
                  {t("Female")}
                </label>
              </div>
              {errors.gender && (
                <span className="text-red-500 text-sm">
                  {errors.gender.message}
                </span>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="mb-6">
              <div className="flex items-center  gap-2">
                {/* <input
                  type="checkbox"
                  {...register("agreeToTerms")}
                  id="terms"
                  className="rounded border-gray-300"
                /> */}
                <Label
                  htmlFor="terms"
                  className="text-xs text-center text-gray-500"
                >
                  {t("By signing up you agree to mtn")}{" "}
                  <Link href="/terms" className="text-blue-600 hover:underline">
                    {t("terms & Conditions")}
                  </Link>{" "}
                  &{" "}
                  <Link href="#" className="text-blue-600 hover:underline">
                    {t("privacy policy")}
                  </Link>
                </Label>
              </div>
              {errors.agreeToTerms && (
                <span className="text-red-500 text-sm">
                  {errors.agreeToTerms.message}
                </span>
              )}
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              className="w-full bg-[#007aff] text-white py-2 mb-10"
            >
              {t("Sign in")}
            </Button>

            {/* Google sign in */}
            <Button
              type="button"
              onClick={() => toast.info("Google sign up not implemented yet")}
              className="w-full bg-[#333333] text-white py-2 mb-8 flex items-center justify-center gap-2"
            >
              <Image src={googleIcon} alt="google icon" className="mr-2" />
              {t("Or sign in with Google")}
            </Button>

            {/* Login link */}
            <p className="text-center text-sm">
              {t("Already have an account?")}{" "}
              <Link
                href={`/${locale}/login`}
                className="text-blue-600 hover:underline"
              >
                {t("Login now")}
              </Link>
            </p>

            {/* Language switcher */}
            <div className="mt-4 text-center">
              <Link
                href={locale === "en" ? "/ar/register" : "/en/register"}
                className="text-sm text-primary hover:text-primary/90"
              >
                {locale === "en" ? "العربية" : "English"}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
