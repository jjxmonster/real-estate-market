import { ApartmentCategory, ApartmentOffer } from "types/common";
import { NextApiRequest, NextApiResponse } from "next";

import paginateOffers from "services/offers/paginate";

const paginateApi = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": {
      const { offset, category } = req.query as {
        offset: string;
        category: ApartmentCategory;
      };
      const offers = await paginateOffers(offset, category);

      res.status(200).json({
        offers: offers.records.map(
          (offer: { fields: ApartmentOffer }) => offer.fields
        ),
        offset: offers.offset,
      });
    }
    default:
      res.status(400);
  }
};

export default paginateApi;
