import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";
import ErrorBoundary from '@/components/ErrorBoundary';
import { ThemeProvider } from "next-themes";
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN_HERE",
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => console.log('Service Worker registered with scope:', registration.scope))
        .catch((error) => console.error('Service Worker registration failed:', error));
    }
  }, []);

  useEffect(() => {
    const handleRouteChange = (url) => {
      console.log(`App is changing to ${url}`);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class">
        <ErrorBoundary>
          <Component {...pageProps} />
          <Toaster />
        </ErrorBoundary>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default Sentry.withProfiler(MyApp);