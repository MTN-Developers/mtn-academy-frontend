'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import SemesterPaymentForm from '@/app/components/ui/semester/SemesterPaymentForm';
import correct from '@/public/icons/correct.png';
import correct1 from '@/public/icons/correct1.png';
import visa from '@/public/icons/Visa.png';
import mc from '@/public/icons/goldmc.png';
// import discover from '@/public/icons/Discover.png';
// import jcb from '@/public/icons/Jcb.png';
import paymob from '@/public/icons/paymob.png';

import { Check, Loader2 } from 'lucide-react';
import Image from 'next/image';

const StepperPayment = ({ semester }) => {
  const params = useParams();
  const locale = params.locale;
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paymob' | null>(null);
  const [paymobIframeUrl, setPaymobIframeUrl] = useState<string | null>(null);
  const [isLoadingIframe, setIsLoadingIframe] = useState(false);

  // This would be replaced with your actual API call to get the Paymob iframe URL
  useEffect(() => {
    if (currentStep === 2 && paymentMethod === 'paymob') {
      // Simulate API call to get Paymob iframe URL
      setIsLoadingIframe(true);

      // Replace this with your actual API call
      setTimeout(() => {
        // This is a placeholder URL - you would get the actual URL from your backend
        setPaymobIframeUrl(`blob:https://accept.paymob.com/a366bb7d-5751-4b3f-aff7-95a5e5e79c12`);
        setIsLoadingIframe(false);
      }, 1000);
    }
  }, [currentStep, paymentMethod, semester]);

  //handlers
  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePaymentMethodChange = (value: 'card' | 'paymob') => {
    setPaymentMethod(value);
  };

  // Handle iframe message events (for Paymob callbacks)
  useEffect(() => {
    const handleIframeMessage = (event: MessageEvent) => {
      // Check if the message is from Paymob (you may need to adjust this based on Paymob's actual implementation)
      if (event.origin.includes('paymob') || event.origin.includes('accept.paymobsolutions.com')) {
        // Handle successful payment
        if (event.data?.status === 'SUCCESS') {
          handleNextStep(); // Move to success step
        }
      }
    };

    window.addEventListener('message', handleIframeMessage);
    return () => {
      window.removeEventListener('message', handleIframeMessage);
    };
  }, []);

  return (
    <>
      {/* Stepper */}
      <div dir={locale === 'en' ? 'ltr' : 'rtl'} className="mb-8">
        <h2 className="text-2xl font-medium mb-6">{locale === 'en' ? 'Choose Payment Way' : 'اختر طريقة الدفع'}</h2>

        <div className="flex justify-between items-center">
          <div className="flex relative w-fit flex-col items-center">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center ${
                currentStep >= 1 ? 'bg-primary text-white' : 'bg-gray-200'
              }`}
            >
              {currentStep > 1 ? (
                <Image width={20} height={20} src={correct1} alt="icon" />
              ) : (
                <Image width={20} height={20} src={correct} alt="icon" />
              )}
            </div>
            <span className="text-xs mt-1 absolute z-10 -bottom-6 text-nowrap">
              {locale === 'en' ? 'Payment method' : 'طريقة الدفع'}
            </span>
          </div>
          <div className="flex-1 h-[2px] bg-gray-200">
            <div
              className={`h-full bg-green-500 ${currentStep >= 2 ? 'w-full' : 'w-0'} transition-all duration-300`}
            ></div>
          </div>
          <div className="flex flex-col relative items-center">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center ${
                currentStep >= 2 ? 'bg-primary text-white' : 'bg-gray-200'
              }`}
            >
              {currentStep > 2 ? (
                <Image width={20} height={20} src={correct1} alt="icon" />
              ) : (
                <Image width={20} height={20} src={correct} alt="icon" />
              )}
            </div>
            <span className="text-xs mt-1 absolute z-10 -bottom-6 text-nowrap">
              {locale === 'en' ? 'Card Information' : 'معلومات البطاقة'}
            </span>
          </div>
          <div className="flex-1 h-[2px] bg-gray-200">
            <div
              className={`h-full bg-green-500 ${currentStep >= 3 ? 'w-full' : 'w-0'} transition-all duration-300`}
            ></div>
          </div>
          <div className="flex relative flex-col items-center">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center ${
                currentStep >= 3 ? 'bg-primary text-white' : 'bg-gray-200'
              }`}
            >
              {currentStep > 3 ? (
                <Image width={20} height={20} src={correct1} alt="icon" />
              ) : (
                <Image width={20} height={20} src={correct} alt="icon" />
              )}
            </div>
            <span className="text-xs absolute z-10 -bottom-6 mt-1">{locale === 'en' ? 'Success' : 'نجاح'}</span>
          </div>
        </div>
      </div>

      {/* Step 1: Payment Method */}
      {currentStep === 1 && (
        <div className="mt-6">
          <RadioGroup
            value={paymentMethod || ''}
            onValueChange={value => handlePaymentMethodChange(value as 'card' | 'paymob')}
            className="space-y-4"
          >
            {/* Card payment option */}
            <div
              className={`flex items-center justify-between border rounded-md p-4 cursor-pointer ${
                paymentMethod === 'card' ? 'border-[#004d9e]' : 'hover:border-[#004d9e]'
              }`}
              onClick={() => handlePaymentMethodChange('card')}
            >
              <div className="flex items-center">
                <RadioGroupItem value="card" id="card" checked={paymentMethod === 'card'} />
                <Label htmlFor="card" className="mx-2 cursor-pointer">
                  {locale === 'en' ? 'Cards' : 'البطاقات'}
                </Label>
              </div>
              <div className="flex gap-2">
                <div className="w-10 h-6 rounded flex items-center justify-center text-white text-xs">
                  <Image src={visa} alt="icon" />
                </div>
                <div className="w-10 h-6 rounded flex items-center justify-center text-white text-xs">
                  <Image src={mc} alt="icon" />
                </div>
                {/* <div className="w-10 h-6 rounded flex items-center justify-center text-white text-xs">
                  <Image src={discover} alt="icon" />
                </div>
                <div className="w-10 h-6 rounded flex items-center justify-center text-white text-xs">
                  <Image src={jcb} alt="icon" />
                </div> */}
              </div>
            </div>

            {/* Paymob option */}
            <div
              className={`flex items-center justify-between border rounded-md p-4 cursor-pointer ${
                paymentMethod === 'paymob' ? 'border-[#004d9e]' : 'hover:border-[#004d9e]'
              }`}
              onClick={() => handlePaymentMethodChange('paymob')}
            >
              <div className="flex items-center">
                <RadioGroupItem value="paymob" id="paymob" checked={paymentMethod === 'paymob'} />
                <Label htmlFor="paymob" className="mx-2 cursor-pointer">
                  {locale === 'en' ? 'Paymob' : 'باي موب'}
                </Label>
              </div>
              <div className="w-20 h-6 rounded flex items-center justify-center text-white text-xs">
                <Image src={paymob} alt="icon" />
              </div>
            </div>
          </RadioGroup>

          <Button
            className="w-full text-xl mt-8 h-[55px] bg-[#07519C] hover:bg-[#06407d]"
            onClick={handleNextStep}
            disabled={!paymentMethod}
          >
            {locale === 'en' ? 'Continue' : 'استمرار'}
          </Button>
        </div>
      )}

      {/* Step 2: Card Information */}
      {currentStep === 2 && paymentMethod === 'card' && (
        <div className="mt-6">
          <h2 className="text-2xl font-medium mb-6">{locale === 'en' ? 'Card Information' : 'معلومات البطاقة'}</h2>

          <SemesterPaymentForm semester={semester} />

          <div className="flex gap-4 mt-8">
            <Button variant="outline" className="flex-1" onClick={handlePreviousStep}>
              {locale === 'en' ? 'Back' : 'رجوع'}
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Paymob */}
      {currentStep === 2 && paymentMethod === 'paymob' && (
        <div className="mt-6">
          <h2 className="text-2xl font-medium mb-6">
            {locale === 'en' ? 'Complete Payment with Paymob' : 'إكمال الدفع باستخدام باي موب'}
          </h2>

          {/* Paymob iframe */}
          <div className="w-full border rounded-lg overflow-hidden shadow-md bg-white">
            {isLoadingIframe ? (
              <div className="flex items-center justify-center h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-[#07519C]" />
                <span className="ml-2 text-gray-600">
                  {locale === 'en' ? 'Loading payment gateway...' : 'جاري تحميل بوابة الدفع...'}
                </span>
              </div>
            ) : paymobIframeUrl ? (
              <iframe
                src={paymobIframeUrl}
                className="w-full h-[400px] border-0"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Paymob Payment Gateway"
              ></iframe>
            ) : (
              <div className="flex items-center justify-center h-[400px] bg-gray-50">
                <p className="text-gray-500">
                  {locale === 'en'
                    ? 'Unable to load payment gateway. Please try again.'
                    : 'تعذر تحميل بوابة الدفع. يرجى المحاولة مرة أخرى.'}
                </p>
              </div>
            )}
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-200">
            <p className="text-sm text-gray-600">
              {locale === 'en'
                ? 'Complete your payment securely through Paymob. Your transaction is protected with encryption.'
                : 'أكمل عملية الدفع بأمان من خلال باي موب.'}
            </p>
          </div>

          <div className="flex gap-4 mt-8">
            <Button variant="outline" className="flex-1" onClick={handlePreviousStep}>
              {locale === 'en' ? 'Back' : 'رجوع'}
            </Button>
            {/* The Continue button is removed as the iframe handles the payment flow */}
          </div>
        </div>
      )}

      {/* Step 3: Success */}
      {currentStep === 3 && (
        <div className="mt-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-medium mb-2">{locale === 'en' ? 'Payment Successful!' : 'تم الدفع بنجاح!'}</h2>
          <p className="text-gray-600 mb-6">
            {locale === 'en'
              ? 'You have been successfully registered for the semester. You can now access all materials.'
              : 'تم تسجيلك بنجاح في الفصل الدراسي. يمكنك الآن الوصول إلى جميع المواد.'}
          </p>

          <Button
            className="w-full bg-[#07519C] hover:bg-[#06407d]"
            onClick={() => router.push(`/${locale}/dashboard`)}
          >
            {locale === 'en' ? 'Return to Dashboard' : 'العودة إلى لوحة التحكم'}
          </Button>
        </div>
      )}
    </>
  );
};

export default StepperPayment;
