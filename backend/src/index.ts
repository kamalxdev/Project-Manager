import "dotenv/config";
import fastify from "fastify";
import { taskRoutes } from "./routes/task";

export function buildServer() {
  const server = fastify();

  server.register(taskRoutes, {
    prefix: "/api/task",
  });

  return server
}

const mainServer = buildServer();

mainServer.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});


