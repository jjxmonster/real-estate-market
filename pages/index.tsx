import React, { FunctionComponent } from "react";

import LandingContainer from "../components/LandingContainer/LandingContainer";
import Head from "next/head";

const Home: FunctionComponent = () => {
  return (
    <div>
      <Head>
        <title>HOME4U | Home</title>
      </Head>
      <LandingContainer />
    </div>
  );
};

export default Home;
