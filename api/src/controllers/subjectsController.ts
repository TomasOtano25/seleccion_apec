import { Response } from "express";
import { MyRequest } from "../middleware/checkAuth";
import User from "../models/User";
import Career from "../models/Career";

class SubjectsController {
  public async getSubjects(req: MyRequest, res: Response): Promise<void> {
    const user = await User.findOne(req.userData.userId!);
    if (!user) {
      // TODO: Buscar codigo correcto
      res.status(409).json({ message: "User not found" });
    }
    // Todas las materias de la carrera del usuario actual, menos las ya cursadas
    const career = await Career.findOne({
      relations: ["subjects"],
      where: { users: user.carrerId }
    });

    res.status(200).json({ data: career.subjects });
  }
}

const subjectsController = new SubjectsController();
export default subjectsController;
