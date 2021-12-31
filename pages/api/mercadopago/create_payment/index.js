/* eslint-disable import/no-anonymous-default-export */
import mercadopago from "mercadopago";

export default async (req, res) => {
  const { method, body } = req;

  mercadopago.configure({
    access_token: body.userAccessToken,
  });
  switch (method) {
    case "POST":
      let preference = {
        items: [
          {
            title: body.description,
            unit_price: parseFloat(body.price),
            quantity: Number(body.quantity),
            currency_id: "$",
          },
        ],
        statement_descriptor: body.description,
        back_urls: {
          success: "http://localhost:3000/api/mercadopago/feedback",
          failure: "http://localhost:3000/api/mercadopago/feedback",
          pending: "http://localhost:3000/api/mercadopago/feedback",
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
