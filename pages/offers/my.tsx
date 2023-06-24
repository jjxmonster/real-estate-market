import React, { FunctionComponent } from "react";

import ApartmentCard from "components/ApartmentCard/ApartmentCard";
import { ApartmentOffer } from "types/common";
import Button from "components/Button/Button";
import { GetServerSideProps } from "next";
import Head from "next/head";
import PageHeader from "../../components/PageHeader/PageHeader";
import { URL } from "utils";
import { getOffersCreatedByUser } from "services/offers/getForUser";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

type MyOffersProps = {
  offers: Array<ApartmentOffer>;
};

const MyOffers: FunctionComponent<MyOffersProps> = ({ offers }) => {
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
    <>
      <Head>
        <title>HOME4U | My Offers</title>
      </Head>
      <div>
        <PageHeader
          title="My offers"
          description="Here you can find a list of offers created by you."
        />
        {offers.length === 0 && (
          <div className="text-white w-full flex items-center flex-col gap-3">
            <span className="text-xl">You do not have any offers.</span>
            <Button
              label="Add new offer"
              onClick={() => push(URL.NEW_OFFER_PAGE)}
            />
          </div>
        )}
        <div className="grid gap-2 grid-cols-3">{renderApartments}</div>
      </div>
    </>
  );
};

export default MyOffers;

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
  const offers = await getOffersCreatedByUser(session?.user.email as string);

  return {
    props: {
      offers,
    },
  };
};
