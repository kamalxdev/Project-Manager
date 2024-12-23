import { FastifyReply, FastifyRequest } from "fastify";

export async function getUser(
    request: FastifyRequest<{ Body: { email: string; password: string } }>,
    reply: FastifyReply
  ) {
    try {
      const decoded = await request.jwtDecode()
      return reply.send({user:decoded})
    } catch (error) {
      console.log("Error on getUser: ", error);
      return reply.status(500).send("Error on getting user");
  
    }
  }
