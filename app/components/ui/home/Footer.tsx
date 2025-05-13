// components/footer/Footer.tsx
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { FaFacebook, FaLinkedin, FaInstagram, FaTiktok } from 'react-icons/fa';
import { FaXTwitter, FaYoutube } from 'react-icons/fa6';
import mtnLogo from '@/public/images/mtn-logo.svg';
import { useParams } from 'next/navigation';
import { Label } from '@/components/ui/label';

const socialLinks = [
  { icon: <FaFacebook size={24} />, href: '#', label: 'Facebook' },
  { icon: <FaLinkedin size={24} />, href: '#', label: 'LinkedIn' },
  { icon: <FaXTwitter size={24} />, href: '#', label: 'Twitter' },
  { icon: <FaYoutube size={24} />, href: '#', label: 'YouTube' },
  { icon: <FaInstagram size={24} />, href: '#', label: 'Instagram' },
  { icon: <FaTiktok size={22} />, href: '#', label: 'TikTok' },
];

export function Footer() {
  const t = useTranslations('Footer');
  const params = useParams();

  const locale = params.locale as string;

  return (
    <footer dir={`${locale === 'ar' ? 'rtl' : 'ltr'}`} className="bg-[#d0e1f4] py-8">
      <div className="container  mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 px-4 lg:px-20 gap-8">
          {/* Study Section */}
          <div className="flex items-start">
            <Image src={mtnLogo} alt="MTN Institute" width={140} height={80} className="mb-4" />
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg mb-4">{t('studyTitle')}</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-700 hover:text-gray-900 text-sm">
                    {t('mainStudy')}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-700 hover:text-gray-900 text-sm">
                    {t('technicalStudy')}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-700 hover:text-gray-900 text-sm">
                    {t('specializedStudy')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Get to know us Section */}
          <div className="space-y-6">
            <h3 className="font-bold text-lg mb-4">{t('getToKnowUs')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-700 hover:text-gray-900 text-sm">
                  {t('aboutUs')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact-us`} className="text-gray-700 hover:text-gray-900 text-sm">
                  {t('contactUs')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700 hover:text-gray-900 text-sm">
                  {t('homePage')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Bottom Footer */}
      <div className="mt-8 px-4 lg:px-20 pt-4 border-t border-gray-300">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-gray-600">{t('copyright', { year: new Date().getFullYear() })}</p>

          {/* Terms and Conditions */}
          <div className="w-full  text-center flex items-center justify-center">
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

          {/* Social Media Links */}
          <div className="flex space-x-4">
            {socialLinks.map(social => (
              <Link
                key={social.label}
                href={social.href}
                className="text-gray-700 mx-4 hover:text-gray-900 transition-colors"
                aria-label={social.label}
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
