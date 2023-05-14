import express from "express";

import { getAllUsers, deleteUser, updateUser } from "../controllers/users.js";
import {
  isAuthenticated,
  isAccountOwner,
} from "../middlewares/authentication.js";

export default (router: express.Router) => {
  router.get("/users", isAuthenticated, getAllUsers);
  router
    .patch("/users/:id", isAuthenticated, isAccountOwner, updateUser)
    .delete("/users/:id", isAuthenticated, isAccountOwner, deleteUser);
};
