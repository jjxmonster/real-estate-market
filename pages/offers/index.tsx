import React, { FunctionComponent } from "react";

import ApartmentCard from "../../components/ApartmentCard/ApartmentCard";
import { ApartmentOffer } from "../../types/common";
import { GetStaticProps } from "next";
import Head from "next/head";
import PageHeader from "../../components/PageHeader/PageHeader";
import getRecentOffers from "../../services/offers/getRecent";
import { jsonFetcher } from "../../utils";
import useSWR from "swr";

interface OffersProps {
  offers: Array<ApartmentOffer>;
}

const Offers: FunctionComponent<OffersProps> = ({ offers }) => {
  const { data } = useSWR("/api/offers", jsonFetcher, { fallbackData: offers });

  const renderApartments = data.map(
    ({
      id,
      title,
      area,
      image_url,
      category,
      location,
      price,
    }: ApartmentOffer) => (
      <ApartmentCard
        id={id}
        price={price}
        key={id}
        title={title}
        area={area}
        image_url={image_url}
        category={category}
        location={location}
      />
    )
  );

  return (
    <>
      <Head>
        <title>HOME4U | Offers</title>
      </Head>
      <div>
        <PageHeader
          title="Search properties"
          description="Find your dream property for buy or rent."
        />
        <div className="grid gap-2 grid-cols-3">{renderApartments}</div>
      </div>
    </>
  );
};

export default Offers;

export const getStaticProps: GetStaticProps = async () => {
  const offers = await getRecentOffers(6);

  return {
    props: {
      offers,
    },
  };
};
