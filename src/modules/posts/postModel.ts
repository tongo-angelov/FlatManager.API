import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    author: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      userName: {
        type: String,
        required: true,
      },
    },
    title: { type: String, required: true },
    body: { type: String, required: true },
    comments: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "User",
        },
        userName: { type: String, required: true },
        comment: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export const PostModel = mongoose.model("Post", PostSchema);

export type PostComment = {
  userId: any;
  userName: string;
  comment: string;
};
