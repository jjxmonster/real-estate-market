import { NextApiRequest, NextApiResponse } from "next";

import { getSession } from "next-auth/react";
import { getUserFavouriteOffersIDs } from "services/offers/getForUser";

const favouriteOffersApi = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  switch (req.method) {
    case "GET": {
      const session = await getSession({ req });
      const offers = await getUserFavouriteOffersIDs(
        session?.user.email as string
      );
      res.status(200).json(offers);
    }
    default:
      res.status(400);
  }
};

export default favouriteOffersApi;
