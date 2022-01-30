import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/mongodb";
import User from "../../../models/User";
import { MercadoPagoUser } from "../../../types/types";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    body,
    query: { profile },
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      console.log("profile: ", profile);
      try {
        const singleUser: MercadoPagoUser = await User.findOne({
          profileName: profile,
        });
        res.status(200).json({ success: true, data: singleUser });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
