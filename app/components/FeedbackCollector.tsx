/* app/components/FeedbackCollector.tsx */
'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { useSelector } from 'react-redux';
import { RootState } from '../lib/redux/store';
import Image from 'next/image';
import complaintsIcon from '@/public/icons/complaints.svg';

const STORAGE_KEY = 'feedback-coachmark-dismissed'; // shared with Coachmark

export default function FeedbackCollector({ pathname }: { pathname: string }) {
  const collectorDialog = useRef<(() => void) | null>(null);
  const { user } = useSelector((s: RootState) => s.auth);

  /* ───────────────────────────────────────
     Tooltip visible only if the flag not set */
  const [showTip, setShowTip] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!localStorage.getItem(STORAGE_KEY)) setShowTip(true);
  }, []);

  /* ───────────────────────────────────────
     Build Atlassian props */
  useEffect(() => {
    window.ATL_JQ_PAGE_PROPS = {
      triggerFunction(showDialog) {
        window.__ATL_SHOW_COLLECTOR__ = showDialog;
        collectorDialog.current = showDialog;
      },
      fieldValues: () => ({
        email: user?.email,
        fullname: `${user?.name}`,
        recordWebInfo: '1',
        recordWebInfoConsent: ['1'],
      }),
    };
  }, [user?.name, user?.email, pathname]);

  /* ───────────────────────────────────────
     Open collector + hide tooltip */
  const handleOpenCollector = () => {
    // hide tooltip forever
    localStorage.setItem(STORAGE_KEY, '1');
    setShowTip(false);

    const dialog = collectorDialog.current ?? window.__ATL_SHOW_COLLECTOR__;
    dialog?.();
  };

  /* ─────────────────────────────────────── */
  return (
    <>
      {/* Atlassian Issue‑Collector deps */}
      <Script src="https://code.jquery.com/jquery-3.6.0.min.js" strategy="beforeInteractive" />
      <Script
        src="https://managethenow.atlassian.net/s/d41d8cd98f00b204e9800998ecf8427e-T/xghl7j/b/3/c95134bc67d3a521bb3f4331beb9b804/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector.js?locale=ar-eg&collectorId=98474ad5"
        strategy="afterInteractive"
      />

      {/* Button + one‑time tooltip */}
      <button
        id="feedback-trigger"
        onClick={handleOpenCollector}
        className="relative z-[10000] bg-white p-2 shadow-sm rounded-lg"
        title="Submit Feedback"
      >
        {/* tooltip */}
        {showTip && (
          <span
            className="absolute top-2  right-[116px] translate-x-1/2 whitespace-nowrap
                       bg-white text-black text-sm rounded py-1 px-2
                       shadow-lg animate-fade "
          >
            للمقترحات و الشكاوي
          </span>
        )}

        <Image className="w-[25px]" src={complaintsIcon} alt="complaints icon" />
      </button>
    </>
  );
}
