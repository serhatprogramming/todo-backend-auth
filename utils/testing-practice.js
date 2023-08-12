const countVowels = (inputString) => {
  const vowels = "aeiouAEIOU";
  let count = 0;

  for (const char of inputString) {
    if (vowels.includes(char)) {
      count++;
    }
  }

  return count;
};

const sumOfArray = (numbersArray) => {
  return numbersArray.reduce((acc, curr) => acc + curr, 0);
};

module.exports = { countVowels, sumOfArray };
