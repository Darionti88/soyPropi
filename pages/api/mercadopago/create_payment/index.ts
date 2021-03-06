import type { NextApiRequest, NextApiResponse } from "next";
/* eslint-disable import/no-anonymous-default-export */
import mercadopago from "mercadopago";
import { CreatePreferencePayload } from "mercadopago/models/preferences/create-payload.model";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  mercadopago.configure({
    access_token: body.userAccessToken,
  });
  switch (method) {
    case "POST":
      let preference: CreatePreferencePayload = {
        items: [
          {
            title: body.description,
            unit_price: parseFloat(body.price),
            quantity: Number(body.quantity),
            currency_id: "ARS",
          },
        ],
        statement_descriptor: body.description,
        back_urls: {
          success: "http://localhost:3000/feedback",
          failure: "http://localhost:3000/feedback",
          pending: "http://localhost:3000/feedback",
        },
        auto_return: "approved",
        // marketplace_fee: 1,
        // payer: {
        //   email: body.userMail,
        // },
      };

      mercadopago.preferences
        .create(preference)
        .then(function (response) {
          console.log(response);
          return res.status(200).send({
            id: response.body.id,
            url: response.body.init_point,
            urlSandbox: response.body.sandbox_init_point,
          });
        })
        .catch(function (error) {
          console.log(error);
        });

      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
