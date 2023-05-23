import { NextApiRequest, NextApiResponse } from "next";

import { createCheckout } from "services/checkout/create";

const checkout = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST": {
      try {
        const orderItem = req.body;
        const checkout = await createCheckout(orderItem);
        res.status(200).json({ status: "created", checkout });
      } catch (err) {
        res.status(422).json({ status: "not_created", err });
      }
      break;
    }
    default:
      res.status(400);
  }
};

export default checkout;
