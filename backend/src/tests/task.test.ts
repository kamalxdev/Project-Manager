import { describe, expect, it, vi } from "vitest";
import request from "supertest";
import { buildServer } from "../server";
import { db } from "../drizzle/__mocks__/db";
import { TaskTable } from "../drizzle/schema";

vi.mock("../drizzle/db");

describe("GET /api/task", () => {
  it("Return 200 with all task when user is logged in", async () => {
    const testserver = buildServer();
    await testserver.ready();
    const loginRes = await request(testserver.server)
      .post("/api/auth/login")
      .send({ email: "kamal@p.co", password: "123456789" });
    const authCookie = loginRes.header["set-cookie"][0];
    const getTask = await request(testserver.server)
      .get("/api/task")
      .set("Cookie", [authCookie]);
    expect(loginRes.statusCode).toBe(200);
    expect(getTask.statusCode).toBe(200);
  });

  it("Return 401 when user is not logged in", async () => {
    const testserver = buildServer();
    await testserver.ready();

    const getTask = await request(testserver.server).get("/api/task");
    expect(getTask.statusCode).toBe(401);
  });
});

describe("POST /api/task", () => {
  it("Return 200 with post ID when user is logged in", async () => {
    const testserver = buildServer();
    await testserver.ready();
    const loginRes = await request(testserver.server)
      .post("/api/auth/login")
      .send({ email: "kamal@p.co", password: "123456789" });

    db.insert.mockReturnValue({
      values: vi.fn().mockReturnValue({
        returning: vi.fn().mockResolvedValue([
          {
            id: 1,
          },
        ]),
      }),
    } as any);

    const authCookie = loginRes.header["set-cookie"][0];
    const postTask = await request(testserver.server)
      .post("/api/task")
      .set("Cookie", [authCookie])
      .send({ title: "title", description: "description" });

    expect(loginRes.statusCode).toBe(200);
    expect(postTask.statusCode).toBe(201);
    expect(postTask.body.id).equal(1);
  });

  it("Return 400 when no input provided", async () => {
    const testserver = buildServer();
    await testserver.ready();
    const loginRes = await request(testserver.server)
      .post("/api/auth/login")
      .send({ email: "kamal@p.co", password: "123456789" });

    db.insert.mockReturnValue({
      values: vi.fn().mockReturnValue({
        returning: vi.fn().mockResolvedValue([
          {
            id: 1,
          },
        ]),
      }),
    } as any);

    const authCookie = loginRes.header["set-cookie"][0];
    const postTask = await request(testserver.server)
      .post("/api/task")
      .set("Cookie", [authCookie])
      .send();

    expect(loginRes.statusCode).toBe(200);
    expect(postTask.statusCode).toBe(400);
  });

  it("Return 401 when user is not logged in", async () => {
    const testserver = buildServer();
    await testserver.ready();
    const postTask = await request(testserver.server).post("/api/task");
    expect(postTask.statusCode).toBe(401);
  });
});


describe("PUT /api/task/:id", () => {

  it("Return 201 when task is updated", async () => {
    const testserver = buildServer();
    await testserver.ready();
    const loginRes = await request(testserver.server)
      .post("/api/auth/login")
      .send({ email: "kamal@p.co", password: "123456789" });

      db.update.mockReturnValue({
        set: vi.fn().mockReturnValue({
          where:vi.fn().mockReturnValue({
            returning: vi.fn().mockResolvedValue([
              {
                id: 1,
              },
            ]),
          })
        }),
      } as any);

    const authCookie = loginRes.header["set-cookie"][0];
    const postTask = await request(testserver.server)
      .put("/api/task/id").set("Cookie",[authCookie])
      
    expect(loginRes.statusCode).toBe(200);
    expect(postTask.statusCode).toBe(201);
  });

  it("Return 401 when user is not logged in", async () => {
      const testserver = buildServer();
      await testserver.ready();
      const postTask = await request(testserver.server)
        .put("/api/task/id")
      expect(postTask.statusCode).toBe(401);
    });
});