import { Router, Request, Response } from "express";
import checkAuth from "../middleware/checkAuth";

class IndexRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get("/", checkAuth, (req: Request, res: Response) => {
      res.json({ text: "Yes" });
    });
  }
}

export default new IndexRoutes().router;
