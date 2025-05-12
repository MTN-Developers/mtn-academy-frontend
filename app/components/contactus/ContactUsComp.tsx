'use client';

import { Label } from '@/components/ui/label';
import axios from 'axios';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import { toast } from 'sonner';
import 'react-phone-input-2/lib/style.css';

const ContactUsComp = () => {
  const { locale } = useParams();
  const t = useTranslations('contactUs');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phoneData, setPhoneData] = useState<{
    phone: string;
    country: string;
  }>({
    phone: '',
    country: '',
  });
  const [address, setAddress] = React.useState('');
  const [message, setMessage] = React.useState('');

  //handlers

  const handlePhoneChange = (value: string, country: any) => {
    setPhoneData({
      phone: `+${value}`,
      country: country.name,
    });
    // Remove this line since setValue is not defined
    // Remove setValue call since it's not defined and not needed
  };

  const url = process.env.NEXT_PUBLIC_BASE_URL;

  //try to send a post request to the api
  const handleSubmit = async () => {
    console.log('name', name);
    console.log('email', email);
    console.log('address', address);
    console.log('message', message);
    try {
      const res = await axios.post(`${url}/contact`, {
        name,
        email,
        phone: phoneData.phone,
        address,
        message,
      });
      if (res.status === 200 || res.status === 201) {
        toast.success('Message sent successfully');
        setName('');
        setEmail('');
        setPhoneData({
          phone: '',
          country: '',
        });
        setAddress('');
        setMessage('');
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <div dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
          {t('contactUs')}
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
          {t('contactUsDescription')}
        </p>
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-8"
        >
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              {t('name')}
            </label>
            <input
              type="text"
              id="name"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder={t('namePlaceholder')}
              required
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              {t('email')}
            </label>
            <input
              type="email"
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="name@mtn.com"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          {/* Phone number field with country code */}
          <div className="grid w-full mb-6 items-center gap-1.5">
            <Label htmlFor="phone">{t('phone')}</Label>
            <div dir="ltr">
              <PhoneInput
                country={'eg'} // Default country
                value={phoneData.phone}
                onChange={handlePhoneChange}
                inputClass="bg-[#f2f2f2] focus:bg-white transition-colors w-full"
                containerClass="phone-input"
                buttonClass="bg-[#f2f2f2]"
                // Remove the key prop here
                inputProps={{
                  id: 'phone-input',
                  required: true,
                  // autoFocus: true, // Add this to maintain focus
                }}
              />
            </div>
          </div>

          <div>
            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              {t('Adderess')}
            </label>
            <input
              type="text"
              id="address"
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder={t('AdderessPlaceholder')}
              required
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              {t('message')}
            </label>
            <textarea
              id="message"
              rows={6}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder={t('messagePlaceholder')}
              required
              value={message}
              onChange={e => setMessage(e.target.value)}
            ></textarea>
          </div>
          <button
            type="submit"
            className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300  bg-blue-600"
          >
            {t('send')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUsComp;
