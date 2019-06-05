import { Request, Response } from "express";
import Career from "../models/Career";

class CareersController {
  public async getCarrers(req: Request, res: Response): Promise<void> {
    const carrers = await Career.find();
    res.status(200).json({ data: carrers });
  }
}

const carrersController = new CareersController();
export default carrersController;
