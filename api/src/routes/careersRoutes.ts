import { Router } from "express";
import carrersController from "../controllers/careersController";

class CarrersRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }

  config(): void {
    this.router.get("/", carrersController.getCarrers);
  }
}

export default new CarrersRoutes().router;
