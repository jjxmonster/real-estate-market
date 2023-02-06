import "../styles/globals.css";
import type { AppProps } from "next/app";

import { RecoilRoot } from "recoil";

import Navbar from "../components/Navbar/Navbar";
import AppWrapper from "../components/AppWrapper/AppWrapper";
import Footer from "../components/Footer/Footer";
import LoadingIndicator from "../components/LoadingIndicator/LoadingIndicator";
import NotificationCard from "../components/NotificationCard/NotificationCard";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <RecoilRoot>
        <AppWrapper>
          <Navbar />
          <section className="w-full min-h-section">
            <Component {...pageProps} />
          </section>
          <Footer />
        </AppWrapper>
        <LoadingIndicator />
        <NotificationCard />
      </RecoilRoot>
    </SessionProvider>
  );
}
