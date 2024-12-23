import { FastifyInstance, FastifyRequest } from "fastify";
import { WebSocket } from "ws";
import { db } from "./drizzle/db";
import { TaskTable } from "./drizzle/schema";
import { eq } from "drizzle-orm";

export type iSocketMessages = {
  event: "task:completed" | "task:new";
  id: string;
};

export async function handleSocket(server: FastifyInstance) {
  server.get(
    "/",
    { websocket: true },
    (socket: WebSocket, req: FastifyRequest) => {
      socket.on("message", async (message: string, isBinary) => {
        try {
          if (message) {
            const data = JSON.parse(message) as iSocketMessages;
            switch (data?.event) {
              case "task:new":
                const newTask = await db
                  .select()
                  .from(TaskTable)
                  .where(eq(TaskTable.id, data?.id));

                socket.send(
                  JSON.stringify({
                    event: "task:new",
                    task: newTask[0],
                  })
                );
                break;
              case "task:completed":
                socket.send(
                  JSON.stringify({
                    event: "task:completed",
                    id: data?.id,
                  })
                );
                break;

              default:
                console.log("No event found");

                break;
            }
          }
        } catch (error) {
          console.log("error on sending message", error);
        }
      });
    }
  );
}
