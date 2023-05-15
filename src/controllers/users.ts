import express from "express";
import { deleteUserById, getUserById, getUsers } from "../services/users";
import ServerResponse from "../utils/response";
import cConsole from "../utils/console";

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

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserById(id);

    return ServerResponse.success(res, "User deleted", deletedUser);
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

    const user = await getUserById(id);

    if (username) user.username = username;
    if (name) user.name = name;
    if (apartment) user.apartment = apartment;
    await user.save();

    return ServerResponse.success(res, "User updated", user);
  } catch (error) {
    cConsole.error(error);
    return ServerResponse.error(res, error.message);
  }
};
