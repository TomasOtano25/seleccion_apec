import { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import Career from "../models/Career";
import { MyRequest } from "../middleware/checkAuth";

class UsersController {
  public async signup(req: Request, res: Response): Promise<void> {
    /*const { careerId } = req.body;
    const career = Career.findOne(careerId);
    console.log(career);*/

    const career = await Career.create({
      name: "Ingenieria en Software",
      code: "ISO"
    }).save();

    let user = await User.findOne({ where: { email: req.body.email! } });

    if (user) {
      res.status(409).json({ message: "Email exists" });
      return;
    }

    user = await User.create({
      name: req.body.name!,
      email: req.body.email!,
      carrerId: career.id
    });

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
    const user = await User.findOne({ where: { email: req.body.email! } });

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
