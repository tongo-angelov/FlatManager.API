import express from "express";
import * as http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

import router from "./router/index.js";
import cConsole from "./utils/console.js";
import { logEvents, logger } from "./middlewares/logger.js";

const app = express();
app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(logger);
app.use("/api/", router());

const server = http.createServer(app);
const port = process.env.PORT || 8080;

// hide warning message
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL);

mongoose.connection.once("connected", () => {
  cConsole.status("Database Connected");
  server.listen(port, () => {
    cConsole.success(`Server running on http://localhost:${port}/`);
  });
});

mongoose.connection.on("error", (error: Error) => {
  logEvents(`${error.name}\t${error.message}`, "db.log");
  cConsole.error(error);
});
