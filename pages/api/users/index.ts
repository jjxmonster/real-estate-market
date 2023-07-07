import { NextApiRequest, NextApiResponse } from "next";

import { UserPayload } from "types/common";
import creteaUser from "services/users/create";
import { getUsersByIds } from "services/users/get";

const usersApi = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      {
        try {
          const payload: UserPayload = req.body;
          const user = await creteaUser(payload);

          res.status(200).json({ status: "created", user });
        } catch (err: any) {
          res.status(422).json({ status: "not_created", error: err.message });
        }
      }
      break;
    case "GET": {
      try {
        const ids = req.query.ids as string;

        const users = await getUsersByIds(ids.split(","));

        res.status(200).json({ status: "ok", users });
      } catch (error: any) {
        res.status(422).json({ status: "error", error: error.message });
      }
    }
    default:
      res.status(400);
  }
};

export default usersApi;
