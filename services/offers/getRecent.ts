import { ApartmentOffer } from "../../types/common";
import airDB from "../airtableClient";

const getRecent = async (
  maxRecords: number
): Promise<Array<ApartmentOffer>> => {
  const offers = await airDB("offers")
    .select({
      sort: [{ field: "id", direction: "desc" }],
      filterByFormula: 'status="active"',
      maxRecords,
    })
    .firstPage();

  if (Array.isArray(offers)) {
    return offers.map((offer: { fields: ApartmentOffer }) => offer.fields);
  }

  return [];
};

export default getRecent;
