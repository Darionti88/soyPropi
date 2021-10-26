import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please do"],
  },
  email: {
    type: String,
    required: [true, "please do"],
  },
  image: {
    type: String,
    required: [true, "please do"],
  },
  email_verified: {
    type: Object,
  },
  // profileName: {
  //   type: String,
  //   required: [true, "please do"],
  // },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
