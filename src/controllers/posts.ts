import express from "express";
import {
  getPostById,
  getPosts,
  createNewPost,
  deletePostById,
} from "../services/posts";
import pkg from "lodash";
import { getUserById } from "../services/users";

const { get } = pkg;

export const getAllPosts = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const posts = await getPosts();

    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message).end();
  }
};

export const createPost = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { title, body } = req.body;

    if (!title || !body) {
      return res.sendStatus(400);
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
    console.log(error);
    return res.status(400).json(error.message).end();
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
    console.log(error);
    return res.status(400).json(error.message).end();
  }
};

export const updatePost = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { title, body } = req.body;

    if (!title || !body) {
      return res.sendStatus(400);
    }

    const post = await getPostById(id);

    post.title = title;
    post.body = body;
    await post.save();

    return res.status(200).json(post).end();
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message).end();
  }
};
