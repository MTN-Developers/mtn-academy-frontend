'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useParams } from 'next/navigation';
import axiosInstance from '@/app/lib/axios/instance';
import { endpoints } from '@/app/services/endpoints';
import ErrorMsg from '../../common/ErrorMsg';
import { toast } from 'sonner';

type PromoCodeFormData = yup.InferType<typeof promoCodesSchema>;

const promoCodesSchema = yup.object({
  promoCode: yup.string().required('Promo Code is required'),
});

interface PromoCode {
  code: string;
  discount_percentage: number;
}

const PromoCodeForm = ({
  setTotal,
  setSubTotal,
  promoCodeList = [],
  setPromoCodeList,
  setGatewayFees,
  total,
  //   clientPhone,
  gatewayFees,
}: {
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  setSubTotal: React.Dispatch<React.SetStateAction<number>>;
  promoCodeList: any;
  setPromoCodeList: any;
  setGatewayFees: any;
  total: number;
  clientPhone: string;
  gatewayFees: number;
}) => {
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<PromoCodeFormData>({
    resolver: yupResolver(promoCodesSchema),
  });

  const urlParams = useParams();
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (data: PromoCodeFormData) => {
    const { promoCode } = data;

    if (promoCodeList.some((promo: PromoCode) => promo.code.toLowerCase() === promoCode.toLowerCase())) {
      setError('promoCode', {
        type: 'manual',
        message: 'This promo code has already been applied',
      });
      return;
    }

    if (promoCodeList.length > 0) {
      setError('promoCode', {
        type: 'manual',
        message: 'Only one promo code can be applied at a time',
      });
      return;
    }

    setLoading(true);

    try {
      const { data: response, status } = await axiosInstance.get(
        endpoints.checkPromoCode({
          code: promoCode,
          course_id: urlParams.slug,
        }),
      );

      if (status === 200) {
        const promoData = {
          code: promoCode,
          discount_percentage: response?.data?.discount_percentage,
        };

        setPromoCodeList([promoData]);

        const originalTotal = total - gatewayFees;
        const discountAmount = (originalTotal * promoData.discount_percentage) / 100;
        const discountedTotal = originalTotal - discountAmount;
        const newGatewayFees = Math.round(discountedTotal * 0.05 * 100) / 100;
        const finalTotal = Math.round((discountedTotal + newGatewayFees) * 100) / 100;

        setGatewayFees(newGatewayFees);
        setSubTotal(discountedTotal);
        setTotal(finalTotal);

        toast.success('Promo code applied successfully');
      } else {
        setError('promoCode', {
          type: 'manual',
          message: 'Invalid promo code',
        });
      }
    } catch (error: any) {
      setError('promoCode', {
        type: 'manual',
        message: error?.response?.data?.message || 'Invalid promo code',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div dir="ltr" id="promo-code" className="relative w-full">
        <div className="flex flex-col w-full">
          <Controller
            name="promoCode"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Promo Code"
                className="h-[49px] px-4 text-sm placeholder:text-muted-foreground"
                value={value}
                onChange={onChange}
              />
            )}
          />
        </div>

        <Button
          className="absolute right-[10px] top-1/2 transform -translate-y-1/2 px-4 py-2 text-white bg-primary hover:bg-primary/90"
          onClick={handleSubmit(onSubmit)}
          disabled={loading}
        >
          {loading ? 'Checking...' : 'Add Code'}
        </Button>
      </div>

      <ErrorMsg message={errors.promoCode?.message as string} />
    </>
  );
};

export default PromoCodeForm;
