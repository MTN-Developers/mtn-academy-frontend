'use client';

import React, { useEffect, useState } from 'react';

type CountdownProps = {
  targetDate: string | Date;
};

const Countdown = ({ targetDate }: CountdownProps) => {
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const target = new Date(targetDate).getTime();
    const difference = target - now;

    if (difference <= 0) {
      return {
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
        expired: true,
      };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      .toString()
      .padStart(2, '0');
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor((difference / (1000 * 60)) % 60)
      .toString()
      .padStart(2, '0');
    const seconds = Math.floor((difference / 1000) % 60)
      .toString()
      .padStart(2, '0');

    return { days, hours, minutes, seconds, expired: false };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft.expired) {
    return <div className="text-red-600 text-lg font-medium">⏰ Time’s up!</div>;
  }

  return (
    <div dir="ltr" className="w-full bg-[#902c86] py-2 px-4 lg:px-10 flex flex-wrap items-center justify-between">
      <div className="flex bg-[#902c86] items-center gap-2 text-center justify-center">
        <TimeBlock label="ايام" value={timeLeft.days} />
        <span className="text-lg relative bottom-2 text-white font-bold">:</span>
        <TimeBlock label="ساعات" value={timeLeft.hours} />
        <span className="text-lg relative bottom-2 text-white font-bold">:</span>
        <TimeBlock label="دقائق" value={timeLeft.minutes} />
        <span className="text-lg relative bottom-2 text-white font-bold">:</span>
        <TimeBlock label="ثوان" value={timeLeft.seconds} />
      </div>
      <bdi className="text-white font-bold text-2xl animate-pulse text-center">
        خصم 10 % عند استخدام كود الخصم promo10
      </bdi>
    </div>
  );
};

const TimeBlock = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-center px-2">
    <div className="bg-muted text-foreground text-2xl font-bold rounded-lg px-4 py-2 shadow-sm">{value}</div>
    <span className="text-xs text-white mt-1">{label}</span>
  </div>
);

export default Countdown;
