import {
  AreaIcon,
  BackIcon,
  CategoryIcon,
  PriceIcon,
} from "../../components/Icons/Icons";
import React, { FunctionComponent, useEffect } from "react";
import { URL, capitalizeFirstLetter, formatCurrency } from "utils";

import { ApartmentOffer } from "../../types/common";
import Button from "components/Button/Button";
import FavouriteButton from "components/FavouriteButton";
import Image from "next/image";
import isAuthorized from "services/offers/isAuthorized";
import supabase from "services/supabase";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

interface ApartmentPageViewProps {
  offer: ApartmentOffer;
}
interface OfferActionButton {
  offerID: number;
  action: "edit" | "highlight";
}

const OfferActionButton: FunctionComponent<OfferActionButton> = ({
  offerID,
  action,
}) => {
  const isEditAction = action === "edit";
  const { push } = useRouter();
  const handleMoveToAction = () => {
    push(`/offers/${offerID}/${action}`);
  };

  return (
    <Button
      label={isEditAction ? "Edit" : "Highlight"}
      onClick={handleMoveToAction}
      type={`${isEditAction ? "primary" : "secondary"}`}
    />
  );
};

const ApartmentPageView: FunctionComponent<ApartmentPageViewProps> = ({
  offer,
}) => {
  const { data } = useSession();
  const { push } = useRouter();

  const {
    title,
    location,
    image_url,
    area,
    description,
    category,
    price,
    id,
    viewsCounter,
  } = offer;
  useEffect(() => {
    const countView = async () => {
      await fetch(`/api/offers/countView`, {
        method: "POST",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    };

    countView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddConversation = async () => {
    const response = await supabase.from("conversations").insert([
      {
        participants: [offer.users[0], data?.user.id],
        offer_id: offer.airtableID,
      },
    ]);

    if (response.status === 201) {
      push(URL.CHAT);
    }
  };
  return (
    <div className="my-16">
      <span
        onClick={() => push(URL.OFFERS_PAGE)}
        className="flex items-center mb-12 text-lg cursor-pointer text-yellow"
      >
        <BackIcon /> Back to offers
      </span>
      <div className="flex justify-between w-full">
        <h2 className="text-4xl font-medium text-white">{title}</h2>
        {isAuthorized(offer, data) ? (
          <div>
            <OfferActionButton action="highlight" offerID={offer.id} />
            <OfferActionButton action="edit" offerID={offer.id} />
          </div>
        ) : (
          data && (
            <div className="flex items-center gap-5">
              <FavouriteButton offer={offer} />
              <Button
                label="Chat with an owner"
                type="secondary"
                onClick={handleAddConversation}
              />
            </div>
          )
        )}
      </div>
      <p className="text-gray-500 mt-5 mb-5 text-xl">{location}</p>
      <p className="text-gray-500 mt-5 mb-16 text-sm">
        VIEWS: {viewsCounter + 1}
      </p>

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
  );
};

export default ApartmentPageView;
