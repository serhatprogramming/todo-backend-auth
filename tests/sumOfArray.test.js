const { sumOfArray } = require("../utils/testing-practice");

test("sumOfArray should return the single element for a one-element array", () => {
  const oneElementArray = [7];
  const result = sumOfArray(oneElementArray);
  expect(result).toBe(7);
});

test("sumOfArray should return 0 for an empty array", () => {
  const emptyArray = [];
  const result = sumOfArray(emptyArray);
  expect(result).toBe(0);
});

test("sumOfArray should return the correct sum for a multiple-element array", () => {
  const multipleElementArray = [2, 4, 6, 8, 10];
  const result = sumOfArray(multipleElementArray);
  expect(result).toBe(30);
});
