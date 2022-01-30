/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/mongodb";
import user from "../../../models/User";
import { MercadoPagoUser } from "../../../types/types";

// eslint-disable-next-line import/no-anonymous-default-export

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const users: MercadoPagoUser[] = await user.find({});
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const myUser: MercadoPagoUser = await user.create(req.body);
        res.status(201).json({ success: true, data: myUser });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
