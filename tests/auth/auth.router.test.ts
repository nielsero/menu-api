import { app } from "@/app";
import { domainErrorHandler, errorHandler } from "@/middleware";
import { buyAuthRouter } from "@/modules/auth/store";
import { buyUserRepository } from "@/modules/user/store";
import supertest from "supertest";

let api: supertest.SuperTest<supertest.Test>;
const sut = buyAuthRouter();
const userRepository = buyUserRepository();

const registerRequest = {
  name: "John Doe",
  email: "john.doe@gmail.com",
  password: "password",
};

const loginRequest = {
  email: "john.doe@gmail.com",
  password: "password",
};

const response = {
  token: expect.any(String),
};

describe("AuthRouter", () => {
  beforeAll(() => {
    sut.setup(app);
    app.use(domainErrorHandler);
    app.use(errorHandler);
    api = supertest(app);
  });

  afterAll(async () => {
    await userRepository.clear();
  });

  describe("POST /api/auth/register", () => {
    it("Should return a 201 status code with a token if request is valid", async () => {
      const { status, body } = await api.post("/api/auth/register").send(registerRequest);
      expect(status).toBe(201);
      expect(body).toEqual(response);
    });

    it("Should return a 400 status code if request is missing name", async () => {
      const missingNameRequest = {
        email: "john.doe@gmail.com",
        password: "password",
      };
      const { status } = await api.post("/api/auth/register").send(missingNameRequest);
      expect(status).toBe(400);
    });

    it("Should return a 400 status code if request is missing email", async () => {
      const missingEmailRequest = {
        name: "John Doe",
        password: "password",
      };
      const { status } = await api.post("/api/auth/register").send(missingEmailRequest);
      expect(status).toBe(400);
    });

    it("Should return a 400 status code if request is missing password", async () => {
      const missingPasswordRequest = {
        name: "John Doe",
        email: "john.doe@gmail.com",
      };
      const { status } = await api.post("/api/auth/register").send(missingPasswordRequest);
      expect(status).toBe(400);
    });

    it("Should return a 400 status code if name is invalid", async () => {
      const invalidNameRequest = {
        name: "Jo",
        email: "john.doe@gmail.com",
        password: "password",
      };
      const { status } = await api.post("/api/auth/register").send(invalidNameRequest);
      expect(status).toBe(400);
    });

    it("Should return a 400 status code if email is invalid", async () => {
      const invalidEmailRequest = {
        name: "John Doe",
        email: "john.doe",
        password: "password",
      };
      const { status } = await api.post("/api/auth/register").send(invalidEmailRequest);
      expect(status).toBe(400);
    });

    it("Should return a 400 status code if password is invalid", async () => {
      const invalidPasswordRequest = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        password: "pass",
      };
      const { status } = await api.post("/api/auth/register").send(invalidPasswordRequest);
      expect(status).toBe(400);
    });

    it("Should return a 409 status code if user already exists", async () => {
      const { status } = await api.post("/api/auth/register").send(registerRequest);
      expect(status).toBe(409);
    });
  });

  describe("POST /api/auth/login", () => {
    it("Should return a 200 status code with token if request is valid", async () => {
      const { status, body } = await api.post("/api/auth/login").send(loginRequest);
      expect(status).toBe(200);
      expect(body).toEqual(response);
    });

    it("Should return a 400 status code if request is missing an email", async () => {
      const missingEmailRequest = {
        password: "password",
      };
      const { status } = await api.post("/api/auth/login").send(missingEmailRequest);
      expect(status).toBe(400);
    });

    it("Should return a 400 status code if request is missing a password", async () => {
      const missingPasswordRequest = {
        email: "john.doe@gmail.com",
      };
      const { status } = await api.post("/api/auth/login").send(missingPasswordRequest);
      expect(status).toBe(400);
    });

    it("Should return a 400 status code if email is not valid", async () => {
      const invalidEmailRequest = {
        email: "john.doe",
        password: "password",
      };
      const { status } = await api.post("/api/auth/login").send(invalidEmailRequest);
      expect(status).toBe(400);
    });

    it("Should return a 401 status code if user does not exist", async () => {
      const notRegisteredRequest = {
        email: "not-registered@gmail.com",
        password: "password",
      };
      const { status } = await api.post("/api/auth/login").send(notRegisteredRequest);
      expect(status).toBe(401);
    });

    it("Should return a 401 status code if password is incorrect", async () => {
      const incorrectPasswordRequest = {
        email: "john.doe@gmail.com",
        password: "not-password",
      };
      const { status } = await api.post("/api/auth/login").send(incorrectPasswordRequest);
      expect(status).toBe(401);
    });
  });
});
