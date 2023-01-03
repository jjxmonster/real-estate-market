import "../styles/globals.css";
import type { AppProps } from "next/app";

import { RecoilRoot } from "recoil";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import supabaseClient from "../services/supabaseClient";

import Navbar from "../components/Navbar/Navbar";
import AppWrapper from "../components/AppWrapper/AppWrapper";
import Footer from "../components/Footer/Footer";

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
    </RecoilRoot>
  );
}
