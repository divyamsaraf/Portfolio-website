import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "../context/ThemeContext";
import Layout from "../components/layout/Layout";
import ErrorBoundary from "../components/ErrorBoundary";
import { usePerformance } from "../hooks/usePerformance";
import { useEffect } from "react";

function AppContent({ Component, pageProps }: AppProps) {
  usePerformance();

  useEffect(() => {
    // Prefetch critical routes
    const router = require("next/router").useRouter();
    if (router) {
      ["/about", "/projects", "/experience", "/skills"].forEach((route) => {
        router.prefetch(route);
      });
    }
  }, []);

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
