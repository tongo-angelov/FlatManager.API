import express from "express";

import { format } from "date-fns";
import fs from "fs";
import path from "path";

export const logEvents = async (message: string, logFileName: string) => {
  const dateTime = format(new Date(), "yyyyMMdd\tHH:mm:ss");
  const logItem = `${dateTime}\t${message}\n`;
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fs.promises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fs.promises.appendFile(
      path.join(__dirname, "..", "logs", logFileName),
      logItem
    );
  } catch (error) {
    console.log(error);
  }
};

export const logger = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log");
  console.log(`${req.method} ${req.path}`);
  next();
};
