'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import docAhmed from '@/public/images/adam-and-eve/docAhmed.svg';

const tabs = [
  { key: 'achievements', label: 'tabs.achievements' },
  { key: 'academic', label: 'tabs.academic' },
  { key: 'scientific', label: 'tabs.scientific' },
];

const AboutDr = () => {
  const t = useTranslations('docAhmed');
  const [activeTab, setActiveTab] = useState('achievements');

  return (
    <div className="w-full p-4 lg:px-40">
      <div className="flex gap-4 overflow-x-scroll lg:overflow-x-hidden pb-4">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`text-nowrap p-4 rounded-xl transition-all min-w-fit ${
              activeTab === tab.key ? 'bg-[#902c86] text-white' : 'bg-[#ece6f7] text-neutral-700'
            }`}
          >
            {t(tab.label)}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row-reverse gap-6 mt-6 items-center">
        <Image src={docAhmed} alt="Dr. Ahmed" className="w-full max-w-md" />
        <div className="flex-1 space-y-3">
          <h1 className="text-neutral-700 lg:text-3xl font-normal mb-4">{t('name')}</h1>

          {t.raw(`${activeTab}.points`).map((point: string, idx: number) => (
            <p key={idx} className="text-neutral-700">
              {point}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutDr;
