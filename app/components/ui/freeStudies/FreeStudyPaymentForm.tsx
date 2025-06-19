// components/payment/SemesterPaymentForm.tsx
'use client';
import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Controller, useForm } from 'react-hook-form';
import { usePathname, useRouter } from 'next/navigation';
import { StripeCardElement } from '@stripe/stripe-js';
import { toast } from 'sonner';
import ErrorMsg from '../../common/ErrorMsg';
import { Loader2 } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { paymentSchema } from '@/lib/validations';
import axiosInstance from '@/app/lib/axios/instance';
import { FreeStudyCourse } from '@/app/types/freeStudy';
import { useQueryClient } from '@tanstack/react-query';
import { PromoCode } from '@/app/[locale]/(dashboard)/dashboard/free-study/[slug]/payment/page';

const FreeStudyPaymentForm = ({
  freeStudy,
  promoCodeList,
}: {
  freeStudy: FreeStudyCourse;
  promoCodeList: PromoCode[];
}) => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const path = usePathname();
  const isFromFreeStudy = path.includes('free-study');

  console.log('isFreeStudy', isFromFreeStudy);

  // const isFreeStudy = type === 'free-study';
  // const isSemester = type === 'semester';

  const onSubmit = async () => {
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { data: CreateIntent } = await axiosInstance.post('/transaction', {
        item_id: freeStudy.id,
        type: 'course',
        course_type: isFromFreeStudy ? 'free_study' : 'academic_study',
        ...(promoCodeList.length > 0 ? { promo_code: promoCodeList[0].code } : {}),
      });

      const { error } = await stripe.confirmCardPayment(CreateIntent?.data?.clientSecret, {
        payment_method: {
          card: cardElement as StripeCardElement,
        },
      });

      if (error) {
        setLoading(false);
        setError('cardInfo', {
          type: 'manual',
          message: error.message,
        });
      } else {
        setLoading(false);

        queryClient.invalidateQueries({
          queryKey: ['free-study', freeStudy.slug],
        });

        toast.success('تم الدفع بنجاح');
        router.push(`/dashboard/free-study/${freeStudy.slug}`);
      }
    } catch (error) {
      console.log(error);
      toast.error('حدث خطأ أثناء معالجة الدفع');
      setLoading(false);
    }
  };

  type FormData = z.infer<typeof paymentSchema>;

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(paymentSchema),
  });

  return (
    <form suppressHydrationWarning onSubmit={handleSubmit(onSubmit)} className="h-full  lg:w-[80%] w-full  mx-auto">
      <div className="flex flex-col lg:flex-row lg:justify-between mt-10 gap-x-[75px] gap-y-16">
        <div className="w-full">
          <h2 className="self-stretch mb-7 text-foreground font-sans text-2xl font-semibold leading-[normal]">
            تفاصيل الدفع
          </h2>

          <div className="flex flex-col gap-4">
            <div className="flex items-center w-full justify-between">
              <div className="flex gap-[11px]">
                <Image src={'/images/checkbox.svg'} width={12} height={12} alt="Checkbox" />
                <p className="self-stretch text-muted-foreground font-sans text-[10.895px] font-medium leading-[15.564px]">
                  Pay with Credit Card
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Image src={'/images/payment_method (1).svg'} width={35} height={24} alt="Payment Method" />
                <Image src={'/images/payment_method (2).svg'} width={35} height={24} alt="Payment Method" />
                <Image src={'/images/payment_method (3).svg'} width={35} height={24} alt="Payment Method" />
              </div>
            </div>

            <div className="flex flex-col">
              <Controller
                name="cardInfo"
                control={control}
                render={({ field: { onChange } }) => (
                  <CardElement
                    onChange={e => {
                      if (e.complete) {
                        onChange('completed');
                      } else {
                        onChange('');
                      }
                    }}
                    options={{
                      style: {
                        base: {
                          fontSize: '14px',
                          backgroundColor: '#FFF',
                          color: '#424770',
                          '::placeholder': {
                            color: '#696969',
                          },
                        },
                        invalid: {
                          color: '#9e2146',
                        },
                      },
                    }}
                    className="p-4 border rounded-lg shadow"
                  />
                )}
              />
              <ErrorMsg message={errors.cardInfo?.message as string} />
            </div>

            <Button className="mt-4 font-sans  w-full h-12 text-lg font-semibold" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  جاري الدفع ...
                </>
              ) : (
                'ادفع الآن'
              )}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FreeStudyPaymentForm;
