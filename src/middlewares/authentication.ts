import express from "express";
import pkg from "lodash";

import { getUserBySessionToken } from "../modules/users/userRepository";
import { getPostById } from "../modules/posts/postRepository";
import ServerResponse from "../utils/response";
import cConsole from "../utils/console";

const { merge, get } = pkg;

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies["AUTH"];

    if (!sessionToken) {
      return ServerResponse.unauthenticated(res, "Please login first");
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return ServerResponse.unauthenticated(
        res,
        "Invalid session token. Please login."
      );
    }

    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    cConsole.error(error);
    return ServerResponse.error(res, error);
  }
};

export const isAccountOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, "identity._id") as string;

    if (currentUserId.toString() !== id) {
      return ServerResponse.unauthenticated(
        res,
        "Insufficient permissions to complete this action"
      );
    }

    next();
  } catch (error) {
    cConsole.error(error);
    return ServerResponse.error(res, error);
  }
};

export const isPostOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, "identity._id") as string;

    const post = await getPostById(id);

    if (currentUserId.toString() !== post.author.userId._id.toString()) {
      return ServerResponse.unauthenticated(
        res,
        "Insufficient permissions to complete this action"
      );
    }

    next();
  } catch (error) {
    cConsole.error(error);
    return ServerResponse.error(res, error);
  }
};
