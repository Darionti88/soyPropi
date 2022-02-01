import type { NextApiRequest, NextApiResponse } from "next";
import url from "url";
import axios from "axios";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { code, state } = url.parse(req.url, true).query;
    const response = await axios.post(
      `https://api.mercadopago.com/oauth/token?client_secret=kcODN4VodOFsXouQyCN0zwdbdKBPe8gQ&client_id=6610547979814243&grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:3000/api/mercadopago/callback`
    );
    await axios.post(
      `http://localhost:3000/api/mercadopago/${state}`,
      response.data
    );
    return res.redirect("/edit_account");
  } catch (err) {
    console.log(err);
    return res.redirect("/edit_account");
  }
};
