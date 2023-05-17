import express from "express";

import { changePassword, login, register } from "./authController.js";
import {
  isAccountOwner,
  isAuthenticated,
} from "../../middlewares/authentication.js";

export default (router: express.Router) => {
  router
    .post("/auth/register", register)
    .post("/auth/login", login)
    .patch("/auth/:id", isAuthenticated, isAccountOwner, changePassword);
};
