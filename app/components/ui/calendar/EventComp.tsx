import { EventDetails } from '@/app/types/Events';
import { getEventColor } from '@/app/utils/colorUtils';
import { useParams } from 'next/navigation';
import React from 'react';

interface IProps {
  event: EventDetails;
}

const EventComp = ({ event }: IProps) => {
  const params = useParams();
  const locale = params.locale as string;
  // Get consistent color based on event ID
  const eventColor = getEventColor(event.id);

  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);

    const day = date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    const time = date.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    return { day, time };
  };

  const { day, time } = formatDateTime(event.start_date);

  return (
    <div
      style={{
        backgroundColor: eventColor.front,
        borderLeft: `5px solid ${eventColor.back}`,
        color: eventColor.back,
      }}
      className={`lg:w-[178px] p-2 my-2 rounded-md w-full`}
    >
      <p>{locale === 'en' ? event.title_en.slice(0, 50) : event.title_ar.slice(0, 50)}</p>
      <div className="flex flex-col">
        <span>{day}</span>
        <span>{time}</span>
      </div>
      {/* <p>URL</p> */}
    </div>
  );
};

export default EventComp;
