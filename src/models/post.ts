import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    userName: {
      type: String,
      required: true,
    },
    title: { type: String, required: true },
    body: { type: String, required: true },
  },
  { timestamps: true }
);

export const PostModel = mongoose.model("Post", PostSchema);
