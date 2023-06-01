import { CheckoutPayloadType } from "types/common";
import { Console } from "console";
import Joi from "joi";
import Stripe from "stripe";
import airtableClient from "services/airtableClient";
import getOfferByID from "services/offers/get";
import getProduct from "services/products/get";

const schema = Joi.object({
  id: Joi.required(),
  offerID: Joi.number().greater(0).required(),
  quantity: Joi.number().greater(0).required(),
});

export const createCheckout = async (payload: CheckoutPayloadType) => {
  const orderItem = await schema.validateAsync(payload);
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2022-11-15",
  });
  const product = await getProduct(orderItem.id);
  console.log("CRETE CHECKOUT", product);

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    {
      price_data: {
        currency: "eur",
        product_data: {
          name: product.name,
          metadata: {
            offerID: orderItem.id,
          },
        },
        unit_amount: product.priceCents,
      },
      quantity: orderItem.quantity,
    },
  ];

  const paymentObject: Stripe.Checkout.SessionCreateParams = {
    payment_method_types: ["card", "p24"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/offers/${orderItem.offerID}/paymentStatus`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/offers/${orderItem.offerID}/paymentStatus`,
  };

  const session = await stripe.checkout.sessions.create(paymentObject);
  const offer = await getOfferByID(orderItem.offerID);

  if (offer?.airtableID) {
    await airtableClient("offers").update([
      {
        id: offer.airtableID,
        fields: {
          stripeCheckoutID: session.id,
          stripeCheckoutStatus: session.payment_status,
          highlightDuration: product.duration,
        },
      },
    ]);
  }

  return session;
};
