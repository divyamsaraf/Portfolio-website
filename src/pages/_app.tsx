import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "../context/ThemeContext";
import Layout from "../components/layout/Layout";
import ErrorBoundary from "../components/ErrorBoundary";
import { usePerformance } from "../hooks/usePerformance";
import { useEffect } from "react";
import { useRouter } from "next/router";

function AppContent({ Component, pageProps }: AppProps) {
  const router = useRouter();
  usePerformance();

  useEffect(() => {
    // Prefetch critical routes
    if (router.isReady) {
      ["/about", "/projects", "/experience", "/skills"].forEach((route) => {
        router.prefetch(route);
      });
    }
  }, [router]);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default function App(props: AppProps) {
  return <AppContent {...props} />;
}
