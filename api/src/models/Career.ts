import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  Entity
} from "typeorm";
import User from "./User";
import Subject from "./Subject";

@Entity()
export default class Career extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  code: string;

  @OneToMany(() => User, user => user.career)
  users: User[];

  @ManyToMany(() => Subject, subject => subject.careers)
  @JoinTable()
  subjects: Subject[];
}
