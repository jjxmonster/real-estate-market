import airDB from "../airtableClient";

import { OfferPayload } from "../../types/common";

const create = async (payload: OfferPayload) => {
  const offer = await airDB("offers").create([
    {
      fields: {
        ...payload,
        category: String(payload.category),
        status: "inactive",
      },
    },
  ]);

  console.log(offer);
  return offer;
};

export default create;
