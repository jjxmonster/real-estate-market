import { NextApiRequest, NextApiResponse } from "next";

import deleteOffer from "services/offers/delete";
import getOfferByID from "services/offers/get";
import { getSession } from "next-auth/react";
import isAuthorized from "services/offers/isAuthorized";
import updateOffer from "services/offers/update";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  let offer = await getOfferByID(req.query.id as string);
  if (!isAuthorized(offer, session)) {
    return res.status(401).json({ error: "not authorized" });
  }

  if (!offer?.airtableID) {
    return res.status(400);
  }

  switch (req.method) {
    case "DELETE": {
      try {
        offer = await deleteOffer(offer.airtableID as string);
        res.status(200).json({ status: "updated", offer });
      } catch (err) {
        res.status(422).json({ status: "not_updated", err });
      }
      break;
    }
    case "PUT": {
      try {
        const payload = req.body;

        offer = await updateOffer(offer.airtableID as string, payload);
        res.status(200).json({ status: "updated", offer });
      } catch (err) {
        res.status(422).json({ status: "not_updated", err });
      }
      break;
    }
    default:
      res.status(400);
  }
};
