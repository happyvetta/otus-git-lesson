import { faker } from "@faker-js/faker";
import config from "../config/config";

export const generateUserCredentials = () => {
  return {
    username: faker.internet.userName(),
    password: config.password,
  };
};
