import airDB from "../airtableClient";
import Joi from "joi";

import { OfferPayload } from "../../types/common";

const schema = Joi.object({
  title: Joi.string().required(),
  location: Joi.string().required(),
  price: Joi.number().greater(0).required(),
  description: Joi.string().required(),
  area: Joi.number().greater(10).required(),
  category: Joi.string().valid("rent", "sale").required(),
  image_url: Joi.string().required(),
});

const create = async (payload: OfferPayload, userId: string) => {
  const validateOffer = await schema.validateAsync(payload);
  const offer = await airDB("offers").create([
    {
      fields: {
        ...validateOffer,
        users: [userId],
        status: "inactive",
      },
    },
  ]);

  console.log(offer);
  return offer;
};

export default create;
