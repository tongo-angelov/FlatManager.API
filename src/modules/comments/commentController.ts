import express from "express";
import { createNewComment } from "./commentRepository";
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

    const { body } = req.body;

    if (!body) {
      return ServerResponse.warning(res, "Invalid data provided");
    }

    const currentUserId = get(req, "identity._id") as string;

    const user = await getUserById(currentUserId);
    const post = await getPostById(postId);

    const comment = await createNewComment({
      userId: currentUserId,
      userName: user.name,
      postId,
      postTitle: post.title,
      body,
    });

    return ServerResponse.success(res, "Comment created", comment);
  } catch (error) {
    cConsole.error(error);
    return ServerResponse.error(res, error);
  }
};
