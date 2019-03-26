import { Router } from "express";
import usersController from "../controllers/usersController";
import checkAuth from "../middleware/checkAuth";

class UsersRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }

  config(): void {
    this.router.post("/signup", usersController.signup);
    this.router.post("/login", usersController.login);
    this.router.get("/me", checkAuth, usersController.me);
  }
}

export default new UsersRoutes().router;
