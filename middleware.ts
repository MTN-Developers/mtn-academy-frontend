// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

// Localization Middleware
const intlMiddleware = createMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
});

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('access_token')?.value;
  const pathname = req.nextUrl.pathname;

  // Step 1: Extract Locale from Path
  const locale = pathname.split('/')[1];

  console.log('locales from mw', locale);

  const supportedLocales = ['en', 'ar'];
  const isLocaleValid = supportedLocales.includes(locale);

  // Step 2: Define Public Routes
  const publicRoutes = ['login', 'register', 'forgot-password', 'reset-password'];

  // Check if current route is public
  const isPublicRoute = publicRoutes.some(route => pathname.includes(`/${route}`));

  // Check if it's the root/landing page
  const isLandingPage = pathname === '/' || pathname === '/en' || pathname === '/ar' || pathname === `/${locale}`;

  // Always apply localization middleware first for all routes
  const intlResponse = intlMiddleware(req);

  // Redirect authenticated users from landing page to dashboard
  if (accessToken && isLandingPage) {
    const dashboardUrl = new URL(
      `/${locale || 'ar'}/dashboard`, // Use "en" as fallback if locale is not available
      req.url,
    );
    return NextResponse.redirect(dashboardUrl);
  }

  // Allow access to public routes and landing page without authentication
  if (isPublicRoute || isLandingPage) {
    return intlResponse;
  }

  // Handle unauthenticated users trying to access protected routes
  if (!accessToken && !isPublicRoute && !isLandingPage && isLocaleValid) {
    const pathnameWithoutLocale = pathname.replace(`/${locale}`, '');
    const redirectURL = `/${locale}/login?redirect=${pathnameWithoutLocale}`;
    const response = NextResponse.redirect(new URL(redirectURL, req.url));

    // Clear any existing auth cookies
    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');
    response.cookies.delete('access_token');
    response.cookies.delete('refresh_token');
    response.cookies.delete('user');
    return response;
  }

  // Handle authenticated users trying to access login/register pages
  if (accessToken && (pathname === `/${locale}/login` || pathname === `/${locale}/register`)) {
    const dashboardUrl = new URL(`/${locale}/dashboard`, req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return intlResponse;
}

export const config = {
  matcher: ['/', '/(ar|en)/:path*', '/((?!api|_next/static|_next/image|images|favicon.ico|sitemap.xml|robots.txt).*)'],
};
