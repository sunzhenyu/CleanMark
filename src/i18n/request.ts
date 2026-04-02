import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const headersList = await headers();

  // Get locale from cookie or header
  const locale = cookieStore.get('NEXT_LOCALE')?.value ||
                 headersList.get('x-locale') ||
                 'en';

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
