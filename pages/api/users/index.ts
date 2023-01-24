import { NextApiRequest, NextApiResponse } from "next";

import creteaUser from "services/users/create";
import { UserPayload } from "types/common";

const usersApi = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST": {
      try {
        const payload: UserPayload = req.body;
        const user = await creteaUser(payload);

        res.status(200).json({ status: "created", user });
      } catch (err) {
        res.status(422).json({ status: "not_created", err });
      }
    }
    default:
      res.status(400);
  }
};

export default usersApi;
