import { NextApiRequest, NextApiResponse } from "next";

const stripe = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log("req.body", req.body);
    res.json({ received: true });
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err}`);
  }
};

export default stripe;
