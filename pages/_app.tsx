import "../styles/globals.css";
import type { AppProps } from "next/app";
import NavBar from "../components/NavBar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="wrapper">
      <NavBar />
      <Component {...pageProps} />
    </div>
  );
}
