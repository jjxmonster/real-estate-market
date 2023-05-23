import Stripe from "stripe";

const getCheckout = async (
  stripeCheckoutID: string
): Promise<Stripe.Checkout.Session> => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2022-11-15",
  });
  const session = await stripe.checkout.sessions.retrieve(stripeCheckoutID);

  return session;
};

export default getCheckout;
