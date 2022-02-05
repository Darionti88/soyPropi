import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    body,
    query: { id },
  } = req;

  switch (method) {
    case "POST":
      try {
        const mercadoPagoData = await prisma.mercadopago.create({
          data: {
            ...body,
            userPropiId: id,
          },
        });
        res.status(200).json({ success: true, data: mercadoPagoData });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        const response = await prisma.mercadopago.delete({
          where: {
            userPropiId: String(id),
          },
        });
        res.status(200).json({ success: true, data: response });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
  }
};
