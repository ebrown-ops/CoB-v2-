import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";
import ErrorBoundary from '@/components/ErrorBoundary';
import { ThemeProvider } from "next-themes";
import { useEffect } from 'react';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => console.log('Service Worker registered with scope:', registration.scope))
        .catch((error) => console.error('Service Worker registration failed:', error));
    }
  }, []);

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