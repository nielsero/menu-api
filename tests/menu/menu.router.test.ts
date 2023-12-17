import { app } from "@/app";
import { makeAuth, makeMenu } from "@/factories";
import { domainErrorHandler, errorHandler } from "@/middleware";
import { TokenProvider } from "@/modules/auth/protocols";
import { MenuRouter } from "@/modules/menu";
import { User } from "@/modules/user";
import { UserRepository } from "@/modules/user/protocols";
import supertest from "supertest";

let api: supertest.SuperTest<supertest.Test>;

type SutTypes = {
  sut: MenuRouter;
  userRepository: UserRepository;
  tokenProvider: TokenProvider;
};

const makeSut = (): SutTypes => {
  const { tokenProvider } = makeAuth();
  const { menuRouter: sut, userRepository } = makeMenu();
  return { sut, userRepository, tokenProvider };
};

const user = new User({
  name: "John Doe",
  email: "john.doe@gmail.com",
  password: "hashed-password",
});

const request = {
  name: "Menu 1",
  description: "Menu 1 description",
};

describe("MenuRouter", () => {
  beforeAll(async () => {
    const { sut, userRepository } = makeSut();
    sut.setup(app);
    app.use(domainErrorHandler);
    app.use(errorHandler);
    api = supertest(app);
    await userRepository.add(user);
  });

  afterAll(async () => {
    const { userRepository } = makeSut();
    await userRepository.clear();
  });

  describe("POST /api/menu", () => {
    it("Should return a 201 status code if user is authorized", async () => {
      const { tokenProvider } = makeAuth();
      const token = await tokenProvider.generate(user.email);
      const { status } = await api.post("/api/menu").set("Authorization", `Bearer ${token}`).send(request);
      expect(status).toBe(201);
    });

    it("Should return a 401 status code if authorization token is not given", async () => {
      const { status } = await api.post("/api/menu").send(request);
      expect(status).toBe(401);
    });

    it("Should return a 401 status code if user is not authorized", async () => {
      const { tokenProvider } = makeAuth();
      const token = await tokenProvider.generate("wrong-email@gmail.com");
      const { status } = await api.post("/api/menu").set("Authorization", `Bearer ${token}`).send(request);
      expect(status).toBe(401);
    });

    it("Should return a 400 status code if request is missing a name", async () => {
      const { tokenProvider } = makeAuth();
      const token = await tokenProvider.generate(user.email);
      const missingNameRequest = {
        description: "Menu 1 description",
      };
      const { status } = await api
        .post("/api/menu")
        .set("Authorization", `Bearer ${token}`)
        .send(missingNameRequest);
      expect(status).toBe(400);
    });

    it("Should return a 400 status code if request name is invalid", async () => {
      const { tokenProvider } = makeAuth();
      const token = await tokenProvider.generate(user.email);
      const nameTooShortRequest = {
        name: "",
        description: "Menu 1 description",
      };
      const { status } = await api
        .post("/api/menu")
        .set("Authorization", `Bearer ${token}`)
        .send(nameTooShortRequest);
      expect(status).toBe(400);
    });

    it("Should return a 409 status code if request name was already taken by user", async () => {
      const { tokenProvider } = makeAuth();
      const token = await tokenProvider.generate(user.email);
      const { status } = await api.post("/api/menu").set("Authorization", `Bearer ${token}`).send(request);
      expect(status).toBe(409);
    });
  });
});
