import * as app from "../src/app";

describe("Check nameIsValid function", () => {
  test.each([
    ["", false],
    [undefined, false],
    [null, false],
    ["a", false],
    ["ab", true],
    ["abcde", true],
    ["ABC", false],
    ["123", false],
    ["a1b2c3", false],
    ["@bc", false],
  ])('Expect "%s" name to be valid: %s', (example, expected) => {
    expect(app.nameIsValid(example)).toBe(expected);
  });
});

describe("Check fullTrim function", () => {
  test.each([
    ["", ""],
    [undefined, ""],
    [null, ""],
    ["a b c", "abc"],
    [" abc ", "abc"],
    ["a  bc", "abc"],
    ["1 2 3", "123"],
  ])('Expect "%s" to be "%s" after full trim', (example, expected) => {
    expect(app.fullTrim(example)).toBe(expected);
  });
});

describe("Check getTotal function", () => {
  const testItems = [{ price: 10, quantity: 10 }];
  test.each([
    [testItems, "10", "Скидка должна быть числом"],
    [testItems, null, "Скидка должна быть числом"],
    [testItems, -10, "Процент скидки не может быть отрицательным"],
    [testItems, 100, "Процент скидки не может быть больше 100"],
    [testItems, 101, "Процент скидки не может быть больше 100"],
  ])("Check getTotal throws error", (items, discount, err) => {
    expect(() => app.getTotal(items, discount)).toThrow(err);
  });

  test.each([
    [testItems, 100],
    [null, 0],
  ])("Check getTotal returns expected value", (items, expected) => {
    if (items == null) {
      expect(app.getTotal()).toBe(expected);
    } else {
      expect(app.getTotal(items)).toBe(expected);
    }
  });

  test("Check getTotal throws when items is null", () => {
    expect(() => app.getTotal(null)).toThrow();
  });
});

describe("Check getScore function", () => {
  const scores = {
    Anna: 10,
    Olga: 1,
    Ivan: 5,
  };

  test("Check getScore returns the sum", () => {
    expect(app.getScore(scores)).toBe(16);
  });
});
