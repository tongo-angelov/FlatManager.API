import express from "express";
import { getPostById, getPosts, createNewPost } from "./postRepository";
import pkg from "lodash";
import { getUserById } from "../users/userRepository";
import ServerResponse from "../../utils/response";
import cConsole from "../../utils/console";

const { get } = pkg;

export const createPost = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { title, body } = req.body;

    if (!title || !body) {
      return ServerResponse.warning(res, "Invalid data provided");
    }

    const currentUserId = get(req, "identity._id") as string;
    const user = await getUserById(currentUserId);

    const post = await createNewPost({
      author: {
        userId: currentUserId,
        userName: user.name,
      },
      title,
      body,
    });

    return ServerResponse.success(res, "Post created", post);
  } catch (error) {
    cConsole.error(error);
    return ServerResponse.error(res, error);
  }
};

export const getAllPosts = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const posts = await getPosts();

    return ServerResponse.success(res, "Posts found", posts);
  } catch (error) {
    cConsole.error(error);
    return ServerResponse.error(res, error);
  }
};

export const updatePost = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { title, body } = req.body;

    if (!title && !body) {
      return ServerResponse.warning(res, "Invalid data provided");
    }

    const post = await getPostById(id);
    if (title) post.title = title;
    if (body) post.body = body;
    // TODO : remove direct db call from controller
    await post.save();

    return ServerResponse.success(res, "Post updated", post);
  } catch (error) {
    cConsole.error(error);
    return ServerResponse.error(res, error);
  }
};
