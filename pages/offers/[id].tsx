import {
  AreaIcon,
  BackIcon,
  CategoryIcon,
  PriceIcon,
} from "../../components/Icons/Icons";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import React, { FunctionComponent } from "react";
import { URL, capitalizeFirstLetter, formatCurrency } from "../../utils";

import { ApartmentOffer } from "../../types/common";
import Button from "components/Button/Button";
import Head from "next/head";
import Image from "next/image";
import getOffers from "../../services/offers/get";
import getRecentOffers from "../../services/offers/getRecent";
import { loadingState } from "../../atoms/atoms";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useSetRecoilState } from "recoil";

interface OfferPageProps {
  offer: ApartmentOffer;
}
type PageParams = {
  id: string;
};
interface EditOfferButton {
  user_id: string | null | undefined;
  offer_creator: string;
}

const EditOfferButton: FunctionComponent<EditOfferButton> = ({
  user_id,
  offer_creator,
}) => {
  if (!user_id || !(offer_creator === user_id)) {
    return null;
  }

  const handleEditOffer = () => {
    console.log(user_id);
  };

  return <Button label="Edit Offer" onClick={handleEditOffer} />;
};

const OfferPage: FunctionComponent<OfferPageProps> = ({ offer }) => {
  const { isFallback, push } = useRouter();
  const setLoadingState = useSetRecoilState(loadingState);
  const { data } = useSession();

  if (isFallback) {
    setLoadingState({ isLoading: true, message: "" });
    return null;
  }

  const {
    title,
    location,
    image_url,
    area,
    description,
    status,
    category,
    price,
    users,
  } = offer;

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
        <div className="flex justify-between w-full">
          <h2 className="text-4xl font-medium text-white">{title}</h2>
          <EditOfferButton user_id={data?.user.id} offer_creator={users[0]} />
        </div>
        <p className="text-gray-500 mt-5 mb-16 text-xl">{location}</p>
        <div className="flex w-full">
          <div className="flex w-full items-center justify-center rounded-md shadow-md">
            <div className="flex-1 h-full rounded-md overflow-hidden relative">
              <Image src={image_url} alt="Sample Image" fill />
            </div>
            <div className="mt-4 text-center flex-1">
              <div className="flex-1 rounded-xl flex flex-col">
                <div className="flex flex-col items-center flex-1 pb-10">
                  <span className="text-gray-500 text-xl mb-3">Area</span>
                  <span className="text-white text-xl flex gap-1">
                    <span className="text-yellow">
                      <AreaIcon width="6" />
                    </span>
                    {area}m²
                  </span>
                </div>

                <div className="flex justify-between flex-col items-center flex-1 pb-10">
                  <span className="text-gray-500 text-xl mb-3">Category</span>
                  <span className="text-white text-xl flex gap-1">
                    <span className="text-yellow">
                      <CategoryIcon width="6" />
                    </span>
                    {capitalizeFirstLetter(category)}
                  </span>
                </div>
                <div className="flex justify-between flex-col items-center flex-1 pb-10">
                  <span className="text-gray-500 text-xl mb-3">Price</span>
                  <span className="text-white text-xl flex gap-1">
                    <span className="text-yellow text-xl">
                      {formatCurrency.format(price)}
                      <span className="text-gray-500">
                        {category === "rent" && " /month"}
                      </span>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h3 className="text-white mt-12 mb-6 font-medium text-2xl relative before:left-0 before:m-auto before:absolute before:w-32 before:h-full before:border-b-2 before:border-yellow ">
          Description
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
