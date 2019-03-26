import { Router } from "express";
import checkAuth from "../middleware/checkAuth";
import sectionsController from "../controllers/sectionsController";

class SectionsRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }

  config(): void {
    this.router.get("/selection", checkAuth, sectionsController.getSelection);
    this.router.get("/:subjectId", checkAuth, sectionsController.getSections);
    this.router.post("/", checkAuth, sectionsController.addSectionToUser);
  }
}

export default new SectionsRoutes().router;
