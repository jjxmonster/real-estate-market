import * as React from "react";

import { ApartmentOffer } from "types/common";
import { GetServerSideProps } from "next";
import Head from "next/head";
import PageHeader from "components/PageHeader/PageHeader";
import finalizeCheckout from "services/checkout/finalize";
import { getSession } from "next-auth/react";
import isAuthorized from "services/offers/isAuthorized";

interface PaymentStatusProps {
  offer: ApartmentOffer;
}

const PaymentStatus: React.FunctionComponent<PaymentStatusProps> = ({
  offer,
}) => {
  const { stripeCheckoutStatus } = offer;
  return (
    <>
      <Head>
        <title>HOME4U | Payment status</title>
      </Head>

      <div className="flex justify-center text-white text-2xl">
        <p>
          Payment status:{" "}
          {
            <span
              className={`${
                stripeCheckoutStatus === "succeeded" ? "text-green" : "text-red"
              }`}
            >
              {stripeCheckoutStatus}
            </span>
          }
        </p>
      </div>
    </>
  );
};

export default PaymentStatus;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getSession({ req });
  const { offer } = await finalizeCheckout(query.id as string);

  if (!isAuthorized(offer, session) || !offer) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      offer,
    },
  };
};
