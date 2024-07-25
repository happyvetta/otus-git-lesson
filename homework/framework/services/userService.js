import { client } from "./client.js";

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

const getUser = (userId, token) => {
  const url = `/Account/v1/User/${userId}`;
  return client({
    method: "get",
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default {
  createUser,
  deleteUser,
  getUser,
};
