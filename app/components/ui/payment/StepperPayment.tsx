'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import SemesterPaymentForm from '@/app/components/ui/semester/SemesterPaymentForm';
import correct from '@/public/icons/correct.png';
import correct1 from '@/public/icons/correct1.png';

import { Check } from 'lucide-react';
import Image from 'next/image';

const StepperPayment = () => {
  const params = useParams();
  const locale = params.locale;
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paymob' | null>(null);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });

  //handlers

  const handleNextStep = () => {
    if (currentStep < 4) {
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

  const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails({
      ...cardDetails,
      [name]: value,
    });
  };
  return (
    <>
      {/* Stepper */}
      <div dir={locale === 'en' ? 'ltr' : 'rtl'} className="mb-8  ">
        <h2 className="text-2xl font-medium mb-6">{locale === 'en' ? 'Choose Payment Way' : 'اختر طريقة الدفع'}</h2>

        <div className="flex justify-between items-center">
          <div className="flex relative w-fit flex-col items-center">
            <div
              className={`w-5 h-5  rounded-full flex items-center justify-center ${
                currentStep >= 1 ? 'bg-primary text-white' : 'bg-gray-200'
              }`}
            >
              {currentStep > 1 ? (
                // <Check className=" w-5 h-5 rounded-full bg-green-500 border-none " />
                <Image width={20} height={20} src={correct1} alt="icon" />
              ) : (
                // <Check className="w-5 h-5 rounded-full bg-[#a2a2a2]" />
                <Image width={20} height={20} src={correct} alt="icon" />
              )}
            </div>
            <span className="text-xs mt-1 absolute z-10 left-0 -bottom-6 text-nowrap ">
              {locale === 'en' ? 'Payment method' : 'طريقة الدفع'}
            </span>
          </div>
          <div className="flex-1 h-[2px] bg-gray-200">
            <div
              className={`h-full bg-green-500  ${currentStep >= 2 ? 'w-full ' : 'w-0'} transition-all duration-300`}
            ></div>
          </div>
          <div className="flex flex-col relative items-center">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center ${
                currentStep >= 2 ? 'bg-primary text-white' : 'bg-gray-200'
              }`}
            >
              {currentStep > 2 ? (
                // <Check className=" w-5 h-5 rounded-full bg-green-500 border-none " />
                <Image width={20} height={20} src={correct1} alt="icon" />
              ) : (
                // <Check className="w-5 h-5 rounded-full bg-[#a2a2a2]" />
                <Image width={20} height={20} src={correct} alt="icon" />
              )}
            </div>
            <span className="text-xs mt-1 absolute z-10 -bottom-6 text-nowrap">
              {locale === 'en' ? 'Card Information' : 'معلومات البطاقة'}
            </span>
          </div>
          <div className="flex-1 h-[2px]  bg-gray-200">
            <div
              className={`h-full  bg-green-500  ${currentStep >= 3 ? 'w-full' : 'w-0'} transition-all duration-300`}
            ></div>
          </div>
          <div className="flex relative flex-col items-center">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center ${
                currentStep >= 3 ? 'bg-primary text-white' : 'bg-gray-200'
              }`}
            >
              {currentStep > 3 ? (
                // <Check className=" w-5 h-5 rounded-full bg-green-500 border-none " />
                <Image width={20} height={20} src={correct1} alt="icon" />
              ) : (
                // <Check className="w-5 h-5 rounded-full bg-[#a2a2a2]" />
                <Image width={20} height={20} src={correct} alt="icon" />
              )}
            </div>
            <span className="text-xs absolute z-10 -bottom-6 text-nowrap mt-1">
              {locale === 'en' ? 'Confirm payment' : 'تأكيد الدفع'}
            </span>
          </div>
          <div className="flex-1 h-[2px]  bg-gray-200">
            <div
              className={`h-full bg-green-500 ${currentStep >= 4 ? 'w-full' : 'w-0'} transition-all duration-300`}
            ></div>
          </div>
          <div className="flex relative flex-col items-center">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center ${
                currentStep >= 4 ? 'bg-primary text-white' : 'bg-gray-200'
              }`}
            >
              {currentStep > 4 ? (
                // <Check className=" w-5 h-5 rounded-full bg-green-500 border-none " />
                <Image width={20} height={20} src={correct1} alt="icon" />
              ) : (
                // <Check className="w-5 h-5 rounded-full bg-[#a2a2a2]" />
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
            <div className="flex items-center justify-between border rounded-md p-4 cursor-pointer hover:border-primary">
              <div className="flex items-center">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="mx-2 cursor-pointer">
                  {locale === 'en' ? 'Cards' : 'البطاقات'}
                </Label>
              </div>
              <div className="flex gap-2">
                <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs">
                  VISA
                </div>
                <div className="w-10 h-6 bg-orange-600 rounded flex items-center justify-center text-white text-xs">
                  MC
                </div>
                <div className="w-10 h-6 bg-blue-400 rounded flex items-center justify-center text-white text-xs">
                  DISC
                </div>
                <div className="w-10 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs">
                  JCB
                </div>
              </div>
            </div>

            {/* <div className="flex items-center justify-between border rounded-md p-4 cursor-pointer hover:border-primary">
              <div className="flex items-center">
                <RadioGroupItem value="mtn" id="mtn" />
                <Label htmlFor="mtn" className="mr-2 cursor-pointer">
                  MTN Wallet
                </Label>
              </div>
              <div className="w-10 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs">
                JCB
              </div>
            </div> */}

            <div className="flex items-center justify-between border rounded-md p-4 cursor-pointer hover:border-primary">
              <div className="flex items-center">
                <RadioGroupItem value="paymob" id="paymob" />
                <Label htmlFor="paymob" className="mx-2 cursor-pointer">
                  {locale === 'en' ? 'Paymob' : 'باي موب'}
                </Label>
              </div>
              <div className="w-20 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs">
                paymob
              </div>
            </div>
          </RadioGroup>

          <Button className="w-full mt-8" onClick={handleNextStep} disabled={!paymentMethod}>
            استمرار
          </Button>
        </div>
      )}

      {/* Step 2: Card Information */}
      {currentStep === 2 && paymentMethod === 'card' && (
        <div className="mt-6">
          <h2 className="text-2xl font-medium mb-6">معلومات البطاقة</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">رقم البطاقة</Label>
              <Input
                id="cardNumber"
                name="cardNumber"
                placeholder="0000 0000 0000 0000"
                value={cardDetails.cardNumber}
                onChange={handleCardDetailsChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardHolder">اسم حامل البطاقة</Label>
              <Input
                id="cardHolder"
                name="cardHolder"
                placeholder="الاسم كما يظهر على البطاقة"
                value={cardDetails.cardHolder}
                onChange={handleCardDetailsChange}
              />
            </div>

            <div className="flex gap-4">
              <div className="space-y-2 flex-1">
                <Label htmlFor="expiryDate">تاريخ الانتهاء</Label>
                <Input
                  id="expiryDate"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={cardDetails.expiryDate}
                  onChange={handleCardDetailsChange}
                />
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  name="cvv"
                  placeholder="123"
                  value={cardDetails.cvv}
                  onChange={handleCardDetailsChange}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <Button variant="outline" className="flex-1" onClick={handlePreviousStep}>
              رجوع
            </Button>
            <Button
              className="flex-1"
              onClick={handleNextStep}
              disabled={
                !cardDetails.cardNumber || !cardDetails.cardHolder || !cardDetails.expiryDate || !cardDetails.cvv
              }
            >
              استمرار
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: MTN Wallet */}
      {/* {currentStep === 2 && paymentMethod === 'mtn' && (
        <div className="mt-6">
          <h2 className="text-2xl font-medium mb-6">MTN Wallet</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">رقم الهاتف</Label>
              <Input id="phoneNumber" placeholder="أدخل رقم الهاتف" />
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <Button variant="outline" className="flex-1" onClick={handlePreviousStep}>
              رجوع
            </Button>
            <Button className="flex-1" onClick={handleNextStep}>
              استمرار
            </Button>
          </div>
        </div>
      )} */}

      {/* Step 2: Paymob */}
      {currentStep === 2 && paymentMethod === 'paymob' && (
        <div className="mt-6">
          <h2 className="text-2xl font-medium mb-6">Paymob</h2>
          <p className="text-gray-600 mb-4">سيتم تحويلك إلى صفحة Paymob لإكمال عملية الدفع.</p>

          <div className="flex gap-4 mt-8">
            <Button variant="outline" className="flex-1" onClick={handlePreviousStep}>
              رجوع
            </Button>
            <Button className="flex-1" onClick={handleNextStep}>
              استمرار إلى Paymob
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Confirm Payment */}
      {currentStep === 3 && (
        <div className="mt-6">
          <h2 className="text-2xl font-medium mb-6">تأكيد الدفع</h2>
          <div className="border rounded-md p-4 mb-6">
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">طريقة الدفع:</span>
              <span className="font-medium">{paymentMethod === 'card' ? 'بطاقة ائتمان' : 'Paymob'}</span>
            </div>

            {paymentMethod === 'card' && (
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">رقم البطاقة:</span>
                <span className="font-medium">**** **** **** {cardDetails.cardNumber.slice(-4)}</span>
              </div>
            )}

            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">المبلغ:</span>
              <span className="font-medium">$945.00</span>
            </div>
          </div>

          <div className="flex gap-4">
            <Button variant="outline" className="flex-1" onClick={handlePreviousStep}>
              رجوع
            </Button>
            <Button className="flex-1" onClick={handleNextStep}>
              تأكيد الدفع
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Success */}
      {currentStep === 4 && (
        <div className="mt-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-medium mb-2">تم الدفع بنجاح!</h2>
          <p className="text-gray-600 mb-6">تم تسجيلك بنجاح في الفصل الدراسي. يمكنك الآن الوصول إلى جميع المواد.</p>

          <Button className="w-full" onClick={() => router.push('/dashboard')}>
            العودة إلى لوحة التحكم
          </Button>
        </div>
      )}
    </>
  );
};

export default StepperPayment;
