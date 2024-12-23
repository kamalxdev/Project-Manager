import { describe, expect, it } from "vitest";
import request from "supertest";
import { buildServer } from "../server";

describe("GET /api/user", () => {
    it("Return 200 with user information when user is valid", async () => {
      const testserver = buildServer();
      await testserver.ready();
      const loginRes = await request(testserver.server)
        .post("/api/auth/login")
        .send({ email: "kamal@p.co", password: "123456789" });
      const authCookie = loginRes.header["set-cookie"][0];
      const getUser = await request(testserver.server)
        .get("/api/user").set("Cookie",[authCookie])
      expect(loginRes.statusCode).toBe(200);
      expect(getUser.statusCode).toBe(200);
      expect(getUser.body.user.email).equal("kamal@p.co")
    });
  
    it("Return 401 when user is invalid", async () => {
      const testserver = buildServer();
      await testserver.ready();
      const getUser = await request(testserver.server)
        .get("/api/user")
      expect(getUser.statusCode).toBe(401);
    });
  });