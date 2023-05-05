import { ApartmentOffer } from "types/common";
import airDB from "services/airtableClient";

const deleteOffer = async (id: string) => {
  const offer = await airDB("offers").destroy([id]);

  return offer[0] as unknown as ApartmentOffer;
};

export default deleteOffer;
