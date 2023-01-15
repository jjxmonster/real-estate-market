import React, { FunctionComponent } from "react";
import Image from "next/image";

import { ApartmentOffer } from "../../types/common";

import getRecentOffers from "../../services/offers/getRecent";
import getOffers from "../../services/offers/get";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { loadingState } from "../../atoms/atoms";

interface OfferPageProps {
  offer: ApartmentOffer;
}
type PageParams = {
  id: string;
};

const OfferPage: FunctionComponent<OfferPageProps> = ({ offer }) => {
  const router = useRouter();
  const setLoadingState = useSetRecoilState(loadingState);

  if (router.isFallback) {
    setLoadingState({ isLoading: true, message: "" });
    return null;
  }

  return (
    <div className="mt-20">
      <h2 className="text-3xl font-medium text-white">{offer.title}</h2>
      <p className="text-gray-500 mt-5 mb-16 m text-xl">{offer.location}</p>
      <Image
        className="rounded"
        src={offer.image_url}
        width={1000}
        height={1000}
        alt="Apartment Image"
      />
    </div>
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
