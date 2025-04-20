// types/atl-issue‑collector.d.ts   ← new file
export {}; // makes this a module

declare global {
  interface Window {
    __ATL_SHOW_COLLECTOR__?: () => void;
    ATL_JQ_PAGE_PROPS?: any; // (already used in your code)
  }
}
