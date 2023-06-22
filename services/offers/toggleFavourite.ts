import { ApartmentOffer } from "types/common";
import airDB from "services/airtableClient";

const toggleFavourite = async (
  id: string,
  userEmail: string
): Promise<ApartmentOffer | null> => {
  const user = await airDB("users")
    .select({
      filterByFormula: `email="${userEmail}"`,
    })
    .firstPage();

  let shouldOfferBeRemoved = false;
  const userFavouriteOffers = user[0].get("favouriteOffers") as Array<string>;

  if (userFavouriteOffers) {
    shouldOfferBeRemoved = userFavouriteOffers.some(
      offer_id => offer_id === id
    );
  } else {
    shouldOfferBeRemoved = false;
  }

  const updatedFavouriteOffers = shouldOfferBeRemoved
    ? [...userFavouriteOffers.filter(userOffersIds => userOffersIds !== id)]
    : [...(userFavouriteOffers ?? []), id];

  const offer = await airDB("users").update([
    {
      id: user[0].id,
      fields: {
        favouriteOffers: updatedFavouriteOffers,
      },
    },
  ]);

  return offer[0].fields as unknown as ApartmentOffer;
};

export default toggleFavourite;
