import express from "express";

import { getAllUsers, updateUser } from "./userController.js";
import {
  isAuthenticated,
  isAccountOwner,
} from "../../middlewares/authentication.js";

export default (router: express.Router) => {
  router
    .get("/users", isAuthenticated, getAllUsers)
    .patch("/users/:id", isAuthenticated, isAccountOwner, updateUser);
};
