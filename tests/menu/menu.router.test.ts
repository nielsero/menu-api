import { app } from "@/app";
import { makeAuth, makeMenu } from "@/factories";
import { domainErrorHandler, errorHandler } from "@/middleware";
import { TokenProvider } from "@/modules/auth/protocols";
import { MenuRouter } from "@/modules/menu";
import { User } from "@/modules/user";
import { UserRepository } from "@/modules/user/protocols";
import supertest from "supertest";

let api: supertest.SuperTest<supertest.Test>;
let userRepository: UserRepository;
let tokenProvider: TokenProvider;

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
  userId: user.id,
};

describe("MenuRouter", () => {
  beforeAll(() => {
    const { sut, userRepository: repository, tokenProvider: provider } = makeSut();
    sut.setup(app);
    app.use(domainErrorHandler);
    app.use(errorHandler);
    api = supertest(app);
    userRepository = repository;
    tokenProvider = provider;
  });

  afterAll(async () => {
    const { userRepository } = makeSut();
    await userRepository.clear();
  });

  describe("POST /api/menu", () => {
    it("Should return a 201 status code if user is authorized", async () => {
      await userRepository.add(user);
      const token = await tokenProvider.generate(user.email);
      const { status } = await api.post("/api/menu").set("Authorization", `Bearer ${token}`).send(request);
      expect(status).toBe(201);
    });
  });
});
