import BaseSeeder from "./BaseSeeder";
import { Repository, getConnection } from "typeorm";
import User from "../src/models/User";
import Career from "../src/models/Career";

export default class UserSeeder implements BaseSeeder {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = getConnection().getRepository(User);
  }

  async init(): Promise<void> {
    console.log("Seeding Users...");
  }

  async seed(): Promise<void> {
    const careers = await Career.find();
    const user = new User();

    user.name = "Tomas Garcia Otaño";
    user.email = "20180089@unapec.edu.com";
    user.career = careers[0];

    await this.userRepository.save(user);
  }
}
