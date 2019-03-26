import DatabaseConnection from "../src/DatabaseConnection";
import UserSeeder from "./UserSeeder";

class Seed {
  async run() {
    await DatabaseConnection.connect();
    const userSeeder: UserSeeder = new UserSeeder();

    await userSeeder.init();
    await userSeeder.seed();
  }
}

new Seed().run();
