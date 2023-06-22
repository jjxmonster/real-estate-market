import { FavouriteIcon, FavouriteIconOutline } from "components/Icons/Icons";
import React, { FunctionComponent, useEffect, useState } from "react";

import { ApartmentOffer } from "types/common";

interface FavouriteButtonProps {
  offer: ApartmentOffer;
}

const FavouriteButton: FunctionComponent<FavouriteButtonProps> = ({
  offer,
}) => {
  const [bounceEffect, setBounceEffect] = useState(false);
  const [userFavouriteOffers, setUserFavouriteOffers] = useState<Array<string>>(
    []
  );
  const [isOfferFavourite, setIsOfferFavourite] = useState(false);
  const [shouldRefetchFavouriteOffers, setShouldRefetchFavouriteOffers] =
    useState(false);

  const handleToggleFavourite = async (isRemoveAction: boolean) => {
    !isRemoveAction && setBounceEffect(true);
    await fetch("/api/offers/toggleFavourite", {
      method: "POST",
      body: JSON.stringify({ id: offer.airtableID }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      setShouldRefetchFavouriteOffers(true);
    });
  };

  useEffect(() => {
    const getFavouriteOffers = async () => {
      const response = await fetch(`/api/offers/favourite`, {
        method: "GET",
      });
      const offers = await response.json();

      setUserFavouriteOffers(offers as Array<string>);
      setShouldRefetchFavouriteOffers(false);
    };
    setBounceEffect(false);
    getFavouriteOffers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldRefetchFavouriteOffers]);

  useEffect(() => {
    setIsOfferFavourite(userFavouriteOffers.includes(offer.airtableID));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userFavouriteOffers]);

  return isOfferFavourite ? (
    <button
      className="text-red h-10 w-10"
      onClick={() => handleToggleFavourite(true)}
    >
      <FavouriteIcon />
    </button>
  ) : (
    <button
      className={`text-white hover:text-red transition rounded-xl cursor-pointer h-10 w-10 ${
        bounceEffect && "animate-pulse text-red"
      }`}
      onClick={() => handleToggleFavourite(false)}
    >
      <FavouriteIconOutline />
    </button>
  );
};

export default FavouriteButton;
