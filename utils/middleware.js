const logger = require("./logger");

const requestLogger = (req, res, next) => {
  logger.log(`Request Method: ${req.method}`);
  logger.log(`Request Path: ${req.path}`);

  // Check if the request body contains a "password" field
  const maskedRequestBody = { ...req.body };
  if (maskedRequestBody.password !== undefined) {
    maskedRequestBody.password = "********"; // Hide password
  }

  Object.keys(maskedRequestBody).length !== 0 &&
    logger.log(`Request Body:`, maskedRequestBody);
  logger.log("--------------------------------");
  next();
};

const errorHandler = (error, request, response, next) => {
  logger.error("error message:", error.message);
  if (error.name === "CastError") {
    return response.status(400).json({ error: "invalid id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

module.exports = { errorHandler, requestLogger };
