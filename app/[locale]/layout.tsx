// src/app/[locale]/layout.tsx
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";

// type LocaleLayoutProps = {
//   children: React.ReactNode;
//   params: { locale: string | "ar" | "en" }; // `params` is a plain object, not a Promise
// };

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}) {
  const { locale } = params;
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <main >
      <NextIntlClientProvider locale={locale} messages={messages}>
        <div className={`${locale === "ar" ? "font-cairo" : "font-poppins"}`}>
          {children}
        </div>
      </NextIntlClientProvider>
    </main>
  );
}
