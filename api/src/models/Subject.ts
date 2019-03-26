import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
  OneToMany,
  Entity
} from "typeorm";
import Career from "./Career";
import Section from "./Section";

@Entity()
export default class Subject extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  code: string;

  @ManyToMany(() => Career, career => career.subjects)
  careers: Career[];

  @OneToMany(() => Section, section => section.subject)
  sections: Section[];
}
