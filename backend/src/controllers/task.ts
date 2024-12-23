import { FastifyReply, FastifyRequest } from "fastify";
import { db } from "../drizzle/db";
import { TaskTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export async function getTask(request: FastifyRequest, reply: FastifyReply) {
  try {
    const allTask = await db.select().from(TaskTable);
    return allTask;
  } catch (error) {
    console.log("Error on getTask: ", error);
  }
}

export async function postTask(
  request: FastifyRequest<{ Body: { title: string; description: string } }>,
  reply: FastifyReply
) {
  try {
    const body = request.body;

    const newTask = await db
      .insert(TaskTable)
      .values({
        title: body?.title,
        description: body?.description,
      })
      .returning({
        id: TaskTable.id,
      });

    if (!newTask[0]?.id) {
      throw new Error();
    }

    return reply
      .code(201)
      .send({ success: "Task Created Successfully", id: newTask[0]?.id });
  } catch (error) {
    console.log("Error on postTask: ", error);
    return reply.code(400).send({ error: "Error on creating a new task" });
  }
}

export async function updateTaskAsCompleted(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const taskid = request.params.id;
    const updateTask = await db
      .update(TaskTable)
      .set({
        status: "COMPLETED",
        completedAt: new Date(),
      })
      .where(eq(TaskTable.id, taskid))
      .returning({ id: TaskTable.id });

    if (!updateTask) {
      throw new Error("No task found");
    }

    return reply.code(201).send({ success: "Task Updated Successfully" });
  } catch (error) {
    console.log("Error on updateTask: ", error);
    return reply.code(400).send({ error: "Error on updating task" });
  }
}
