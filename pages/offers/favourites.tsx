import React, { FunctionComponent } from "react";

import ApartmentCard from "components/ApartmentCard/ApartmentCard";
import { ApartmentOffer } from "types/common";
import { GetServerSideProps } from "next";
import PageHeader from "../../components/PageHeader/PageHeader";
import { URL } from "utils";
import { getSession } from "next-auth/react";
import { getUserFavouriteOffers } from "services/offers/getForUser";
import { useRouter } from "next/router";

type FavouriteOffersProps = {
  offers: Array<ApartmentOffer>;
};

const FavouriteOffers: FunctionComponent<FavouriteOffersProps> = ({
  offers,
}) => {
  const { push } = useRouter();
  const renderApartments = offers.map(
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
        isHightlight={false}
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
    <div>
      <PageHeader
        title="Favourite Offers"
        description="Here you can find a list of your favourite offers"
      />
      {offers.length === 0 && (
        <div className="text-white w-full flex items-center flex-col gap-3">
          <span className="text-xl">You do not have any favourite offers.</span>
        </div>
      )}
      <div className="grid gap-2 grid-cols-3">{renderApartments}</div>
    </div>
  );
};

export default FavouriteOffers;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: URL.LOGIN_PAGE,
        permanent: false,
      },
    };
  }
  const offers = await getUserFavouriteOffers(session?.user.email as string);

  return {
    props: {
      offers,
    },
  };
};
