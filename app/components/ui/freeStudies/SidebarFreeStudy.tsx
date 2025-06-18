import { useCourseRequest } from '@/app/hooks/useCourseRequest';
import { Button } from '@/components/ui/button';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Link from 'next/link';
import React from 'react';
import { toast } from 'sonner';

const SidebarFreeStudy = ({ tCourse, freeStudyDetail, paymentLink, discount, price, priceAfterDiscount = 0 }) => {
  console.log({ freeStudyDetail });
  const queryClient = useQueryClient();
  const { mutate: sendCourseRequest, isPending } = useCourseRequest();

  const handleCourseRequest = () => {
    sendCourseRequest(freeStudyDetail.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['free-study', freeStudyDetail.slug] });
        toast.success(tCourse('requestSentSuccessfully'));
      },
      onError: error => {
        const axiosError = error as AxiosError;

        if (axiosError.response?.status === 409) {
          toast.error(tCourse('requestAlreadyExists'));
        } else {
          toast.error(tCourse('requestFailed'));
        }
      },
    });
  };

  return (
    <>
      {/* Right Sidebar on web */}
      <div className="md:col-span-1  hidden md:block lg:relative w-[90%] mx-4 fixed bottom-4 left-0 font-poppins">
        <div className="bg-white p-4 md:p-6 rounded-lg my-4 shadow-sm md:sticky md:top-4 flex flex-col gap-3 justify-start items-center">
          <p className="text-2xl font-cairo font-normal text-[#353535]">{tCourse('enrollNow')}</p>
          <div className="text-[64px] font-bold mb-2">${priceAfterDiscount}</div>
          {Number(discount) > 0 && (
            <p className="text-center text-sm font-normal  text-red-400 ">
              <span className="line-through">${price - priceAfterDiscount || 0}</span>
              <span className="text-red-400 inline mx-2 text-lg">%{discount} Discount</span>
            </p>
          )}
          <p className="text-center text-sm font-cairo font-normal text-[#454545]">{tCourse('enjoyTheCourse')}</p>
          <Link className="w-full" href={paymentLink}>
            <Button className="w-full bg-[#07519C] font-cairo mb-4 text-lg h-14">{tCourse('enrollNow')}</Button>
          </Link>

          <Button
            disabled={isPending || freeStudyDetail.has_request}
            onClick={handleCourseRequest}
            className="w-full bg-[#07519C] text-base h-14"
          >
            {tCourse('courseRequest')}
          </Button>
        </div>
      </div>

      {/* Right Sidebar on mobile */}
      <div className="md:col-span-1 p-4 rounded-lg bg-white block lg:hidden lg:relative w-[90%] mx-4 fixed bottom-4 left-0 font-poppins">
        {Number(discount) > 0 && (
          <>
            <p className="text-center flex items-center text-sm font-normal  text-red-400 ">
              <span className="line-through">${price}</span>
              <span className="text-red-400 text-nowrap inline mx-2 text-sm">
                %{((freeStudyDetail.price - freeStudyDetail.price_after_discount) / 100).toFixed(0)} Discount
              </span>
            </p>
          </>
        )}

        <div className="my-4 shadow-sm md:sticky md:top-4 flex gap-3 justify-start items-center">
          <div>
            <div className="text-[30px] font-bold mb-2">${freeStudyDetail.price_after_discount}</div>
          </div>
          <Link className="w-full" href={paymentLink}>
            <Button className="w-full bg-[#07519C] text-lg h-14">{tCourse('enrollNow')}</Button>
          </Link>
        </div>

        <Button
          disabled={isPending || freeStudyDetail.has_request}
          onClick={handleCourseRequest}
          className="w-full bg-[#07519C] text-base h-14"
        >
          {tCourse('courseRequest')}
        </Button>
      </div>
    </>
  );
};

export default SidebarFreeStudy;
