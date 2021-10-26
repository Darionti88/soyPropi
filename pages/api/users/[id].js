import dbConnect from "../../../lib/mongodb";
import user from "../../../models/user";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const {
    method,
    body,
    query: { id },
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const singleUser = await user.findById(
          id
        ); /* find all the data in our database */
        res.status(200).json({ success: true, data: singleUser });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        const myUser = await user.findByIdAndUpdate(id, body, {
          new: true,
          strict: false,
        }); /* find all the data in our database */
        if (!myUser) return res.status(404).json({ msg: "User not found" });
        return res.status(200).json({ success: true, data: myUser });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
