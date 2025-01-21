// src/app/providers.tsx
"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistor, store } from "./lib/redux/store";
import { NextIntlClientProvider } from "next-intl";
import type { AbstractIntlMessages } from "use-intl";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});
type Messages = Record<string, AbstractIntlMessages>;

type ProvidersProps = {
  children: React.ReactNode;
  locale: string;
  messages: Messages; // You can make this more specific based on your messages type
};

export function Providers({ children, locale, messages }: ProvidersProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
