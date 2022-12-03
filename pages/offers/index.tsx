import React, { FunctionComponent } from "react";
import useSWR from "swr";

import getRecentOffers from "../../services/offers/getRecent";
import { jsonFetcher } from "../../utils";

import { ApartmentOffer } from "../../types/common";
import ApartmentCard from "../../components/ApartmentCard/ApartmentCard";

interface OffersProps {
  offers: Array<ApartmentOffer>;
}

const Offers: FunctionComponent<OffersProps> = ({ offers }) => {
  const { data } = useSWR("/api/offers", jsonFetcher, { fallbackData: offers });

  const renderApartments = data.map(
    ({
      id,
      title,
      description,
      area,
      image,
      category,
      location,
    }: ApartmentOffer) => (
      <ApartmentCard
        key={id}
        title={title}
        description={description}
        area={area}
        image_url={image[0].url}
        category={category}
        location={location}
      />
    )
  );

  return <div className="grid gap-2 grid-cols-3 ">{renderApartments}</div>;
};

export default Offers;

export const getStaticProps = async () => {
  const offers = await getRecentOffers(3);

  return {
    props: {
      offers,
    },
  };
};
