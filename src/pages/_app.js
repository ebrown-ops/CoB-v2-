import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "../components/ui/toaster";
import ErrorBoundary from '../components/ErrorBoundary';
import { ThemeProvider } from "next-themes";
import { ComparisonProvider } from '../context/ComparisonContext';
import OnboardingTutorial from '../components/OnboardingTutorial';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';

console.log('_app.js is being loaded');

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
      // Track page view
      window.gtag('config', 'YOUR-ANALYTICS-ID', {
        page_path: url,
      });
    };

    const handleError = (error) => {
      console.error('Application error:', error);
      // Implement your error logging logic here
    };

    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('error', handleError);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      router.events.off('error', handleError);
    };
  }, [router.events]);

  return (
    <ErrorBoundary>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=YOUR-ANALYTICS-ID`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'YOUR-ANALYTICS-ID');
          `,
        }}
      />
      <SessionProvider session={session}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ComparisonProvider>
            <Component {...pageProps} />
            <Toaster />
            <OnboardingTutorial />
          </ComparisonProvider>
        </ThemeProvider>
      </SessionProvider>
    </ErrorBoundary>
  );
}

export default MyApp;