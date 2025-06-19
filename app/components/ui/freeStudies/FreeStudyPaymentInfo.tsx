// components/payment/SemesterPaymentInfo.tsx
'use client';
import Image from 'next/image';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { FreeStudyCourse } from '@/app/types/freeStudy';
import { PromoCode } from '@/app/[locale]/(dashboard)/dashboard/free-study/[slug]/payment/page';
import PromoCodeForm from './PromoCodeForm';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/lib/redux/store';
import { IoMdClose } from 'react-icons/io';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useTranslations } from 'next-intl';

type IProps = {
  freeStudy: FreeStudyCourse;
  promoCodeList: PromoCode[];
  setPromoCodeList: any;
};

const FreeStudyPaymentInfo = ({ freeStudy, promoCodeList, setPromoCodeList }: IProps) => {
  const { user } = useSelector((state: RootState) => state.auth);

  // console.log('user is', user);

  const handleRemovePromoCode = (promo: PromoCode, index: number) => {
    // Remove promo code from list
    setPromoCodeList(prev => prev.filter((_, i) => i !== index));

    // Reset to original values
    const basePrice =
      Number(freeStudy?.price_after_discount) === 0
        ? Number(freeStudy?.price)
        : Number(freeStudy?.price_after_discount);

    const newGatewayFees = basePrice * 0.05;
    setGatewayFees(newGatewayFees);
    setTotal(basePrice + newGatewayFees);
  };

  const activePromoCode = promoCodeList[0];

  const stripeAmount =
    Number(freeStudy?.price_after_discount) === 0 ? Number(freeStudy?.price) : Number(freeStudy?.price_after_discount);

  const discountAmount = activePromoCode
    ? (Number(freeStudy?.price_after_discount) === 0
        ? Number(freeStudy?.price)
        : Number(freeStudy?.price_after_discount) * activePromoCode.discount_percentage) / 100
    : 0;
  const [calculatedGatewayFees, setGatewayFees] = React.useState(stripeAmount * 0.05);
  const discount = Number(freeStudy?.price) - Number(freeStudy?.price_after_discount);
  const [total, setTotal] = React.useState(stripeAmount + calculatedGatewayFees);

  const [_subtotal, setSubTotal] = React.useState(total - calculatedGatewayFees);

  const t = useTranslations('PaymentInvoice');

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div
      style={{
        background: 'rgb(245 248 251 / 59%)',
      }}
      className="w-full m-auto rounded-2xl   h-fit lg:w-[432px] max-w-full p-10 shrink-0"
    >
      <Card className="mb-6 min-h-[108px] h-fit">
        <CardContent className="flex items-center gap-[13px] p-[10px]">
          <div className="w-[114px] h-[88px] flex items-center justify-center shrink-0 bg-muted rounded-md">
            <Image
              src={freeStudy?.logo_ar || '/placeholder.svg'}
              width={96}
              height={40}
              alt={freeStudy?.name_ar || 'freeStudy image'}
            />
          </div>
          <div className="flex flex-col gap-3">
            <div className="w-fit text-foreground font-sans text-base font-medium">
              {freeStudy?.name_ar}
              {freeStudy?.name_en ? ` - ${freeStudy?.name_en}` : ''}
            </div>
          </div>
        </CardContent>
      </Card>

      {user && (
        <PromoCodeForm
          setSubTotal={setSubTotal}
          clientPhone={user?.phone || ''}
          promoCodeList={promoCodeList}
          setPromoCodeList={setPromoCodeList}
          setTotal={setTotal}
          total={total}
          setGatewayFees={setGatewayFees}
          gatewayFees={calculatedGatewayFees}
          freeStudy={freeStudy}
        />
      )}

      <Card className="mt-7 min-h-[178px]">
        <CardContent className="p-[15px]">
          <p className="text-muted-foreground font-sans text-base font-normal">تفاصيل الدفع</p>
          <Separator className="my-2" />
          <div className="flex flex-col gap-[13px] w-full">
            <div className="w-full flex flex-row flex-wrap justify-between items-start lg:items-center">
              <p className="text-muted-foreground font-sans text-base font-normal">سعر الاشتراك</p>
              <div className="text-muted-foreground font-sans text-base font-normal">${freeStudy?.price}</div>
            </div>
            <div className="flex-row flex-wrap w-full flex justify-between items-start lg:items-center">
              <p className="text-muted-foreground font-sans text-base font-normal">الخصم</p>
              <div className="text-muted-foreground font-sans text-base font-normal">
                ${discount > 0 ? discount : '0'}
              </div>
            </div>
            <div className="flex-row flex-wrap w-full flex justify-between items-start lg:items-center">
              <p className="text-muted-foreground font-sans text-base font-normal">السعر بعد الخصم</p>
              <div className="text-muted-foreground font-sans text-base font-normal">${stripeAmount}</div>
            </div>
            <div className="flex-row flex-wrap w-full flex justify-between items-start lg:items-center">
              <p className="text-muted-foreground font-sans text-base font-normal">رسوم بوابة الدفع </p>
              <div className="text-muted-foreground font-sans text-base font-normal">
                ${calculatedGatewayFees.toFixed(2)}
              </div>
            </div>
          </div>
          {activePromoCode && (
            <>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-normal leading-[normal] text-[#696969]">
                  {t('AdditionallDiscount')} ({activePromoCode.discount_percentage}
                  %)
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-normal leading-[normal] text-green-600">
                    -{formatCurrency(discount)}
                  </span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <IoMdClose
                          onClick={() => handleRemovePromoCode(activePromoCode, 0)}
                          className="cursor-pointer"
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Remove promo code</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-normal leading-[normal] text-[#696969]">{t('PriceAfterDiscount')}</span>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-normal leading-[normal] text-black">
                    {formatCurrency(
                      Number(freeStudy?.price_after_discount) === 0
                        ? Number(freeStudy?.price)
                        : Number(freeStudy?.price_after_discount) - discountAmount,
                    )}
                  </span>
                </div>
              </div>
            </>
          )}

          <Separator className="my-4" />
          <div className="flex-row flex-wrap w-full flex justify-between items-start lg:items-center">
            <p className="text-muted-foreground font-sans text-base font-semibold">الاجمالي</p>
            <div className="text-foreground font-bold font-sans text-base">${total.toFixed(2)}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreeStudyPaymentInfo;
