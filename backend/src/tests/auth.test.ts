import { describe, expect, test, it } from "vitest";
import request from "supertest";
import { buildServer } from "../server";

describe("POST /api/auth/login", () => {
  it("Return 404 when no user found", async () => {
    const testserver = buildServer();
    await testserver.ready();
    const res = await request(testserver.server)
      .post("/api/auth/login")
      .send({ email: "kamal@example.co", password: "123456789" });
    expect(res.statusCode).toBe(404);
  });
  it("Return 200 when user found and set auth cookie", async () => {
    const testserver = buildServer();
    await testserver.ready();
    const res = await request(testserver.server)
      .post("/api/auth/login")
      .send({ email: "kamal@p.co", password: "123456789" });
    expect(res.statusCode).toBe(200);
    expect(res.header["set-cookie"][0].startsWith("auth=", 0)).true;
  });
});

