import { client } from "./client.js";

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

const authorized = (userName, password) => {
  return client({
    method: "post",
    url: "/Account/v1/Authorized",
    data: {
      userName,
      password,
    },
  });
};

export default {
  generateToken,
  authorized,
};
