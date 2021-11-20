const url = require("url");
import axios from "axios";

export default async function handler(req, res) {
  try {
    const { code, state } = url.parse(req.url, true).query;
    const response = await axios.post(
      `https://api.mercadopago.com/oauth/token?client_secret=TEST-6610547979814243-110815-45203cd05ff1743671a10c89629b4cb1-59429374&grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:3000/api/mercadopago/callback`
    );
    const mpResponse = await axios.put(
      `http://localhost:3000/api/users/${state}`,
      response.data
    );
    // console.log(mpResponse);
    return res.redirect("/edit_account");
  } catch (err) {
    console.log(err);
    return res.redirect("/edit_account");
  }
}
