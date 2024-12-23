import "dotenv/config";
import fastify from "fastify";
import { taskRoutes } from "./routes/task";
import fastifyCors from "@fastify/cors";
import fastifyWebsocket from "@fastify/websocket";
import { handleSocket } from "./socket";
import fastifyJwt from "@fastify/jwt";
import { authRoutes } from "./routes/auth";
import { userRoutes } from "./routes/user";

export function buildServer() {
  const server = fastify({
    logger:true
  });

  server.register(fastifyJwt, {
    secret: "supersecret",
    cookie:{
      cookieName:"auth",
      signed:false
    },
    sign: {
      expiresIn: '60m'
    }
  });
  server
  .register(require('@fastify/cookie'))

  server.register(taskRoutes, {
    prefix: "/api/task",
  });
  server.register(userRoutes, {
    prefix: "/api/user",
  });

  server.register(authRoutes, {
    prefix: "/api/auth",
  });

  return server;
}

// Building the main server
const mainServer = buildServer();

// Registering cors
mainServer.register(fastifyCors, {
  origin: process.env.CLIENT_URl || "*",
  credentials:true
});

// Registering Websocket connection
mainServer.register(fastifyWebsocket);

mainServer.register(handleSocket);

mainServer.listen({port:8080,host:"0.0.0.0"}, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
