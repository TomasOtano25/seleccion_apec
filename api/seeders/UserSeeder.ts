import BaseSeeder from "./BaseSeeder";
import { Repository, getConnection } from "typeorm";
import User from "../src/models/User";

export default class UserSeeder implements BaseSeeder {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = getConnection().getRepository(User);
  }

  async init(): Promise<void> {
    console.log("Seeding Users...");
  }

  async seed(): Promise<void> {
    console.log(this.userRepository.find());
  }
}
