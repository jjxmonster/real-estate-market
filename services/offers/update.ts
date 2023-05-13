import { ApartmentOffer, OfferPayload } from "types/common";

import Joi from "joi";
import airDB from "services/airtableClient";

const schema = Joi.object({
  title: Joi.string().required(),
  location: Joi.string().required(),
  price: Joi.number().greater(0).required(),
  description: Joi.string().required(),
  area: Joi.number().greater(10).required(),
  category: Joi.string().valid("rent", "sale").required(),
  image_url: Joi.string().required(),
  mobile: Joi.string().required(),
});

const updateOffer = async (id: string, payload: OfferPayload) => {
  const validateOffer = await schema.validateAsync(payload);

  const offer = await airDB("offers").update([
    {
      id,
      fields: { ...validateOffer },
    },
  ]);

  return offer[0] as unknown as ApartmentOffer;
};

export default updateOffer;
