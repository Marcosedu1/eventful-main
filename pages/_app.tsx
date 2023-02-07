import { ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import { useState } from "react";
import Footer from "../src/components/Footer";
import NavBar from "../src/components/NavBar";
import { AppProvider } from "../src/context/AppContext";
import theme, { montSerrat } from "../src/theme/config";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <ThemeProvider theme={theme}>
          <div className={`wrapper ${montSerrat.variable} font-sans`}>
            <NavBar />
            <Component {...pageProps} />
            <Footer />
          </div>
        </ThemeProvider>
      </AppProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
