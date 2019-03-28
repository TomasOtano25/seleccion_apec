import * as dotenv from "dotenv";

dotenv.config();

const isTestEnvironment = process.env.NODE_ENV === "test";

export default {
  db: {
    host: isTestEnvironment ? process.env.TEST_DB_HOST : process.env.DB_HOST,
    port: isTestEnvironment ? process.env.TEST_DB_PORT : process.env.DB_PORT,
    username: isTestEnvironment
      ? process.env.TEST_DB_USERNAME
      : process.env.DB_USERNAME,
    password: isTestEnvironment
      ? process.env.TEST_DB_PASSWORD
      : process.env.DB_PASSWORD,
    database: isTestEnvironment ? process.env.TEST_DB_NAME : process.env.DB_NAME
  }
};
