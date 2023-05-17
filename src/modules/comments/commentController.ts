import express from "express";
import { addComment } from "./commentRepository";
import pkg from "lodash";
import { getUserById } from "../users/userRepository";
import ServerResponse from "../../utils/response";
import cConsole from "../../utils/console";
import { getPostById } from "../posts/postRepository";

const { get } = pkg;

export const createComment = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { postId } = req.params;

    const { comment } = req.body;

    if (!comment) {
      return ServerResponse.warning(res, "Invalid data provided");
    }

    const currentUserId = get(req, "identity._id") as string;

    const user = await getUserById(currentUserId);
    const post = await getPostById(postId);

    const newComment = await addComment(postId, {
      userId: currentUserId,
      userName: user.name,
      comment,
    });

    return ServerResponse.success(res, "Comment created", newComment);
  } catch (error) {
    cConsole.error(error);
    return ServerResponse.error(res, error);
  }
};
