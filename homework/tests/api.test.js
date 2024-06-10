import axios from "axios";

const client = axios.create({
  baseURL: "https://bookstore.demoqa.com",
});

const testPass = "testTEST@123";
const testUserName = "testUserName";

let userId;

afterAll(async () => {
  const tokenResponse = await generateToken(testUserName, testPass);
  await deleteUser(userId, tokenResponse.data.token).then((res) =>
    expect(res.status).toBe(204),
  );
});

describe("Create user", () => {
  test("Create user and check success response", async () => {
    await createUser(testUserName, testPass).then(async (response) => {
      expect(response.status).toBe(201);
      userId = response.data.userID;
    });
  });

  test("Try to create user with invalid password and throw error", async () => {
    await createUser(testUserName, "test").catch((err) => {
      expect(err.response.status).toBe(400);
    });
  });

  test("Try to create user with existing login and throw error", async () => {
    await createUser(testUserName, "somePass@123").catch((err) => {
      expect(err.response.data.message).toMatch("User exists!");
      expect(err.response.status).toBe(406);
    });
  });
});

describe("Generate token", () => {
  test("Generate token success", async () => {
    await generateToken(testUserName, testPass).then((response) => {
      expect(response.status).toBe(200);
      expect(response.data.result).toBe("User authorized successfully.");
    });
  });

  test("Generate token failed", async () => {
    await generateToken("", testPass).catch((err) => {
      expect(err.response.status).toBe(400);
      expect(err.response.data.message).toBe("UserName and Password required.");
    });
  });
});

const generateToken = (userName, password) => {
  return client({
    method: "post",
    url: "/Account/v1/GenerateToken",
    data: {
      userName,
      password,
    },
  });
};

const createUser = (userName, password) => {
  return client({
    method: "post",
    url: "/Account/v1/User",
    data: {
      userName,
      password,
    },
  });
};

const deleteUser = (userId, token) => {
  const url = `/Account/v1/User/${userId}`;
  return client({
    method: "delete",
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
