import "dotenv/config";
import fastify, { FastifyRequest } from "fastify";
import { taskRoutes } from "./routes/task";
import fastifyCors from "@fastify/cors";
import fastifyWebsocket from "@fastify/websocket";
import { WebSocket } from "ws";
import { handleSocket } from "./socket";

export function buildServer() {
  const server = fastify();

  server.register(taskRoutes, {
    prefix: "/api/task",
  });

  return server;
}

// Building the main server
const mainServer = buildServer();

// Registering cors
mainServer.register(fastifyCors, {
  origin: process.env.CLIENT_URl,
});

// Registering Websocket connection
mainServer.register(fastifyWebsocket);

mainServer.register(handleSocket);

mainServer.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
