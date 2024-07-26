import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";
import ErrorBoundary from '@/components/ErrorBoundary';
import { ThemeProvider } from "next-themes";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
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