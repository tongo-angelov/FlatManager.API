import { Response } from "express";
import { isArray } from "lodash";

export default class ServerResponse {
  static success = (
    res: Response,
    message: string,
    data: [] | {}
  ): Response => {
    return res
      .status(200)
      .json({ message, data: isArray(data) ? data : [data] })
      .end();
  };
  static error = (res: Response, error: Error): Response => {
    return res.status(400).json({ message: error.message, data: [] }).end();
  };
  static warning = (res: Response, message: string): Response => {
    return res.status(400).json({ message, data: [] }).end();
  };
  static unauthenticated = (res: Response, message: string): Response => {
    return res.status(403).json({ message, data: [] }).end();
  };
}
