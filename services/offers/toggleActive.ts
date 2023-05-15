import { ApartmentOffer } from "types/common";
import airDB from "services/airtableClient";

const toggleActive = async (id: string): Promise<ApartmentOffer | null> => {
  let offer = await airDB("offers")
    .select({ filterByFormula: `id="${id}"` })
    .firstPage();
  if (!offer) return null;

  const currentStatus = offer[0].fields.status;

  offer = await airDB("offers").update([
    {
      id: offer[0].id,
      fields: {
        status: currentStatus === "active" ? "inactive" : "active",
      },
    },
  ]);

  return offer[0].fields as ApartmentOffer;
};

export default toggleActive;
