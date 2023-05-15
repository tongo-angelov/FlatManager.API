import express from "express";
import {
  getPostById,
  getPosts,
  createNewPost,
  deletePostById,
} from "../services/posts";
import pkg from "lodash";
import { getUserById } from "../services/users";
import ServerResponse from "../utils/response";
import cConsole from "../utils/console";

const { get } = pkg;

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

export const createPost = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { title, body } = req.body;

    if (!title || !body) {
      return res.status(400).json("Invalid data provided").end();
    }

    const currentUserId = get(req, "identity._id") as string;
    const user = await getUserById(currentUserId);

    const post = await createNewPost({
      userId: currentUserId,
      userName: user.name,
      title,
      body,
    });

    return res.status(200).json(post).end();
  } catch (error) {
    cConsole.error(error);
    return ServerResponse.error(res, error);
  }
};

export const deletePost = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const deletedPost = await deletePostById(id);

    return res.json(deletedPost);
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
    await post.save();

    return res.status(200).json(post).end();
  } catch (error) {
    cConsole.error(error);
    return ServerResponse.error(res, error);
  }
};
