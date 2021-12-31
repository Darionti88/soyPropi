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
          Payment: payment_id,
          Status: status,
          MerchantOrder: merchant_order_id,
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
