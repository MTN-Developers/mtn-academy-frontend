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
import axiosInstance from "@/app/lib/axios/instance";
import { endpoints } from "@/app/utils/endpoints";
import { AxiosError } from "axios";

// Form schema
interface RegisterFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  country: string;
  gender: "male" | "female";
}
interface ApiErrorResponse {
  message?: string;
  errors?: Record<string, string[]>;
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
});

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [phoneData, setPhoneData] = useState<{
    phone: string;
    country: string;
  }>({
    phone: "",
    country: "",
  });

  const router = useRouter();
  const t = useTranslations("register");
  const params = useParams();
  const locale = params.locale as string;
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      country: "",
      gender: "male",
    },
  });

  // Add a function to reset all form states
  const resetFormStates = () => {
    reset({
      name: "",
      email: "",
      phone: "",
      password: "",
      country: "",
      gender: "male",
    });
    setPhoneData({ phone: "", country: "" });
    setShowPassword(false);
  };

  const handlePhoneChange = (value: string, country: any) => {
    setPhoneData({
      phone: `+${value}`,
      country: country.name,
    });
    setValue("phone", `+${value}`);
    setValue("country", country.name);
  };

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const formattedData = {
        ...data,
        phone: phoneData.phone,
        country: phoneData.country,
      };

      console.log("onSubmit", formattedData);

      const response = await axiosInstance.post(
        endpoints.register,
        formattedData
      );
      if (response.data.message === "Success" || response.data.status === 201) {
        // Show success message
        toast.success(t("registration.success"));

        // Optional: Store auth token if provided
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }

        resetFormStates();

        // Use window.location for navigation or Next.js router
        try {
          await router.push(`/${locale}/login`);
        } catch (routingError) {
          console.error(
            "Next.js routing failed, trying alternative:",
            routingError
          );
          window.location.href = `/${locale}/login`;
        }
      } else {
        throw new Error(response.data.message || t("registration.error"));
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        // Handle Axios errors
        if (error.response) {
          const errorData = error.response.data as ApiErrorResponse;
          const errorMessage = errorData.message || t("registration.error");

          switch (error.response.status) {
            case 422: // Validation error
              if (errorData.errors) {
                Object.keys(errorData.errors).forEach((key) => {
                  const fieldErrors = errorData.errors![key];
                  if (fieldErrors && fieldErrors.length > 0) {
                    toast.error(fieldErrors[0]);
                  }
                });
              }
              break;
            case 409: // Conflict - email/phone already exists
              toast.error(t("registration.userExists"));
              break;
            default:
              toast.error(errorMessage);
          }
        } else if (error.request) {
          // Network error
          toast.error(t("errors.network"));
        }
      } else if (error instanceof Error) {
        // Handle standard Error objects
        toast.error(error.message || t("errors.unknown"));
      } else {
        // Handle unknown error types
        toast.error(t("errors.unknown"));
      }
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
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
            <div className="absolute bottom-4 p-4">
              <Image src={mtnLogo} alt="mtn logo" />
              <h2 className="font-bold mt-6">{t("Welcome onboard")}</h2>
            </div>
          </div>

          {/* Form body */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="lg:w-[456px] w-full p-4 lg:p-[48px]"
          >
            <div className="hidden lg:block">
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

                  // Remove the key prop here
                  inputProps={{
                    id: "phone-input",
                    required: true,
                    // autoFocus: true, // Add this to maintain focus
                  }}


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
              <div className="flex items-center gap-2">
                {/* If you need a real checkbox, uncomment and adjust your schema */}
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
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              className="w-full bg-[#007aff] text-white py-2 mb-10"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ...
                </div>
              ) : (
                t("Sign in")
              )}
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
