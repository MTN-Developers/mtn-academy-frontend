/* app/components/Coachmark.tsx */
'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function Coachmark({
  targetId,
  storageKey = 'feedback-coachmark-dismissed',
}: {
  targetId: string;
  storageKey?: string;
}) {
  const [show, setShow] = useState(false);
  const [ringStyle, setRingStyle] = useState<React.CSSProperties>({});

  /* ────────────────────────────────────────────── */
  const dismiss = () => {
    localStorage.setItem(storageKey, '1');
    setShow(false);
  };

  /* ────────────────────────────────────────────── */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (localStorage.getItem(storageKey)) return; // already dismissed

    const target = document.getElementById(targetId);
    if (!target) return;

    /* ① Position the halo */
    const positionRing = () => {
      const rect = target.getBoundingClientRect();
      setRingStyle({
        top: rect.top + rect.height / 2,
        left: rect.left + rect.width / 2,
      });
    };
    positionRing();

    /* ② Listen for clicks on the target **once** */
    target.addEventListener('click', dismiss, { once: true });

    /* ③ Keep the ring centred on resize / scroll */
    window.addEventListener('resize', positionRing);
    window.addEventListener('scroll', positionRing, true);

    setShow(true);

    /* ④ Cleanup */
    return () => {
      target.removeEventListener('click', dismiss);
      window.removeEventListener('resize', positionRing);
      window.removeEventListener('scroll', positionRing, true);
    };
  }, [targetId, storageKey]);

  /* ────────────────────────────────────────────── */
  if (!show) return null;
  return createPortal(
    <>
      {/* dim background */}
      <div onClick={dismiss} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]" />

      {/* animated halo */}
      <div
        onClick={dismiss}
        className="fixed z-[9999] translate-x-[-50%] translate-y-[-50%] \
                   animate-ping-slow h-32 w-32 rounded-full border-[3px] border-[#017AFD]"
        style={ringStyle}
      />
    </>,
    document.body,
  );
}
