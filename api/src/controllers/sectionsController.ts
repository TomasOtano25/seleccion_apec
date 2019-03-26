import { Response } from "express";
import { MyRequest } from "../middleware/checkAuth";
import User from "../models/User";
import Section from "../models/Section";
import SectionUser from "../models/SectionUser";
import { In, getRepository } from "typeorm";

class SectionsController {
  public async getSections(req: MyRequest, res: Response): Promise<void> {
    const user = await User.findOne(req.userData.userId!);
    if (!user) {
      // TODO: Buscar codigo correcto
      res.status(409).json({ message: "User not found" });
    }

    let subjectId = req.params.subjectId!;

    const sections = await Section.find({
      where: { subjectId: subjectId }
    });

    res.status(200).json({ data: sections });
  }

  // TODO: refactorizar
  public async addSectionToUser(req: MyRequest, res: Response): Promise<void> {
    const user = await User.findOne(req.userData.userId!);
    if (!user) {
      // TODO: Buscar codigo correcto
      res.status(409).json({ message: "User not found" });
    }

    const sectionsUsers = await SectionUser.find({
      where: {
        userId: user.id
      }
    });

    const arraySections = sectionsUsers.map(section => section.sectionId);

    const sections = await Section.find({
      relations: ["subject"],
      where: {
        id: In(arraySections)
      }
    });

    let uniq = {};
    let arraySubject = sections
      .map(section => {
        return { id: section.subject.id, name: section.subject.name };
      })
      .filter(subject => !uniq[subject.id] && (uniq[subject.id] = true));

    for (let i = 0; i < arraySubject.length; i++) {
      const subject = arraySubject[i];
      if (subject.id === req.body.subjectId!) {
        // find section by subject, delete sectionUser where section && userId
        const sections = await Section.find({
          where: { subjectId: subject.id }
        });

        const arraySections = sections.map(section => section.id);

        await SectionUser.delete({
          userId: user.id,
          sectionId: In(arraySections)
        });

        console.log(sections);
      }
    }
    req.body.subjectId!;

    console.log(arraySubject);

    const sectionUser = await SectionUser.create({
      sectionId: req.body.sectionId!,
      userId: user.id,
      approved: false
    });

    await sectionUser.save();

    res.status(200).json({});
  }

  public async getSelection(req: MyRequest, res: Response): Promise<void> {
    const user = await User.findOne(req.userData.userId!);
    if (!user) {
      // TODO: Buscar codigo correcto
      res.status(409).json({ message: "User not found" });
    }

    const sectionsUsers = await SectionUser.find({
      where: {
        userId: user.id
      }
    });

    const arraySections = sectionsUsers.map(section => section.sectionId);

    const sections = await Section.find({
      relations: ["subject"],
      where: {
        id: In(arraySections)
      }
    });

    const data = sections.map(section => {
      return {
        sectionId: section.id,
        subjectId: section.subject.id,
        group: section.group,
        code: section.subject.code,
        name: section.subject.name,
        teacher: section.teacher
      };
    });

    res.status(200).json({ data: data });
  }
}

const sectionsController = new SectionsController();
export default sectionsController;
