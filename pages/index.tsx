import React, { FunctionComponent } from "react";

import Head from "next/head";
import LandingContainer from "../components/LandingContainer/LandingContainer";

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
