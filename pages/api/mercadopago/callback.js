import dbConnect from "../../../lib/mongodb";
const url = require("url");

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const code = url.parse(req.url, true).query;
        res.status(200).json({ success: true, code: code.code });
        res.writeHead(200, { "Content-Type": "text/html" });
        return res.redirect("/edit_account");
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    // case "POST":
    //   try {
    //     const myUser = await user.create(
    //       req.body
    //     ); /* create a new model in the database */
    //     res.status(201).json({ success: true, data: myUser });
    //     res.redirect(307, "/edit-account").end();
    //   } catch (error) {
    //     res.status(400).json({ success: false });
    //   }
    //   break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
