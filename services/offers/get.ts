import { ApartmentOffer } from "types/common";
import airDB from "../airtableClient";

const get = async (id?: string): Promise<ApartmentOffer | undefined> => {
  const offers = await airDB("offers")
    .select({ filterByFormula: `id=${id}` })
    .firstPage();

  if (offers && offers[0]) {
    return {
      airtableID: offers[0].id,
      ...(offers[0].fields as unknown as Omit<ApartmentOffer, "airtableID">),
    };
  }
};

export default get;
