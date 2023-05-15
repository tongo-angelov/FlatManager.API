import express from "express";

import { createComment } from "./commentController.js";
import { isAuthenticated } from "../../middlewares/authentication.js";

export default (router: express.Router) => {
  router.post("/posts/:postId/comment", isAuthenticated, createComment);
};
