import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";
import prisma from "../../../lib/prisma";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    body,
    query: { id },
  } = req;

  switch (method) {
    case "GET":
      try {
        const singleUser: User = await prisma.user.findUnique({
          where: {
            id: id,
          },
        });
        res.status(200).json({ success: true, data: singleUser });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        const myUser: User = await prisma.user.update({
          where: { id: id },
          data: {
            accountType: body.accountType,
            profileName: body.profileName,
          },
        });
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
