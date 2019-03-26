import {
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  Column,
  Entity,
  BaseEntity
} from "typeorm";
import User from "./User";
import Section from "./Section";

@Entity()
export default class SectionUser extends BaseEntity {
  @PrimaryColumn()
  sectionId: number;

  @ManyToOne(() => Section, section => section.sectionUsers)
  @JoinColumn({ name: "sectionId" })
  section: Section;

  @PrimaryColumn()
  userId: number;

  @ManyToOne(() => User, user => user.sectionUsers)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column()
  approved: boolean;
}
