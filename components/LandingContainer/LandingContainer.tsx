import React, { FunctionComponent } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import Button from "../Button/Button";

const LandingContainer: FunctionComponent = () => {
  const { push } = useRouter();

  return (
    <section className="pt-52 h-screen relative">
      <h2 className="text-white z-50 mb-12 w-3/5 font-bold text-7xl">
        Find your dream home in one place.
      </h2>
      <div className="absolute overflow-hidden rounded-md right-0 top-0 -z-30 after:absolute after:inset-0 after:z-30 after:w-full after:h-full after:bg-black after:opacity-50">
        <Image
          alt="Apartment Picture"
          src="/images/apartment.jpg"
          width={760}
          height={1000}
        />
      </div>
      <Button label="Let's go" onClick={() => push("/offers")} />
    </section>
  );
};

export default LandingContainer;
