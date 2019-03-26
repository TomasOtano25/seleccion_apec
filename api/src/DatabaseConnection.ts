import { Connection, getConnectionOptions, createConnection } from "typeorm";

export default class DatabaseConnection {
  static async connect(): Promise<Connection | null> {
    let retries = 5;
    while (retries) {
      try {
        const config = await getConnectionOptions("default");
        return createConnection(config);
      } catch (error) {
        console.log(retries);
        retries -= 1;
        console.log(`retries left: ${retries}`);

        await new Promise(res => setTimeout(res, 5000));
      }
    }

    return null;
  }
}
