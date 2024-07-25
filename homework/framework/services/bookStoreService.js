import { client } from "./client.js";

const booksEndpoint = "/BookStore/v1/Books";

const addBooks = (userId, books, token) => {
  return client({
    method: "post",
    url: booksEndpoint,
    data: {
      userId,
      collectionOfIsbns: books.map((book) => ({ isbn: book.isbn })),
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getBooks = (token) => {
  return client({
    method: "get",
    url: booksEndpoint,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getBookInfo = (isbn, token) => {
  return client({
    method: "get",
    url: `/BookStore/v1/Book?ISBN=${isbn}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const updateBook = (userId, oldIsbn, newIsbn, token) => {
  return client({
    method: "put",
    url: `/BookStore/v1/Books/${oldIsbn}`,
    data: {
      userId,
      isbn: newIsbn,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteBook = (userId, isbn, token) => {
  return client({
    method: "delete",
    url: "/BookStore/v1/Book",
    data: {
      userId,
      isbn,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default {
  addBooks,
  getBooks,
  getBookInfo,
  updateBook,
  deleteBook,
};
