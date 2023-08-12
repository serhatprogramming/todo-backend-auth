// logger.js
const isTestEnv = process.env.NODE_ENV === "TEST_ENV";

const log = (...messages) => {
  if (!isTestEnv) {
    console.log(...messages);
  }
};

const error = (...messages) => {
  if (!isTestEnv) {
    console.error(...messages);
  }
};

module.exports = { log, error };
