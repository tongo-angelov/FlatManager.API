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
    price: Number,
    collected: Number,
    dueDate: String,
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
    commentsCount: { type: Number, default: 0 },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    ],
    likesCount: { type: Number, default: 0 },
  },
  { timestamps: true, versionKey: false }
);

export const PostModel = mongoose.model("Post", PostSchema);

export type PostComment = {
  userId: any;
  userName: string;
  comment: string;
};
