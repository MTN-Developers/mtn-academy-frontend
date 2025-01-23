// src/app/[locale]/layout.tsx
import AuthProvider from "../components/common/AuthProvider";
import { AuthInitializer } from "../components/common/AuthInitializer";
import { Providers } from "../Providers";

async function getMessages(locale: string) {
  try {
    return (await import(`../../messages/${locale}.json`)).default;
  } catch {
    return {};
  }
}

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export default async function LocaleLayout({
  children,
  params: paramsPromise,
}: LocaleLayoutProps) {
  const params = await paramsPromise;
  const locale = params.locale;
  const messages = await getMessages(locale);

  return (
    <Providers messages={messages} locale={locale}>
      <AuthInitializer>
        <div className={`${locale === "ar" ? "font-cairo" : "font-poppins"}`}>
          <AuthProvider>{children}</AuthProvider>
        </div>
      </AuthInitializer>
    </Providers>
  );
}
