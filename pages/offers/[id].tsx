import { GetStaticPaths, GetStaticPropsContext } from "next";
import React, { FunctionComponent, useEffect } from "react";

import { ApartmentOffer } from "../../types/common";
import ApartmentPageView from "components/ApartmentPageView";
import Head from "next/head";
import getOffers from "../../services/offers/get";
import getRecentOffers from "../../services/offers/getRecent";
import { loadingState } from "../../atoms/atoms";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";

interface OfferPageProps {
  offer: ApartmentOffer;
}
type PageParams = {
  id: string;
};

const OfferPage: FunctionComponent<OfferPageProps> = ({ offer }) => {
  const { isFallback } = useRouter();
  const setLoadingState = useSetRecoilState(loadingState);

  useEffect(() => {
    !isFallback && setLoadingState({ isLoading: false, message: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFallback]);

  if (isFallback) {
    setLoadingState({ isLoading: true, message: "" });
    return null;
  }

  const { title } = offer;

  return (
    <>
      <Head>
        <title>HOME4U | {title}</title>
      </Head>
      <ApartmentPageView offer={offer} />
    </>
  );
};

export default OfferPage;

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<PageParams>) => {
  const offer = await getOffers(params?.id);

  return {
    revalidate: 30,
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
