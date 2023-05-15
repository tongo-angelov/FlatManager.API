import mongoose from "mongoose";

// User Config
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
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", UserSchema);
