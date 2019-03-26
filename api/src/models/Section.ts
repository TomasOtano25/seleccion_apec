import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Entity
} from "typeorm";
import Subject from "./Subject";
import SectionUser from "./SectionUser";

@Entity()
export default class Section extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  group: string;

  @Column()
  teacher: string;

  @Column()
  subjectId: number;

  @ManyToOne(() => Subject, subject => subject.sections)
  @JoinColumn({ name: "subjectId" })
  subject: Subject;

  @OneToMany(() => SectionUser, sectionUser => sectionUser.section)
  sectionUsers: SectionUser[];
}
