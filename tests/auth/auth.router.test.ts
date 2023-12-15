import { app } from "@/app";
import { makeAuth } from "@/factories/auth.factory";
import { domainErrorHandler, errorHandler } from "@/middleware";
import { AuthRouter } from "@/modules/auth";
import supertest from "supertest";

let api: supertest.SuperTest<supertest.Test>;

type SutTypes = {
  sut: AuthRouter;
};

const makeSut = (): SutTypes => {
  const { authRouter: sut } = makeAuth();
  return { sut };
};

const registerRequest = {
  name: "John Doe",
  email: "john.doe@gmail.com",
  password: "password",
};

const response = {
  token: expect.any(String),
};

describe("AuthRouter", () => {
  beforeAll(() => {
    const { sut } = makeSut();
    sut.setup(app);
    app.use(domainErrorHandler);
    app.use(errorHandler);
    api = supertest(app);
  });

  describe("POST /api/auth/register", () => {
    it("Should return a 201 status with a token if request is valid", async () => {
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
  });
});
