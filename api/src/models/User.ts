import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn
} from "typeorm";
import Career from "./Career";
import SectionUser from "./SectionUser";

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  identificationCard: string;

  @Column()
  address: string;
  // TODO: revisar
  @Column()
  sex: string;

  @Column()
  countryOrigin: string;

  @Column({ nullable: true })
  ownEmail: string;

  @Column()
  phone: string;

  @Column()
  carrerId: number;

  @ManyToOne(() => Career, career => career.users)
  @JoinColumn({ name: "carrerId" })
  career: Career;

  @OneToMany(() => SectionUser, sectionUser => sectionUser.user)
  sectionUsers: SectionUser[];
}
