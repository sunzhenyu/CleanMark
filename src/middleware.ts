import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Get locale from cookie or accept-language header
  const locale = request.cookies.get('NEXT_LOCALE')?.value ||
                 request.headers.get('accept-language')?.split(',')[0]?.split('-')[0] ||
                 'en';

  // Set locale in response headers for next-intl
  const response = NextResponse.next();
  response.headers.set('x-locale', locale);

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
