// app/Providers.tsx
"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./lib/redux/store";
// import { NextIntlClientProvider } from "next-intl";
import { Toaster } from "sonner";
import { Suspense } from "react";
import LoadingSpinner from "./components/common/LoadingSpinner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type ProvidersProps = {
  children: React.ReactNode;
  locale: string;
  messages?: Record<string, any>;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export function Providers({ children }: ProvidersProps) {
  // // Provide default values
  // const safeLocale = locale || "en";
  // const safeMessages = messages || {};

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/* <NextIntlClientProvider locale={safeLocale} messages={safeMessages}> */}
          <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>

          <Toaster />
          {/* </NextIntlClientProvider> */}
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}
