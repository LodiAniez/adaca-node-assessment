import request from "supertest";
import app from "../app";
import { User } from "../models/user.model";

let server: any;

beforeAll((done) => {
  server = app.listen(8000, done);
});

afterAll(() => {
  server.close();
});

jest.mock("../models/user.model");

describe("POST /api/users", () => {
  it("should create a user successfully (mocked database)", async () => {
    const mockSave = jest.fn().mockResolvedValue({
      _id: "12345",
      name: "John Doe",
      email: "john.doe@example.com",
      age: 30,
    });

    (User.prototype.save as jest.Mock) = mockSave;

    const res = await request(server)
      .post("/api/users")
      .set("Authorization", "Bearer valid-token")
      .send({ name: "John Doe", email: "john.doe@example.com", age: 30 });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("User created successfully");
    expect(res.body.user).toHaveProperty("name", "John Doe");
    expect(res.body.user).toHaveProperty("email", "john.doe@example.com");
    expect(res.body.user).toHaveProperty("age", 30);
    expect(res.body.user).toHaveProperty("_id", "12345");

    expect(mockSave).toHaveBeenCalledTimes(1);
  });

  it("should return 400 for invalid input", async () => {
    const res = await request(server)
      .post("/api/users")
      .set("Authorization", "Bearer valid-token")
      .send({ name: "J", email: "invalid-email", age: -5 });

    expect(res.status).toBe(400);
  });

  it("should return 401 if no token is provided", async () => {
    const res = await request(server)
      .post("/api/users")
      .send({ name: "John Doe", email: "john.doe@example.com", age: 30 });

    expect(res.status).toBe(401);
  });

  it("should return 403 for invalid token", async () => {
    const res = await request(server)
      .post("/api/users")
      .set("Authorization", "Bearer invalid-token")
      .send({ name: "John Doe", email: "john.doe@example.com", age: 30 });

    expect(res.status).toBe(403);
  });
});
