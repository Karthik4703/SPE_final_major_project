// const winston = require("winston");
// const { combine, timestamp, printf } = require("winston").format;

// const myFormat = printf(({ level, message, timestamp }) => {
//   return `[${timestamp}] [${level}] [${message}]`;
// });

// const logger = winston.createLogger({
//   level: process.env.LOG_LEVEL || "info",
//   format: combine(winston.format.colorize(), timestamp({ format: "HH:mm:ss" }), myFormat),
//   transports: [
//     new winston.transports.Console(),
//     new winston.transports.File({ filename: "logs/server.log" }),
//   ],
// });

// module.exports = logger;

const winston = require("winston");
const { combine, timestamp, printf } = require("winston").format;

const myFormat = printf(({ level, message, timestamp }) => {
  // Check if the log transport is the console to determine colorization
  const shouldColorize = process.env.NODE_ENV !== 'production'; // You can adjust this condition based on your needs

  const logLabel = shouldColorize ? `[${timestamp}] [${level}] [${message}]` : `[${timestamp}] [${level}] ${message}`;

  return logLabel;
});

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: combine(
    timestamp({ format: "HH:mm:ss" }),
    myFormat
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/server.log" }),
  ],
});

module.exports = logger;