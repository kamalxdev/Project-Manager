import "dotenv/config";
import fastifyWebsocket from "@fastify/websocket";
import { handleSocket } from "./socket";
import { buildServer } from "./server";

// Building the main server
const mainServer = buildServer();

// Registering Websocket connection
mainServer.register(fastifyWebsocket);

mainServer.register(handleSocket);

mainServer.listen({ port: 8080, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
