import { pinoHttp } from "pino-http";

export const loggerMiddleware = pinoHttp({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
});