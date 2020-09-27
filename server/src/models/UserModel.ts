import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  profilePhotoUrl: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model("User", UserSchema);
