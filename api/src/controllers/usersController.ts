import { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import Career from "../models/Career";
import { MyRequest } from "../middleware/checkAuth";

class UsersController {
  public async signup(req: Request, res: Response): Promise<void> {
    const { email, careerId } = req.body;
    if (!email || !careerId) {
      res.sendStatus(400);
      return;
    }

    let user = await User.findOne({ where: { email: req.body.email! } });
    if (user) {
      res.status(409).json({ message: "Email exists." });
      return;
    }

    const career = await Career.findOne(req.body.careerId!);
    if (!career) {
      res.status(401).json({ message: "Career not found." });
      return;
    }

    const data = new User();
    data.name = req.body.name!;
    data.email = email;
    data.identificationCard = req.body.identificationCard!;
    data.address = req.body.identificationCard!;
    data.sex = req.body.sex!;
    data.countryOrigin = req.body.countryOrigin!;
    data.ownEmail = req.body.ownEmail!;
    data.phone = req.body.phone!;
    data.carrerId = career.id;

    user = await User.create(data);
    user
      .save()
      .then(() => {
        return res.status(201).json({ message: "User created", user: user });
      })
      .catch(err => {
        return res.status(500).json({ error: err });
      });
  }

  public async login(req: Request, res: Response): Promise<void> {
    const { email } = req.body;

    if (!email) {
      res.sendStatus(400);
      return;
    }

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      res.status(401).json({ message: "Auth failed" });
      return;
    }

    const token = jwt.sign(
      {
        email: user.email,
        userId: user.id
      },
      "secret",
      {
        expiresIn: "24h"
      }
    );

    res.status(200).json({
      message: "Auth successful",
      token: token
    });
  }

  public async me(req: MyRequest, res: Response): Promise<void> {
    const user = await User.findOne(req.userData.id!);
    if (!user) {
      // TODO: Buscar codigo correcto
      res.status(409).json({ message: "User not found" });
    }

    res.status(200).json(user);
  }
}

const usersController = new UsersController();
export default usersController;
