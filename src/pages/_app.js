import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "../components/ui/toaster";
import ErrorBoundary from '../components/ErrorBoundary';
import { ThemeProvider } from "next-themes";
import { ComparisonProvider } from '../context/ComparisonContext';
import ComparisonTutorial from '../components/ComparisonTutorial';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

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
    };

    const handleError = (error) => {
      console.error('Application error:', error);
      // Implement your error logging logic here
    };

    const logPageView = (url) => {
      console.log('Page view:', url);
      // Here you would typically send this data to your analytics service
    };

    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('error', handleError);
    router.events.on('routeChangeComplete', logPageView);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      router.events.off('error', handleError);
      router.events.off('routeChangeComplete', logPageView);
    };
  }, [router.events]);

  return (
    <ErrorBoundary>
      <SessionProvider session={session}>
        <ThemeProvider attribute="class">
          <ComparisonProvider>
            <Component {...pageProps} />
            <Toaster />
            <ComparisonTutorial />
          </ComparisonProvider>
        </ThemeProvider>
      </SessionProvider>
    </ErrorBoundary>
  );
}

export default MyApp;