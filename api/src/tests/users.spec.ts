import "mocha";

import chai from "chai";
import chaiHttp from "chai-http";

import { app } from "./tests-helper";

chai.use(chaiHttp);
const should = chai.should();

import User from "../models/User";
import Career from "../models/Career";

describe("users routes", () => {
  describe("## signup", () => {
    it("signup success", done => {
      const data = {
        name: "tomas",
        email: "20180089@unapec.edu.do",
        careerId: "1",
        identificationCard: "859648965",
        address: "Calle Duarte # 382",
        sex: "M",
        countryOrigin: "Republica Dominicana",
        ownEmail: "tomasotano25@gmail.com",
        phone: "809-545-2578"
      };

      Career.create({
        name: "Ingenieria en Software",
        code: "ISO"
      })
        .save()
        .then(() => {
          chai
            .request(app)
            .post("/api/users/signup")
            .send(data)
            .end((err, res) => {
              res.should.have.status(201);
              done();
            });
        });
    });

    it("signup failed / without email", done => {
      const data = { name: "tomas garcia otaño", careerId: "1" };
      chai
        .request(app)
        .post("/api/users/signup")
        .send(data)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it("signup failed / without careerId", done => {
      const data = {
        name: "tomas garcia otaño",
        email: "20180089@unapec.edu.do"
      };
      chai
        .request(app)
        .post("/api/users/signup")
        .send(data)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it("signup failed / email exists", done => {
      const data = {
        name: "tomas garcia otaño",
        email: "20180089@unapec.edu.do",
        careerId: "1"
      };

      chai
        .request(app)
        .post("/api/users/signup")
        .send(data)
        .end((err, res) => {
          res.should.have.status(409);
          res.body.message.should.equal("Email exists.");
          done();
        });
    });

    it("signup failed / career not found", done => {
      const data = {
        name: "tomas garcia otaño",
        email: "20180088@unapec.edu.do",
        careerId: "2"
      };

      chai
        .request(app)
        .post("/api/users/signup")
        .send(data)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.message.should.equal("Career not found.");
          done();
        });
    });
  });

  describe("## login", () => {
    it("login success", async () => {
      /*const career = await*/

      /*const user = await User.create({
        name: "Tomas Garcia Otaño",
        email: "20180089@unapec.edu.do",
        carrerId: career.id
      }).save();*/

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
});
