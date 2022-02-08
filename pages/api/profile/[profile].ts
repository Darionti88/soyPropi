import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { FullUser } from "../../../types/types";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    body,
    query: { profile },
  } = req;

  switch (method) {
    case "GET":
      try {
        const singleUser: FullUser = await prisma.user.findUnique({
          where: {
            profileName: String(profile),
          },
          include: { mercadopago: true },
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
