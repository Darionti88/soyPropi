/* eslint-disable import/no-anonymous-default-export */

export default async (req, res) => {
  const {
    method,
    body,
    query: { payment_id, status, merchant_order_id },
  } = req;

  switch (method) {
    case "GET":
      try {
        res.status(200).json({
          payment: "99872398",
          status: "approved",
          merchantOrder: "983739821",

          // payment: payment_id,
          // status: status,
          // merchantOrder: merchant_order_id,
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

      break;
    default:
      res.status(200).json({ success: false });
      break;
  }
};
