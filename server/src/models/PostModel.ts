import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Post", PostSchema);
