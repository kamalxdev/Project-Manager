import { FastifyInstance } from "fastify";
import { getUser } from "../controllers/user";




export async function userRoutes(route: FastifyInstance) {
    route.addHook('onRequest', (request) => request.jwtVerify())
   
    route.get("/", getUser);

  }