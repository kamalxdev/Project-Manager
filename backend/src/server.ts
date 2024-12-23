import fastifyCors from "@fastify/cors";
import { taskRoutes } from "./routes/task";
import { userRoutes } from "./routes/user";
import { authRoutes } from "./routes/auth";
import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";

export function buildServer() {
    const server = fastify({
      logger: true,
    });
  
    server.register(fastifyJwt, {
      secret: "supersecret",
      cookie: {
        cookieName: "auth",
        signed: false,
      },
      sign: {
        expiresIn: "60m",
      },
    });
    server.register(require("@fastify/cookie"));
  
    server.register(taskRoutes, {
      prefix: "/api/task",
    });
    server.register(userRoutes, {
      prefix: "/api/user",
    });
  
    server.register(authRoutes, {
      prefix: "/api/auth",
    });
    // Registering cors
    server.register(fastifyCors, {
      origin: process.env.CLIENT_URl || "*",
      credentials: true,
    });
  
    return server;
  }