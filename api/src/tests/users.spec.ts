import "mocha";

import chai from "chai";
import chaiHttp from "chai-http";

import { app } from "./tests-helper";

chai.use(chaiHttp);
const should = chai.should();

import User from "../models/User";
import Career from "../models/Career";

describe("users routes", () => {
  it("login success", async () => {
    const career = await Career.create({
      name: "Ingenieria en Software",
      code: "ISO"
    }).save();

    const user = await User.create({
      name: "Tomas Garcia Otaño",
      email: "20180089@unapec.edu.do",
      carrerId: career.id
    }).save();

    const res = await chai
      .request(app)
      .post("/api/users/login")
      .send({ email: "20180089@unapec.edu.do" });

    res.should.have.status(200);
    res.body.should.be.a("object");
    res.body.message.should.equal("Auth successful");
  });

  it("should login failed / without email", done => {
    chai
      .request(app)
      .post("/api/users/login")
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("should login failed / not found", done => {
    chai
      .request(app)
      .post("/api/users/login")
      .send({ email: "20180088@unapec.edu.do" })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.message.should.equal("Auth failed");
        done();
      });
  });
});
