import { FastifyInstance } from "fastify";
import { getTask, postTask, updateTaskAsCompleted } from "../controllers/task";




export async function taskRoutes(route: FastifyInstance) {
    route.addSchema({
        $id:"createTaskSchema",
        type:"object",
        required:["title","description"],
        properties:{
            title:{type:"string"},
            description:{type:"string"}
        }
    })
    route.get("/", getTask);
    route.post("/", {
        schema:{
            body:{
                $ref:"createTaskSchema#"
            }
        },
        handler: postTask
    });
    route.put("/:id", updateTaskAsCompleted);
  }