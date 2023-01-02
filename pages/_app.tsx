import "../styles/globals.css";
import type { AppProps } from "next/app";
import NavBar from "../src/components/NavBar";
import Footer from "../src/components/Footer";
import theme from "../src/theme/config";
import { ThemeProvider } from "@mui/material";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <div className="wrapper">
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
