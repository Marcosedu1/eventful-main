import { ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import Footer from "../src/components/Footer";
import NavBar from "../src/components/NavBar";
import { AppProvider } from "../src/context/AppContext";
import theme, { montSerrat } from "../src/theme/config";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <div className={`wrapper ${montSerrat.variable} font-sans`}>
          <NavBar />
          <Component {...pageProps} />
          <Footer />
        </div>
      </ThemeProvider>
    </AppProvider>
  );
}
