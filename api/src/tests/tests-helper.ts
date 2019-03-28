import { Server } from "../app";
import express from "express";
import chai from "chai";
import chaiHttp from "chai-http";
import { before } from "mocha";
import "mocha";

chai.use(chaiHttp);
const should = chai.should();

let application: Server;
export let app: express.Application;

before(async () => {
  application = new Server();
  await application.run();
  app = application.app;

  console.log("## Creating a test account");

  console.info("## Starting test...");
});
