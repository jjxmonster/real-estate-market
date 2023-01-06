import "../styles/globals.css";
import type { AppProps } from "next/app";

import { RecoilRoot } from "recoil";

import Navbar from "../components/Navbar/Navbar";
import AppWrapper from "../components/AppWrapper/AppWrapper";
import Footer from "../components/Footer/Footer";
import LoadingIndicator from "../components/LoadingIndicator/LoadingIndicator";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AppWrapper>
        <Navbar />
        <section className="w-full min-h-section">
          <Component {...pageProps} />
        </section>
        <Footer />
      </AppWrapper>
      <LoadingIndicator />
    </RecoilRoot>
  );
}
