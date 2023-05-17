import express from "express";
import { getUsers, updateUserById } from "./userRepository";
import ServerResponse from "../../utils/response";
import cConsole from "../../utils/console";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();

    return ServerResponse.success(res, "Users found", users);
  } catch (error) {
    cConsole.error(error);
    return ServerResponse.error(res, error.message);
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { username, apartment, name } = req.body;

    if (!username && !apartment && !name) {
      return ServerResponse.warning(res, "Invalid data provided");
    }

    const updatedUser = await updateUserById(id, {
      username,
      name,
      apartment,
    });

    return ServerResponse.success(res, "User updated", updatedUser);
  } catch (error) {
    cConsole.error(error);
    return ServerResponse.error(res, error.message);
  }
};
