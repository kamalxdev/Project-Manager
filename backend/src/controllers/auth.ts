import { FastifyRequest } from "fastify";

const users = [
  {
    name: "Kamal Singh",
    email: "kamal@p.co",
    password: "123456789",
  },
  {
    name: "Amit Trivedi",
    email: "amit@p.co",
    password: "123456789",
  },
];

export async function postLogin(
  request: FastifyRequest<{ Body: { email: string; password: string } }>,
  reply: any 
) {
  try {
    const { email, password } = request.body;
    const isUser = users.filter(
      (u) => u?.email == email && u?.password == password
    );
    
    if (isUser.length <= 0) {
      return reply.status(404).send("user not found");
    }
    const token= await reply.jwtSign({
      email: isUser[0]?.email,
      name: isUser[0]?.name,
    });
    reply
    .setCookie('auth', token, {
      path: '/',
      httpOnly: true,
      sameSite: true,
      expires:false
    })
    return reply.code(200).send("User logged in")
    
  } catch (error) {
    console.log("Error on postLogin: ", error);
    return reply.status(500).send("Error on logging user");

  }
}



