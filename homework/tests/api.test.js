import authService from "../framework/services/authService.js";
import userService from "../framework/services/userService.js";
import { generateUserCredentials } from "../framework/fixtures/userFixture.js";
import config from "../framework/config/config.js";
import { faker } from "@faker-js/faker";

const user = generateUserCredentials();

describe("Create user", () => {
  test("Create user and check success response", async () => {
    const response = await userService.createUser(user.username, user.password);
    expect(response.status).toBe(201);
    config.userId = response.data.userID;
  });

  test("Try to create user with invalid password and throw error", async () => {
    try {
      await userService.createUser(user.username, config.invalidPassword);
    } catch (err) {
      expect(err.response.status).toBe(400);
    }
  });

  test("Try to create user with existing login and throw error", async () => {
    try {
      await userService.createUser(user.username, config.otherValidPassword);
    } catch (error) {
      expect(err.response.data.message).toMatch("User exists!");
      expect(err.response.status).toBe(406);
    }
  });
});

describe("Generate token and check user is authorized", () => {
  test("Check user is not authorized", async () => {
    const response = await authService.authorized(user.username, user.password);
    expect(response.status).toBe(200);
    expect(response.data).toBe(false);
  });

  test("Generate token success", async () => {
    const response = await authService.generateToken(
      user.username,
      user.password,
    );
    expect(response.status).toBe(200);
    expect(response.data.result).toBe("User authorized successfully.");
    config.token = response.data.token;
  });

  test("Check user is authorized", async () => {
    const response = await authService.authorized(user.username, user.password);
    expect(response.status).toBe(200);
    expect(response.data).toBe(true);
  });

  test("Generate token failed", async () => {
    try {
      await authService.generateToken("", user.password);
    } catch (err) {
      expect(err.response.status).toBe(400);
      expect(err.response.data.message).toBe("UserName and Password required.");
    }
  });
});

describe("Get user info", () => {
  test("Get user information by id", async () => {
    const res = await userService.getUser(config.userId, config.token);
    expect(res.data.username).toBe(user.username);
  });

  test("Get user information by invalid id", async () => {
    try {
      await userService.getUser(faker.string.uuid(), config.token);
    } catch (err) {
      expect(err.response.data.message).toMatch("User not found!");
    }
  });
});

describe("Delete user", () => {
  test("Check user is deleted", async () => {
    const res = await userService.deleteUser(config.userId, config.token);
    expect(res.status).toBe(204);
  });
});
