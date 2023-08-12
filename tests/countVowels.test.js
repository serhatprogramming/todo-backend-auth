const countVowels = require("../utils/testing-practice").countVowels;

describe("vowels", () => {
  test("countVowels should correctly count vowels in a string with multiple vowels", () => {
    const stringWithVowels = "Hello, World!";
    const result = countVowels(stringWithVowels);
    expect(result).toBe(3);
  });

  test("countVowels should return 0 for a string with no vowels", () => {
    const stringWithNoVowels = "TVRPL";
    const result = countVowels(stringWithNoVowels);
    expect(result).toBe(0);
  });

  test("countVowels should return 0 for an empty string", () => {
    const emptyString = "";
    const result = countVowels(emptyString);
    expect(result).toBe(0);
  });
});
