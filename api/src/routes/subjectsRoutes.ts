import { Router } from "express";
import subjectsController from "../controllers/subjectsController";
import checkAuth from "../middleware/checkAuth";

class SubjectsRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }

  config(): void {
    this.router.get("/", checkAuth, subjectsController.getSubjects);
  }
}

export default new SubjectsRoutes().router;
