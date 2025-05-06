// src/app/[locale]/login/page.tsx
'use client';

import { useState } from 'react';
// import { useAuth } from "@/app/hooks/useAuth";
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import bannerMob from '@/public/images/login-banner-mob-new.svg';
import bannerWeb from '@/public/images/login-banner-web-new.svg';
import mtnLogo from '@/public/images/mtn-logo.svg';
// import googleIcon from "@/public/icons/google-icon.svg";
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner'; // Add toast notifications
import { setCookie } from 'cookies-next';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { login } from '@/app/lib/redux/features/authActions';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/lib/redux/store';
// import axiosInstance from "@/app/lib/axios/instance";

// Form schema
interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

// interface LoginPageProps {
//   params: {
//     locale: string;
//   };
// }

const schema = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  rememberMe: yup.boolean().required().default(false),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  // const { loginFn, loading } = useAuth();
  const router = useRouter();
  // const pathArr = path.split('/');
  // const locale = pathArr[1];
  const params = useParams();
  const locale = params.locale as string;
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  const [loading, setLoading] = useState(false);
  // const { loading } = useSelector((state: RootState) => state.auth);
  // Add this at the top of your component
  const [pageLoadTime] = useState(Date.now());

  const t = useTranslations('login');

  const {
    register,
    handleSubmit,
    formState: { errors },
    control, // Add control
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    // Check if this is an auto-filled submission (happens too quickly after page load)
    const isAutoFilled = document.activeElement === null;
    if (isAutoFilled && Date.now() - pageLoadTime < 1000) {
      return; // Prevent submission if it's likely an auto-fill
    }
    try {
      setLoading(true);
      const resultAction = await dispatch(login({ email: data.email, password: data.password }));
      // console.log('resultAction', resultAction);

      if (login.fulfilled.match(resultAction)) {
        toast.success('Login successful');
        // Set cookies with appropriate options
        setCookie('access_token', resultAction.payload.access_token, {
          path: '/',
        });
        setCookie('refresh_token', resultAction.payload.refresh_token, {
          path: '/',
        });
        setCookie('user', resultAction.payload.user, { path: '/' });

        // if (package_id) {
        //   try {
        //     const { data } = await axiosInstance.post(
        //       "/user-compensation-request",
        //       {
        //         package_id: package_id,
        //       }
        //     );
        //     console.log(data);
        //   } catch (e) {
        //     console.log(e);
        //   }
        // }
        // router.push("/"); // Redirect to home page
        router.replace(redirect ? `/${locale}${decodeURIComponent(redirect)}` : `/${locale}/dashboard`);
      } else {
        toast.error(resultAction.payload as string);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);

      console.error('Login error:', err);
      toast.error('An unexpected error occurred');
    }
  };

  // const handleGoogleLogin = async () => {
  //   try {
  //     // Implement Google login logic here
  //     toast.info("Google login not implemented yet");
  //   } catch (error) {
  //     toast.error(`${error}`);
  //   }
  // };

  return (
    <div dir={`${locale === 'en' ? 'ltr' : 'rtl'}`} className="w-full h-full bg-white">
      <div className="w-full lg:h-screen flex justify-center items-center">
        {/* Banner web */}
        <div className="w-full h-full hidden lg:block bg-gray-400 overflow-hidden">
          <Image src={bannerWeb} alt="banner web" className="w-full h-full object-cover" />
        </div>
        <div>
          {/* Banner mob */}
          <div className="block overflow-hidden relative lg:hidden w-full h-[360px]">
            <Image src={bannerMob} alt="banner-mob" className="object-cover w-full" />
            <div className={`absolute bottom-4 p-4`}>
              <Image src={mtnLogo} alt="mtn logo" />
              <h2 className="font-bold mt-6">{t('Nice to see you again')}</h2>
            </div>
          </div>

          {/* Form body */}
          <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="lg:w-[456px] w-full p-4 lg:p-[48px]">
            <div className={`hidden lg:block`}>
              <Image src={mtnLogo} alt="mtn logoooooooooooo" />
              <h2 className="font-bold my-6">{t('Nice to see you again')}</h2>
            </div>

            {/* Email field */}
            <div className="grid w-full mb-8 items-center gap-1.5">
              <Label htmlFor="email">{t('email.label')}</Label>
              <Input
                {...register('email')}
                type="email"
                id="email"
                autoComplete="new-email" // Use a non-standard value
                placeholder={t('email.label')}
                className="bg-[#f2f2f2] focus:bg-white transition-colors"
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>

            {/* Password field */}
            <div className="grid w-full mb-8 items-center gap-1.5">
              <Label htmlFor="password">{t('password.label')}</Label>
              <div className="relative">
                <Input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="new-password" // Use a non-standard value
                  placeholder={t('password.label')}
                  className="bg-[#f2f2f2] focus:bg-white transition-colors pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute ${
                    locale === 'ar' ? 'left-3' : 'right-3'
                  } top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none`}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </div>

            {/* Remember me and Forgot password */}
            <div className="flex w-full justify-between items-center">
              <div className="flex items-center space-x-2">
                <Controller
                  name="rememberMe"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Switch
                      id="remember-me"
                      checked={value}
                      onCheckedChange={onChange}
                      className="data-[state=checked]:bg-primary mx-2"
                    />
                  )}
                />
                <Label htmlFor="remember-me">{t('button.RememberMe')}</Label>
              </div>
              <Link href={`/${locale}/request-reset-password`} className="text-xs text-blue-600 underline">
                {t('password.forgotPassword')}
              </Link>
            </div>

            {/* Buttons */}
            <div className="grid w-full mb-8 items-center gap-1.5">
              <Button type="submit" disabled={loading} className="bg-[#007aff] py-2 my-[28px] text-white">
                {loading ? t('button.loading') : t('button.submit')}
              </Button>

              {/* <Button
                type="button"
                onClick={handleGoogleLogin}
                className="bg-[#333333] py-2 my-[28px] text-white"
              >
                <Image src={googleIcon} alt="google icon" className="mr-2" />
                {t("button.signWithGoogle")}
              </Button> */}

              <p className="text-center text-sm">
                {t('button.dontHaveAccount')}{' '}
                <Link href={`/${locale}/register`} className="cursor-pointer text-blue-500 underline">
                  {t('button.createAccount')}
                </Link>
              </p>
            </div>

            {/* Terms and Conditions */}
            <div>
              <div className="flex items-center gap-2">
                {/* If you need a real checkbox, uncomment and adjust your schema */}
                {/* <input
                  type="checkbox"
                  {...register("agreeToTerms")}
                  id="terms"
                  className="rounded border-gray-300"
                /> */}
                <Label htmlFor="terms" className="text-xs text-center text-gray-500">
                  {t('By signing up you agree to mtn')}{' '}
                  <Link href={`/${locale}/policy`} className="text-blue-600 hover:underline">
                    {t('terms & Conditions')}
                  </Link>{' '}
                  &{' '}
                  <Link href={`/${locale}/policy`} className="text-blue-600 hover:underline">
                    {t('privacy policy')}
                  </Link>
                </Label>
              </div>
            </div>

            {/* Language switcher */}
            <div className="mt-4 text-center">
              <Link
                href={locale === 'en' ? '/ar/login' : '/en/login'}
                className="text-sm text-primary hover:text-primary/90"
              >
                {locale === 'en' ? 'العربية' : 'English'}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
