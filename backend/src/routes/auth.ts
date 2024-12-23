import { FastifyInstance } from "fastify";
import {  postLogin } from "../controllers/auth";




export async function authRoutes(route: FastifyInstance) {
    route.addSchema({
        $id:"createUserLoginSchema",
        type:"object",
        required:["email","password"],
        properties:{
            email:{type:"string"},
            password:{type:"string"}
        }
    })
    route.post("/login", {
        schema:{
            body:{
                $ref:"createUserLoginSchema#"
            }
        },
        handler: postLogin,
    });
  }