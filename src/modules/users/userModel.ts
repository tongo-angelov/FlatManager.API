import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    apartment: { type: Number, required: true },
    authentication: {
      password: { type: String, required: true, select: false },
      salt: { type: String, select: false },
      sessionToken: { type: String, select: false },
    },
    posts: [
      {
        postId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Post",
        },
        postTitle: { type: String, required: true },
      },
    ],
    comments: [
      {
        postId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Post",
        },
        postTitle: { type: String, required: true },
        commentId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Comment",
        },
        comment: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", UserSchema);

export type UserPost = {
  postId: any;
  postTitle: string;
};
export type UserComment = {
  postId: any;
  postTitle: string;
  commentId: any;
  comment: string;
};
