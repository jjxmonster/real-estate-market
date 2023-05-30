import { ApartmentOffer } from "types/common";
import Stripe from "stripe";
import airDB from "services/airtableClient";
import getOfferByID from "services/offers/get";

const finalize = async (offerID: string) => {
  let offer = await getOfferByID(offerID);
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2022-11-15",
  });

  if (offer) {
    const checkout = await stripe.checkout.sessions.retrieve(
      offer.stripeCheckoutID as string
    );

    if (
      offer?.stripeCheckoutStatus === "succeeeded" ||
      checkout.payment_status === "unpaid"
    ) {
      return { offer, checkout };
    }
    const paymentIntent = await stripe.paymentIntents.retrieve(
      checkout.payment_intent as string
    );

    if (paymentIntent.status === "succeeded") {
      let highlightTillDate = new Date(
        Date.now() + 1000 * 60 * 60 * 24 * offer.highlightDuration
      );
      let highlightTillISOString = highlightTillDate.toISOString();

      offer = (await airDB("offers").update([
        {
          id: offer.airtableID,
          fields: {
            stripeCheckoutStatus: paymentIntent.status,
            highlightTill: highlightTillISOString,
          },
        },
      ])) as unknown as ApartmentOffer;

      return { offer, checkout };
    }
    return { offer, checkout };
  }
};

export default finalize;
