import airDB from "services/airtableClient";
import getOfferByID from "services/offers/get";

const updateViewsCounter = async (offerID: string) => {
  const offer = await getOfferByID(offerID);

  if (!offer) return null;

  const updatedOffer = await airDB("offers").update([
    {
      id: offer.airtableID,
      fields: { viewsCounter: offer.viewsCounter + 1 },
    },
  ]);

  return updatedOffer;
};

export default updateViewsCounter;
