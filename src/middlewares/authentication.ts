import express from "express";
import pkg from "lodash";

import { getUserBySessionToken } from "../services/users";
import { getPostById } from "../services/posts";

const { merge, get } = pkg;

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies["AUTH"];

    if (!sessionToken) {
      return res.status(403).json("Please login first").end();
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return res.status(403).json("Invalid session token. Please login.").end();
    }

    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message).end();
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
      return res
        .status(403)
        .json("Insufficient permissions to complete this action")
        .end();
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message).end();
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

    if (currentUserId.toString() !== post.userId._id.toString()) {
      return res
        .status(403)
        .json("Insufficient permissions to complete this action")
        .end();
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message).end();
  }
};
