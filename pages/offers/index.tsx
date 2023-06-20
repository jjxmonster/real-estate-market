import React, { FunctionComponent, useEffect, useState } from "react";

import ApartmentCard from "../../components/ApartmentCard/ApartmentCard";
import { ApartmentOffer } from "../../types/common";
import Button from "components/Button/Button";
import { GetStaticProps } from "next";
import Head from "next/head";
import PageHeader from "../../components/PageHeader/PageHeader";
import { jsonFetcher } from "../../utils";
import { loadingState } from "atoms/atoms";
import paginateOffers from "services/offers/paginate";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";

interface OffersProps {
  offers: Array<ApartmentOffer>;
  offset: string;
}

const Offers: FunctionComponent<OffersProps> = ({ offers, offset }) => {
  const [currentOffers, setCurrentOffers] = useState(offers);
  const [currentOffset, setCurrentOffset] = useState(offset);
  const setLoadingState = useSetRecoilState(loadingState);

  const { query } = useRouter();

  const renderApartments = currentOffers.map(
    ({
      id,
      title,
      area,
      image_url,
      category,
      location,
      price,
      highlightTill,
    }: ApartmentOffer) => {
      const isHightlight = highlightTill
        ? new Date(highlightTill) > new Date()
        : false;
      return (
        <ApartmentCard
          isHightlight={isHightlight}
          id={id}
          price={price}
          key={id}
          title={title}
          area={area}
          image_url={image_url}
          category={category}
          location={location}
        />
      );
    }
  );

  const handleLoadMore = async () => {
    setLoadingState({ isLoading: true, message: "" });

    await jsonFetcher(`/api/offers/paginate?offset=${currentOffset}`).then(
      response => {
        setLoadingState({ isLoading: false, message: "" });

        setCurrentOffers([...currentOffers, ...response.offers]);
        setCurrentOffset(response.offset);
      }
    );
  };
  const handleFilters = async () => {
    let filters = "";
    if (query.category) {
      filters += `?category=${query.category}`;
    }
    const response = await jsonFetcher(`/api/offers/paginate${filters}`);
    setCurrentOffset(response.offset);
    setCurrentOffers([...response.offers]);
  };

  useEffect(() => {
    handleFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <>
      <Head>
        <title>HOME4U | Offers</title>
      </Head>
      <div>
        <PageHeader
          title={`Search properties ${
            query?.category ? `to ${query.category}` : ""
          }`}
          description=""
        />
        <div></div>
        <div className="grid gap-2 grid-cols-3">{renderApartments}</div>
        <div className="flex justify-center">
          {currentOffset && (
            <Button label="Load more" onClick={handleLoadMore} />
          )}
        </div>
      </div>
    </>
  );
};

export default Offers;

export const getStaticProps: GetStaticProps = async () => {
  const offers = await paginateOffers();

  return {
    props: {
      offers: offers.records.map(
        (offer: { fields: ApartmentOffer }) => offer.fields
      ),
      offset: offers.offset ?? null,
    },
  };
};
