import { ApartmentOffer } from "../../types/common";
import airDB from "../airtableClient";

const getForUser = async (email: string): Promise<Array<ApartmentOffer>> => {
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

export default getForUser;
