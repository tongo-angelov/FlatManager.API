import express from "express";

import {
  createPost,
  deletePost,
  getAllPosts,
  updatePost,
} from "../controllers/posts.js";
import { isAuthenticated, isPostOwner } from "../middlewares/authentication.js";

export default (router: express.Router) => {
  router
    .get("/posts", isAuthenticated, getAllPosts)
    .post("/posts", isAuthenticated, createPost);
  router
    .patch("/posts/:id", isAuthenticated, isPostOwner, updatePost)
    .delete("/posts/:id", isAuthenticated, isPostOwner, deletePost);
};
