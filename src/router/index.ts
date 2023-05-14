import express from "express";

import authentication from "./authentication.js";
import users from "./users.js";
import posts from "./posts.js";

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  posts(router);

  return router;
};
