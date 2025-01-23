// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

// Localization Middleware
const intlMiddleware = createMiddleware({
  locales: ["en", "ar"],
  defaultLocale: "en",
});

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const pathname = req.nextUrl.pathname;

  // Step 1: Extract Locale from Path
  const locale = pathname.split("/")[1];
  const supportedLocales = ["en", "ar"];
  const isLocaleValid = supportedLocales.includes(locale);

  // Step 2: Define Public Routes
  const publicRoutes = [
    "login",
    "register",
    "forgot-password",
    "reset-password",
  ];

  // Check if current route is public
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(`/${locale}/${route}`)
  );

  // Handle unauthenticated users trying to access protected routes
  if (!accessToken && !isPublicRoute && isLocaleValid) {
    const pathnameWithoutLocale = pathname.replace(`/${locale}`, "");

    // Create redirect URL with callback
    const redirectURL =
      pathname === `/${locale}`
        ? `/${locale}/login`
        : `/${locale}/login?redirect=${encodeURIComponent(
            pathnameWithoutLocale
          )}`;

    const response = NextResponse.redirect(new URL(redirectURL, req.url));

    // Clear any existing auth cookies
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    return response;
  }

  // Handle authenticated users trying to access login/register pages
  if (accessToken && isPublicRoute) {
    const dashboardUrl = new URL(`/${locale}/dashboard`, req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // Step 3: Apply Localization Middleware
  const intlResponse = intlMiddleware(req);
  if (intlResponse) {
    return intlResponse;
  }

  // Step 4: Proceed to Next Response if no redirects are needed
  return NextResponse.next();
}

// Update config to match your routes
export const config = {
  matcher: [
    "/",
    "/(ar|en)/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
