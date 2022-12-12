import React, { FunctionComponent } from "react";
import useSWR from "swr";

import getRecentOffers from "../../services/offers/getRecent";
import { jsonFetcher } from "../../utils";

import { ApartmentOffer } from "../../types/common";
import ApartmentCard from "../../components/ApartmentCard/ApartmentCard";
import PageHeader from "../../components/PageHeader/PageHeader";

interface OffersProps {
  offers: Array<ApartmentOffer>;
}

const Offers: FunctionComponent<OffersProps> = ({ offers }) => {
  const { data } = useSWR("/api/offers", jsonFetcher, { fallbackData: offers });

  const renderApartments = data.map(
    ({ id, title, area, image, category, location, price }: ApartmentOffer) => (
      <ApartmentCard
        price={price}
        key={id}
        title={title}
        area={area}
        image_url={image[0].url}
        category={category}
        location={location}
      />
    )
  );

  return (
    <div>
      <PageHeader
        title="Search properties"
        description="Find your dream property for rent or buy."
      />
      <div className="grid gap-2 grid-cols-3">{renderApartments}</div>
    </div>
  );
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
