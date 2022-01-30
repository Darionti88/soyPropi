import type { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "../../../lib/mongodb";
import User from "../../../models/User";
import { MercadoPagoUser } from "../../../types/types";
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    body,
    query: { id },
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const singleUser: MercadoPagoUser = await User.findOne({ _id: id });
        res.status(200).json({ success: true, data: singleUser });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        const myUser: MercadoPagoUser = await User.findByIdAndUpdate(
          { _id: id },
          body,
          {
            new: true,
            strict: false,
          }
        );
        return res.status(200).json({ success: true, data: myUser });
      } catch (error) {
        res.status(400).json({ success: false, msg: "User not Found" });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
