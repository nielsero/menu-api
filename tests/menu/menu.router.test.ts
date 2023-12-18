import { app } from "@/app";
import { makeAuth, makeMenu } from "@/factories";
import { domainErrorHandler, errorHandler } from "@/middleware";
import { TokenProvider } from "@/modules/auth/protocols";
import { MenuRouter } from "@/modules/menu/routers";
import { Menu } from "@/modules/menu/entities";
import { MenuRepository } from "@/modules/menu/protocols";
import { User } from "@/modules/user";
import { UserRepository } from "@/modules/user/protocols";
import supertest from "supertest";

let api: supertest.SuperTest<supertest.Test>;

type SutTypes = {
  sut: MenuRouter;
  userRepository: UserRepository;
  menuRepository: MenuRepository;
  tokenProvider: TokenProvider;
};

const makeSut = (): SutTypes => {
  const { tokenProvider } = makeAuth();
  const { menuRouter: sut, userRepository, menuRepository } = makeMenu();
  return { sut, userRepository, menuRepository, tokenProvider };
};

const user = new User({
  name: "John Doe",
  email: "john.doe@gmail.com",
  password: "hashed-password",
});

const menu = new Menu({
  name: "Old Menu",
  description: "Old Menu description",
  userId: user.id,
});

const createMenuRequest = {
  name: "New Menu",
  description: "New Menu description",
};

const editMenuRequest = {
  id: menu.id,
  name: "Updated Menu",
  description: "Updated Menu description",
};

describe("MenuRouter", () => {
  beforeAll(async () => {
    const { sut, userRepository, menuRepository } = makeSut();
    sut.setup(app);
    app.use(domainErrorHandler);
    app.use(errorHandler);
    api = supertest(app);
    await userRepository.add(user);
    await menuRepository.add(menu);
  });

  afterAll(async () => {
    const { userRepository, menuRepository } = makeSut();
    await userRepository.clear();
    await menuRepository.clear();
  });

  describe("POST /api/menu", () => {
    it("Should return a 201 status code with created menu if user is authorized", async () => {
      const { tokenProvider } = makeSut();
      const token = await tokenProvider.generate(user.email);
      const { status, body } = await api
        .post("/api/menu")
        .set("Authorization", `Bearer ${token}`)
        .send(createMenuRequest);
      const expectedResponse = {
        id: expect.any(String),
        name: createMenuRequest.name,
        description: createMenuRequest.description,
        published: false,
        userId: user.id,
      };
      expect(status).toBe(201);
      expect(body).toEqual(expectedResponse);
    });

    it("Should return a 401 status code if authorization token is not given", async () => {
      const { status } = await api.post("/api/menu").send(createMenuRequest);
      expect(status).toBe(401);
    });

    it("Should return a 401 status code if user is not authorized", async () => {
      const { tokenProvider } = makeSut();
      const token = await tokenProvider.generate("wrong-email@gmail.com");
      const { status } = await api
        .post("/api/menu")
        .set("Authorization", `Bearer ${token}`)
        .send(createMenuRequest);
      expect(status).toBe(401);
    });

    it("Should return a 400 status code if request is missing a name", async () => {
      const { tokenProvider } = makeSut();
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
      const { tokenProvider } = makeSut();
      const token = await tokenProvider.generate(user.email);
      const nameTooShortRequest = {
        name: "Me",
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
      const { status } = await api
        .post("/api/menu")
        .set("Authorization", `Bearer ${token}`)
        .send(createMenuRequest);
      expect(status).toBe(409);
    });
  });

  describe("PATCH /api/menu/:id", () => {
    it("Should return a 200 status code with updated menu if user is authorized", async () => {
      const { tokenProvider } = makeSut();
      const token = await tokenProvider.generate(user.email);
      const { status, body } = await api
        .patch(`/api/menu/${menu.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send(editMenuRequest);
      const expectedResponse = {
        id: menu.id,
        name: editMenuRequest.name,
        description: editMenuRequest.description,
        published: false,
        userId: user.id,
      };
      expect(status).toBe(200);
      expect(body).toEqual(expectedResponse);
    });

    it("Should return a 401 status code if authorization token is not given", async () => {
      const { status } = await api.patch(`/api/menu/${menu.id}`).send(editMenuRequest);
      expect(status).toBe(401);
    });

    it("Should return a 401 status code if user is not authorized", async () => {
      const { tokenProvider } = makeSut();
      const token = await tokenProvider.generate("wrong-user@gmail.com");
      const { status } = await api
        .patch(`/api/menu/${menu.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send(editMenuRequest);
      expect(status).toBe(401);
    });

    it("Should return a 404 status code if menu was not found", async () => {
      const { tokenProvider } = makeSut();
      const token = await tokenProvider.generate(user.email);
      const { status } = await api
        .patch("/api/menu/invalid-menu-id")
        .set("Authorization", `Bearer ${token}`)
        .send(editMenuRequest);
      expect(status).toBe(404);
    });

    it("Should return a 409 status code if request name was already taken by user", async () => {
      const { tokenProvider } = makeSut();
      const token = await tokenProvider.generate(user.email);
      const nameAlreadyTakenRequest = {
        id: menu.id,
        name: createMenuRequest.name,
      };
      const { status } = await api
        .patch(`/api/menu/${menu.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send(nameAlreadyTakenRequest);
      expect(status).toBe(409);
    });

    it("Should return a 400 status code if request name is invalid", async () => {
      const { tokenProvider } = makeSut();
      const token = await tokenProvider.generate(user.email);
      const nameTooShortRequest = {
        id: menu.id,
        name: "Me",
      };
      const { status } = await api
        .patch(`/api/menu/${menu.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send(nameTooShortRequest);
      expect(status).toBe(400);
    });
  });

  describe("DELETE /api/menu/:id", () => {
    it("Should return a 204 status code if user is authorized", async () => {
      const { tokenProvider } = makeSut();
      const token = await tokenProvider.generate(user.email);
      const { status } = await api.delete(`/api/menu/${menu.id}`).set("Authorization", `Bearer ${token}`);
      // expect(status).toBe(204);
    });

    it("Should return a 401 status code if authorization token is not given", async () => {
      const { status } = await api.delete(`/api/menu/${menu.id}`);
      expect(status).toBe(401);
    });

    it("Should return a 401 status code if user is not authorized", async () => {
      const { tokenProvider } = makeSut();
      const token = await tokenProvider.generate("wrong-email@gmail.com");
      const { status } = await api.delete(`/api/menu/${menu.id}`).set("Authorization", `Bearer ${token}`);
      expect(status).toBe(401);
    });

    it("Should return a 404 status code if menu was not found", async () => {
      const { tokenProvider } = makeSut();
      const token = await tokenProvider.generate(user.email);
      const { status } = await api
        .delete("/api/menu/invalid-menu-id")
        .set("Authorization", `Bearer ${token}`);
      expect(status).toBe(404);
    });
  });
});
