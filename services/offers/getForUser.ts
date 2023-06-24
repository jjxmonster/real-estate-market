import { ApartmentOffer } from "../../types/common";
import airDB from "../airtableClient";

export const getOffersCreatedByUser = async (
  email: string
): Promise<Array<ApartmentOffer>> => {
  const offers = await airDB("offers")
    .select({
      sort: [{ field: "id", direction: "desc" }],
      filterByFormula: `email="${email}"`,
    })
    .firstPage();

  if (Array.isArray(offers)) {
    return offers.map((offer: { fields: ApartmentOffer }) => offer.fields);
  }

  return [];
};

export const getUserFavouriteOffersIDs = async (
  email: string
): Promise<Array<string>> => {
  const user = await airDB("users")
    .select({
      filterByFormula: `email="${email}"`,
    })
    .firstPage();

  const userFavouriteOffers = user[0].get("favouriteOffers") as Array<string>;

  if (userFavouriteOffers) {
    return userFavouriteOffers;
  } else {
    return [];
  }
};

export const getUserFavouriteOffers = async (
  email: string
): Promise<Array<ApartmentOffer>> => {
  const user = await airDB("users")
    .select({
      filterByFormula: `email="${email}"`,
    })
    .firstPage();

  const userFavouriteOffersIds = user[0].get(
    "favouriteOffers"
  ) as Array<string>;

  const offers = await airDB("offers")
    .select({
      filterByFormula: `OR(${userFavouriteOffersIds
        .map(id => `RECORD_ID()='${id}'`)
        .join(",")})`,
    })
    .firstPage();

  if (Array.isArray(offers)) {
    return offers.map((offer: { fields: ApartmentOffer }) => offer.fields);
  }

  return [];
};
