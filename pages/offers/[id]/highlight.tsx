import { ApartmentOffer, ProductType } from "../../../types/common";
import React, { FunctionComponent } from "react";

import { GetServerSideProps } from "next";
import Head from "next/head";
import PageHeader from "../../../components/PageHeader/PageHeader";
import ProductCard from "components/ProductCard";
import getAllProducts from "services/products/getAll";
import getOfferByID from "services/offers/get";
import { getSession } from "next-auth/react";
import isAuthorized from "services/offers/isAuthorized";

interface OfferEditPageProps {
  offer: ApartmentOffer;
  products: Array<ProductType>;
}

const OfferEditPageProps: FunctionComponent<OfferEditPageProps> = ({
  offer,
  products,
}) => {
  console.log(products);
  return (
    <>
      <Head>
        <title>HOME4U | Highlight offer</title>
      </Head>
      <div className="flex flex-col items-center">
        <PageHeader
          title="Highlight your offer"
          description="Choose the perfect plan for your offer and increase the visibility of your offer."
        />
      </div>
      <div className="flex justify-center">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default OfferEditPageProps;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getSession({ req });
  const offer = await getOfferByID(query.id as string);

  if (!isAuthorized(offer, session) || !offer) {
    return {
      notFound: true,
    };
  }

  const products = await getAllProducts();

  return {
    props: {
      offer,
      products,
    },
  };
};
