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
  access_token: {
    type: String,
  },
  token_type: {
    type: String,
  },
  expires_in: {
    type: Number,
  },
  scope: {
    type: String,
  },
  user_id: {
    type: Number,
  },
  refresh_token: {
    type: String,
  },
  public_key: {
    type: String,
  },
  live_mode: {
    type: Boolean,
  },
});

global.User = global.User || mongoose.model("User", userSchema);

export default global.User;
