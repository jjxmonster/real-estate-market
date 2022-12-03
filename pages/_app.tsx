import "../styles/globals.css";
import type { AppProps } from "next/app";

import Navbar from "../components/Navbar/Navbar";
import AppWrapper from "../components/AppWrapper/AppWrapper";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <Navbar />
      <Component {...pageProps} />
    </AppWrapper>
  );
}
