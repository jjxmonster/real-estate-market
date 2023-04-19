import {
  ActiveStatusIcon,
  AreaIcon,
  BackIcon,
  CategoryIcon,
} from "../../components/Icons/Icons";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import React, { FunctionComponent } from "react";
import { URL, capitalizeFirstLetter } from "../../utils";

import { ApartmentOffer } from "../../types/common";
import Head from "next/head";
import Image from "next/image";
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
  const { isFallback, push } = useRouter();
  const setLoadingState = useSetRecoilState(loadingState);

  const {
    title,
    location,
    image_url,
    area,
    description,
    status,
    category,
    price,
  } = offer;

  if (isFallback) {
    setLoadingState({ isLoading: true, message: "" });
    return null;
  }

  return (
    <>
      <Head>
        <title>HOME4U | {title}</title>
      </Head>
      <div className="my-16">
        <span
          onClick={() => push(URL.OFFERS_PAGE)}
          className="flex items-center mb-12 text-lg cursor-pointer text-yellow"
        >
          <BackIcon /> Back to offers
        </span>
        <h2 className="text-4xl font-medium text-white">{title}</h2>
        <p className="text-gray-500 mt-5 mb-16 text-xl">{location}</p>
        <div className="flex gap-4">
          <Image
            className="rounded-xl"
            src={image_url}
            width={1000}
            height={1000}
            alt="Apartment Image"
          />
          <div className="flex-1 rounded-xl border-yellow border flex flex-col">
            <div className="flex justify-between flex-col items-center flex-1 py-14">
              <span className="text-gray-500 text-xl mb-3">Area</span>
              <span className="text-white text-xl flex gap-1">
                <span className="text-yellow">
                  <AreaIcon width="6" />
                </span>
                {area}m²
              </span>
            </div>
            <div className="flex justify-between flex-col items-center flex-1 py-14">
              <span className="text-gray-500 text-xl mb-3">Status</span>
              <span className="text-white text-xl flex gap-1">
                <span className="text-yellow">
                  <ActiveStatusIcon width="6" />
                </span>
                {capitalizeFirstLetter(status)}
              </span>
            </div>
            <div className="flex justify-between flex-col items-center flex-1 py-14">
              <span className="text-gray-500 text-xl mb-3">Category</span>
              <span className="text-white text-xl flex gap-1">
                <span className="text-yellow">
                  <CategoryIcon width="6" />
                </span>
                {capitalizeFirstLetter(category)}
              </span>
            </div>
          </div>
        </div>
        <h3 className="text-white mt-12 mb-6 font-medium text-2xl relative before:left-0 before:m-auto before:absolute before:w-32 before:h-full before:border-b-2 before:border-yellow ">
          About this offer
        </h3>
        <p className="text-white w-3/4 text-xl leading-loose">{description}</p>
      </div>
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
