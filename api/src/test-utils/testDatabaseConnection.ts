import { createConnection } from "typeorm";

export const testDatabaseConnection = (drop: boolean = false) =>
  createConnection({
    name: "default",
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1212",
    database: "seleccion_apec_test",
    synchronize: drop,
    dropSchema: drop,
    entities: [__dirname + "/../models/*.*"]
  });
