import express from "express";

import { authentication, random } from "../utils/encryption.js";
import {
  createUser,
  getUserById,
  getUserByUsername,
} from "../services/users.js";
import ServerResponse from "../utils/response.js";
import cConsole from "../utils/console.js";

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return ServerResponse.warning(res, "Invalid data provided");
    }

    const user = await getUserByUsername(username).select(
      "+authentication.salt +authentication.password"
    );

    if (!user) {
      return ServerResponse.warning(res, "Username or password is incorect");
    }

    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password != expectedHash) {
      return ServerResponse.unauthenticated(
        res,
        "Username or password is incorect"
      );
    }

    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    await user.save();

    res.cookie("AUTH", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
      expires: new Date(Date.now() + 900000),
    });

    return ServerResponse.success(res, "User logged in", {
      username: user.username,
      name: user.name,
      apartment: user.apartment,
    });
  } catch (error) {
    cConsole.error(error);
    return ServerResponse.error(res, error.message);
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { password, username, name, apartment } = req.body;

    if (!password || !username || !name || !apartment) {
      return ServerResponse.warning(res, "Invalid data provided");
    }

    const existingUser = await getUserByUsername(username);

    if (existingUser) {
      return ServerResponse.warning(res, "Username already exists");
    }

    const salt = random();
    const user = await createUser({
      username,
      name,
      apartment,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return ServerResponse.success(res, "User created", {
      username: user.username,
      name: user.name,
      apartment: user.apartment,
    });
  } catch (error) {
    cConsole.error(error);
    return ServerResponse.error(res, error.message);
  }
};

export const changePassword = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    if (!password) {
      return ServerResponse.warning(res, "Invalid data provided");
    }

    const existingUser = await getUserById(id);

    if (!existingUser) {
      return ServerResponse.warning(res, "User does not exists");
    }

    existingUser.authentication.password = authentication(
      existingUser.authentication.salt,
      password
    );

    await existingUser.save();

    return ServerResponse.success(res, "Password updated", []);
  } catch (error) {
    cConsole.error(error);
    return ServerResponse.error(res, error.message);
  }
};
