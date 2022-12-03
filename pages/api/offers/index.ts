import { NextApiRequest, NextApiResponse } from "next";

import getRecentOffers from "../../../services/offers/getRecent";

const offersApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const offers = await getRecentOffers(4);

  res.status(200).json(offers);
};

export default offersApi;
