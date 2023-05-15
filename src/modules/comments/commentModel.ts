import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
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
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Post",
    },
    postTitle: {
      type: String,
      required: true,
    },
    body: { type: String, required: true },
  },
  { timestamps: true }
);

export const CommentModel = mongoose.model("Comment", CommentSchema);
