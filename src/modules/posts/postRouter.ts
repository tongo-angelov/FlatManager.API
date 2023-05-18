import express from "express";

import {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
} from "./postController.js";
import {
  isAuthenticated,
  isPostOwner,
} from "../../middlewares/authentication.js";

export default (router: express.Router) => {
  router
    .post("/posts", isAuthenticated, createPost)
    .get("/posts", isAuthenticated, getAllPosts)
    .get("/posts/:id", isAuthenticated, getPost)
    .patch("/posts/:id", isAuthenticated, isPostOwner, updatePost);
};
