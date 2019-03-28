import "reflect-metadata";
import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { createConnection } from "typeorm";

import indexRouter from "./routes/indexRoutes";
import usersRoutes from "./routes/usersRoutes";
import subjectsRoutes from "./routes/subjectsRoutes";
import sectionsRoutes from "./routes/sectionsRoutes";
import config from "./config/config";

export class Server {
  app: Application;
  config = config;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  run = async () => {
    const conn = await createConnection();
    console.info(
      `Connected to database. Connection: ${conn.name} / ${
        conn.options.database
      }`
    );
    this.start();
  };

  middlewares(): void {
    this.app.set("port", process.env.PORT || 9000);
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(
      morgan("dev", {
        skip: () => process.env.NODE_ENV === "test"
      })
    );

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  routes(): void {
    this.app.use("/api", indexRouter);
    this.app.use("/api/users", usersRoutes);
    this.app.use("/api/subjects", subjectsRoutes);
    this.app.use("/api/sections", sectionsRoutes);
  }

  start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log(`Server on port, ${this.app.get("port")}`);
    });
  }
}
