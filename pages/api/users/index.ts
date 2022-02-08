/* eslint-disable import/no-anonymous-default-export */
import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// eslint-disable-next-line import/no-anonymous-default-export

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const users: User[] = await prisma.user.findMany();
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const myUser: User = await prisma.user.create({
          data: { ...req.body },
        });
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
