import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  emailVerified: {
    type: Boolean,
  },
  profileName: {
    type: String,
  },
  accountType: {
    type: String,
  },
  image: {
    type: String,
  },
});

global.User = global.User || mongoose.model("User", userSchema);

export default global.User;
