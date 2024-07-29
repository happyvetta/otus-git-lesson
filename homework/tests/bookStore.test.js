import authService from "../framework/services/authService.js";
import userService from "../framework/services/userService.js";
import { generateUserCredentials } from "../framework/fixtures/userFixture.js";
import bookStoreConfig from "../framework/config/bookStoreConfig.js";
import * as booksJson from "../framework/fixtures/books.json";
import bookStoreService from "../framework/services/bookStoreService.js";

const booksList = booksJson.books;

beforeAll(async () => {
  const user = generateUserCredentials();
  const userResponse = await userService.createUser(
    user.username,
    user.password,
  );
  bookStoreConfig.userId = userResponse.data.userID;
  const response = await authService.generateToken(
    user.username,
    user.password,
  );
  bookStoreConfig.token = response.data.token;
});

describe("Book store tests", () => {
  test("Create the list of books", async () => {
    const booksToAdd = [booksList[0], booksList[1], booksList[2]];
    const response = await bookStoreService.addBooks(
      bookStoreConfig.userId,
      booksToAdd,
      bookStoreConfig.token,
    );
    expect(response.status).toBe(201);
    expect(response.data.books[0].isbn).toBe(booksList[0].isbn);
  });

  test("Get book", async () => {
    const response = await bookStoreService.getBookInfo(
      booksList[1].isbn,
      bookStoreConfig.token,
    );
    expect(response.status).toBe(200);
    expect(response.data.title).toBe(booksList[1].title);
  });

  test.each([
    [booksList[0].isbn, 204],
    [booksList[1].isbn, 204],
  ])("Delete %s book", async (example, expected) => {
    const response = await bookStoreService.deleteBook(
      bookStoreConfig.userId,
      example,
      bookStoreConfig.token,
    );
    expect(response.status).toBe(expected);
  });

  test("Update book", async () => {
    const response = await bookStoreService.updateBook(
      bookStoreConfig.userId,
      booksList[2].isbn,
      booksList[3].isbn,
      bookStoreConfig.token,
    );
    expect(response.status).toBe(200);
    expect(response.data.books[0].isbn).toBe(booksList[3].isbn);
  });
});
