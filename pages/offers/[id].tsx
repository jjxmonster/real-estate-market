import React, { FunctionComponent } from "react";

import { ApartmentOffer } from "../../types/common";

import getRecentOffers from "../../services/offers/getRecent";
import getOffers from "../../services/offers/get";
import { GetStaticPaths, GetStaticPropsContext } from "next";

interface OfferPageProps {
  offer: ApartmentOffer;
}
type PageParams = {
  id: string;
};

const OfferPage: FunctionComponent<OfferPageProps> = ({ offer }) => {
  return <div>{offer.title}</div>;
};

export default OfferPage;

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<PageParams>) => {
  const offer = await getOffers(params?.id);

  return {
    props: {
      offer,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const offers = await getRecentOffers(6);

  return {
    paths: offers.map(offer => ({
      params: { id: String(offer.id) },
    })),
    fallback: true,
  };
};
