import express from "express";

import { createPost, getAllPosts, updatePost } from "./postController.js";
import {
  isAuthenticated,
  isPostOwner,
} from "../../middlewares/authentication.js";

export default (router: express.Router) => {
  router
    .post("/posts", isAuthenticated, createPost)
    .get("/posts", isAuthenticated, getAllPosts)
    .patch("/posts/:id", isAuthenticated, isPostOwner, updatePost);
};
