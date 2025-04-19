/* app/components/FeedbackCollector.tsx (or anywhere in your project) */
'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';
import { useSelector } from 'react-redux';
import { RootState } from '../lib/redux/store';
import Image from 'next/image';
import complaintsIcon from '@/public/icons/complaints.svg';

/* ──────────────────────────────────────────────────────────
   Extend the Window type so TypeScript knows about the
   globals Atlassian injects                                          */

export default function FeedbackCollector({ pathname }: { pathname: string }) {
  /* local state for the email field */
  /** will hold Atlassian’s “open the dialog” callback */
  const collectorDialog = useRef<(() => void) | null>(null);
  const { user } = useSelector((state: RootState) => state.auth); // Assuming you have a Redux store set up

  /* ----------------------------------------------------------
     1.  Build ATL_JQ_PAGE_PROPS *before* the collector loads
         (runs once on mount, then updates when `email` changes)
     2.  Every time React re‑renders we overwrite fieldValues
         so the latest email always reaches Jira              */
  useEffect(() => {
    window.ATL_JQ_PAGE_PROPS = {
      /* this is called BY Atlassian right after it loads
         – they hand us their showCollectorDialog function     */
      triggerFunction(showDialog) {
        window.__ATL_SHOW_COLLECTOR__ = showDialog; // persist across pages
        collectorDialog.current = showDialog;
      },
      /* default values Jira should pre‑fill when the dialog
         actually opens                                         */
      fieldValues: () => ({
        email: user?.email, // <-- use the email from Redux state
        fullname: `${user?.name}`,
        description: 'description',
        summary: 'summary',
        recordWebInfo: '1',
        recordWebInfoConsent: ['1'],
      }),
    };
  }, [user?.name, user?.email, pathname]); // <-- add `pathname` to the dependency array

  /* -------------------------------------------------- */
  const handleOpenCollector = () => {
    console.log('clicked');

    if (collectorDialog.current) {
      collectorDialog.current();
    } else {
      console.warn('Issue‑collector script not ready yet.');
    }
    const dialog = collectorDialog.current ?? window.__ATL_SHOW_COLLECTOR__;
    if (dialog) dialog();
    else console.warn('Issue‑collector script not ready yet.');
  };

  /*                      UI                           */
  return (
    <>
      {/* Atlassian Issue‑Collector (depends on jQuery internally) */}
      <Script src="https://code.jquery.com/jquery-3.6.0.min.js" strategy="beforeInteractive" />
      <Script
        src="https://managethenow.atlassian.net/s/d41d8cd98f00b204e9800998ecf8427e-T/xghl7j/b/3/c95134bc67d3a521bb3f4331beb9b804/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector.js?locale=ar-eg&collectorId=98474ad5"
        strategy="afterInteractive"
      />

      {/* --- your form controls --- */}
      <button aria-braillelabel="open issue collector dialog" onClick={handleOpenCollector}>
        <Image className="w-[25px]" src={complaintsIcon} alt="complaints icon" />
      </button>
    </>
  );
}
