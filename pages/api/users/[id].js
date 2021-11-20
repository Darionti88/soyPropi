import dbConnect from "../../../lib/mongodb";
import User from "../../../models/User";
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
        const singleUser = await User.findOne({ _id: id });
        res.status(200).json({ success: true, data: singleUser });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        const myUser = await User.findByIdAndUpdate({ _id: id }, body, {
          new: true,
          strict: false,
        });
        return res.status(200).json({ success: true, data: myUser });
      } catch (error) {
        res.status(400).json({ success: false, msg: "User not Found" });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
