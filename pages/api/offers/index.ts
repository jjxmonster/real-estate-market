import { NextApiRequest, NextApiResponse } from "next";

import getRecentOffers from "../../../services/offers/getRecent";
import createOffer from "../../../services/offers/create";
import { getSession } from "next-auth/react";

const offersApi = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": {
      const offers = await getRecentOffers(4);
      res.status(200).json(offers);

      break;
    }
    case "POST": {
      try {
        const session = await getSession({ req });
        console.log(req);
        if (!session) {
          return res.status(401).json({ error: "not_authorized" });
        }

        const payload = req.body;
        const userId = session.user.id as string;

        const offer = await createOffer(payload, userId);

        res.status(200).json({ status: "created", offer });
      } catch (err) {
        res.status(422).json({ status: "not_created", err });
      }

      break;
    }

    default:
      res.status(400);
  }
};

export default offersApi;
