import "reflect-metadata";
import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";

import indexRouter from "./routes/indexRoutes";
import usersRoutes from "./routes/usersRoutes";
import subjectsRoutes from "./routes/subjectsRoutes";
import sectionsRoutes from "./routes/sectionsRoutes";
import DatabaseConnection from "./DatabaseConnection";

class Server {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  public config(): void {
    DatabaseConnection.connect();

    this.app.set("port", process.env.PORT || 9000);
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  public routes(): void {
    this.app.use("/api", indexRouter);
    this.app.use("/api/users", usersRoutes);
    this.app.use("/api/subjects", subjectsRoutes);
    this.app.use("/api/sections", sectionsRoutes);
    /*this.app.use("/api/users", indexRouter);
    this.app.use("/api/subjects", subjectsRoutes);
    this.app.use("/api/sections", sectionsRoutes);
    this.app.use("");*/
  }

  start() {
    this.app.listen(this.app.get("port"), () => {
      console.log(`Server on port, ${this.app.get("port")}`);
    });
  }
}

const server = new Server();
server.start();