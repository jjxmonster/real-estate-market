import { NextApiRequest, NextApiResponse } from "next";

import Stripe from "stripe";
import { buffer } from "micro";
import finalize from "services/checkout/finalize";

export const config = {
  api: {
    bodyParse: false,
  },
};

const stripe = async (req: NextApiRequest, res: NextApiResponse) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2022-11-15",
  });
  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"];

  try {
    const event = stripe.webhooks.constructEvent(
      buf,
      sig as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );

    if (event.type === "payment_intent.succeded") {
      const event_object = event.data.object as Stripe.Checkout.Session;
      const metadata = event_object.metadata;

      await finalize(metadata?.offerID as string);
      console.log("event", event);
    }

    res.json({ received: true });
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err}`);
  }
};

export default stripe;
