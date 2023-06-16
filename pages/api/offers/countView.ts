import { NextApiRequest, NextApiResponse } from "next";

import updateViewsCounter from "services/offers/updateViewsCounter";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST": {
      try {
        const offer = await updateViewsCounter(req.body.id);

        if (offer) {
          res.status(200).json({ status: "updated", offer });
        }
      } catch (error) {
        res.status(422).json({ status: "not_updated", error });
      }
    }
  }
};
