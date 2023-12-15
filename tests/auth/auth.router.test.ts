import { app } from "@/app";
import { makeAuth } from "@/factories/auth.factory";
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
    api = supertest(app);
  });

  describe("POST /api/auth/register", () => {
    it("Should return a 201 status with a token if request is valid", async () => {
      const { status, body } = await api.post("/api/auth/register").send(registerRequest);
      expect(status).toBe(201);
      expect(body).toEqual(response);
    });
  });
});
