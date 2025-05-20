'use client';

import ZoomMeeting from '@/app/components/ui/live/ZoomMeeting';
import { useCourseDetails } from '@/app/hooks/useCourseDetails';
import { RootState } from '@/app/lib/redux/store';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { useSelector } from 'react-redux';

const Page = () => {
  const params = useParams();
  const locale = params.locale as string;
  const { slug } = params;
  const router = useRouter();

  const { user } = useSelector((state: RootState) => state.auth);

  //   console.log('user is ', user);

  const { data, isLoading, error } = useCourseDetails(slug as string);
  const courseDetails = data?.data;
  // console.log({ courseDetails });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log('error', error);

    return <div>Error...</div>;
  }

  if (courseDetails?.is_locked || !courseDetails?.has_live) {
    router.push(`/${locale}/dashboard/course/${slug}`);

    return <div>Course is locked</div>;
  }

  // console.log('slug', params);

  return (
    <div className="flex flex-col  zoom-container gap-2 w-full h-full items-center justify-center">
      <h2 className="font-semibold text-xl"> live stream</h2>
      {/* <p>{params.courseId}</p> */}
      <ZoomMeeting client_name={`${user?.name} - ${user?.country}`} meetingId={'81297066423'} passcode={'169998'} />

      {/* ) : activeMeeting ? (
        <ZoomMeeting
          client_name={`${user?.name} - ${user?.country}`}
          meetingId={"81297066423"}
          passcode={"169998"}
          // meetingId={activeMeeting.meeting_id}
          // passcode={activeMeeting.passcode}
        />
      ) : (
        <p>{t("NoActiveMeeting")}</p>
      )} */}
    </div>
  );
};

export default Page;
