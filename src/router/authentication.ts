import express from "express";

import {
  changePassword,
  login,
  register,
} from "../controllers/authentication.js";
import {
  isAccountOwner,
  isAuthenticated,
} from "../middlewares/authentication.js";

export default (router: express.Router) => {
  router.patch("/auth/:id", isAuthenticated, isAccountOwner, changePassword);
  router.post("/auth/register", register);
  router.post("/auth/login", login);
};
