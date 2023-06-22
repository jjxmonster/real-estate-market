import { NextApiRequest, NextApiResponse } from "next";
import { getSession, useSession } from "next-auth/react";

import toggleFavourite from "services/offers/toggleFavourite";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      {
        try {
          const session = await getSession({ req });

          const offer = await toggleFavourite(
            req.body.id,
            session?.user.email as string
          );

          res.status(200).json({ status: "created", offer });
        } catch (error) {
          res.status(422).json({ status: "not_created", error });
        }
      }

      break;

    default:
      res.status(400);
  }
};
