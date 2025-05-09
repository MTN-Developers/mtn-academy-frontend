import { useTranslations } from 'next-intl';
import React, { ReactNode, useState } from 'react';
import EventComp from './EventComp';
import useGetEvents from '@/app/hooks/useGetEvents';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getEventColor } from '@/app/utils/colorUtils';

interface IProps {
  semesterId: string;
}

const CalendarComp = ({ semesterId }: IProps) => {
  const { data: events, error, isLoading } = useGetEvents({ semesterId, page: 1, limit: 5000 });

  // console.log('data', events);

  const t = useTranslations('calendar');

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Get current month and year
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get days in month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Get first day of month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // Get day names
  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  // Get month names
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Previous month
  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  // Next month
  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  // Check if a date has events and get the color
  const getDateEventInfo = (date: Date) => {
    if (!events || events.length === 0) return { hasEvent: false, colorInfo: null };

    const dateStr = date.toISOString().split('T')[0];

    // Find events for this date
    const dateEvents = events.filter(event => {
      const startDate = new Date(event.start_date).toISOString().split('T')[0];
      const endDate = new Date(event.end_date).toISOString().split('T')[0];
      return dateStr >= startDate && dateStr <= endDate;
    });

    if (dateEvents.length === 0) return { hasEvent: false, colorInfo: null };

    // Use the first event's color for the date cell
    const firstEvent = dateEvents[0];
    const colorInfo = getEventColor(firstEvent.id);

    return { hasEvent: true, colorInfo };
  };

  // Handle date selection
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const days: ReactNode[] = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 w-10"></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const { hasEvent, colorInfo } = getDateEventInfo(date);
      const isSelected =
        selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === currentMonth &&
        selectedDate.getFullYear() === currentYear;

      days.push(
        <div
          key={`day-${day}`}
          onClick={() => handleDateClick(date)}
          className={cn(
            'h-10 w-10 rounded-full flex items-center justify-center cursor-pointer transition-colors',
            isSelected && 'border-2 border-blue-500',
            hasEvent && colorInfo ? colorInfo.bgClass : 'hover:bg-gray-100',
            hasEvent && colorInfo ? colorInfo.hoverClass : '',
            !hasEvent && 'hover:bg-gray-100',
          )}
        >
          {day}
        </div>,
      );
    }

    return days;
  };

  return (
    <>
      {events && events.length > 0 ? (
        <>
          <div>
            <h1 className="m-4 text-xl text-gray-800">{t('calendar')}</h1>
            <div className="flex flex-col-reverse lg:flex-row justify-center lg:justify-start my-4 items-start gap-4">
              {/* events */}
              <div className="w-full lg:!w-[280px] max-h-[400px] lg:h-[370px] overflow-scroll scrollbar-hide bg-white p-4 rounded-xl shadow-md">
                <h2 className="text-lg font-base text-gray-800 mb-3">{t('events')}</h2>
                {isLoading && <p>Loading...</p>}
                {error && <p>Error</p>}
                {events.map(event => (
                  <EventComp key={event.id} event={event} />
                ))}
              </div>

              {/* calendar */}
              <div className="bg-white p-4 rounded-xl shadow-md w-full lg:w-full">
                <div className="flex justify-between items-center mb-4">
                  <Button variant="outline" size="icon" onClick={prevMonth} className="h-8 w-8">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <h2 className="text-lg font-medium">
                    {monthNames[currentMonth]} {currentYear}
                  </h2>

                  <Button variant="outline" size="icon" onClick={nextMonth} className="h-8 w-8">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                  {dayNames.map(day => (
                    <div key={day} className="text-center text-sm font-medium text-gray-500">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">{generateCalendarDays()}</div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center">No Events Yet</div>
      )}
    </>
  );
};

export default CalendarComp;
