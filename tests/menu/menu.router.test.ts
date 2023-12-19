import { app } from "@/app";
import { domainErrorHandler, errorHandler } from "@/middleware";
import { Menu } from "@/modules/menu";
import { User } from "@/modules/user";
import { buyAuthProviders } from "@/store/auth";
import { buyMenuRepository, buyMenuRouter } from "@/store/menu";
import { buyUserRepository } from "@/store/user";
import supertest from "supertest";

let api: supertest.SuperTest<supertest.Test>;
const sut = buyMenuRouter();
const userRepository = buyUserRepository();
const menuRepository = buyMenuRepository();
const { tokenProvider } = buyAuthProviders();

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
    sut.setup(app);
    app.use(domainErrorHandler);
    app.use(errorHandler);
    api = supertest(app);
    await userRepository.add(user);
    await menuRepository.add(menu);
  });

  afterAll(async () => {
    await userRepository.clear();
    await menuRepository.clear();
  });

  describe("POST /api/menus", () => {
    it("Should return a 201 status code with created menu if user is authorized", async () => {
      const token = await tokenProvider.generate(user.email);
      const { status, body } = await api
        .post("/api/menus")
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
      const { status } = await api.post("/api/menus").send(createMenuRequest);
      expect(status).toBe(401);
    });

    it("Should return a 401 status code if user is not authorized", async () => {
      const token = await tokenProvider.generate("wrong-email@gmail.com");
      const { status } = await api
        .post("/api/menus")
        .set("Authorization", `Bearer ${token}`)
        .send(createMenuRequest);
      expect(status).toBe(401);
    });

    it("Should return a 400 status code if request is missing a name", async () => {
      const token = await tokenProvider.generate(user.email);
      const missingNameRequest = {
        description: "Menu 1 description",
      };
      const { status } = await api
        .post("/api/menus")
        .set("Authorization", `Bearer ${token}`)
        .send(missingNameRequest);
      expect(status).toBe(400);
    });

    it("Should return a 400 status code if request name is invalid", async () => {
      const token = await tokenProvider.generate(user.email);
      const nameTooShortRequest = {
        name: "Me",
        description: "Menu 1 description",
      };
      const { status } = await api
        .post("/api/menus")
        .set("Authorization", `Bearer ${token}`)
        .send(nameTooShortRequest);
      expect(status).toBe(400);
    });

    it("Should return a 409 status code if request name was already taken by user", async () => {
      const token = await tokenProvider.generate(user.email);
      const { status } = await api
        .post("/api/menus")
        .set("Authorization", `Bearer ${token}`)
        .send(createMenuRequest);
      expect(status).toBe(409);
    });
  });

  describe("PATCH /api/menus/:id", () => {
    it("Should return a 200 status code with updated menu if user is authorized", async () => {
      const token = await tokenProvider.generate(user.email);
      const { status, body } = await api
        .patch(`/api/menus/${menu.id}`)
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
      const { status } = await api.patch(`/api/menus/${menu.id}`).send(editMenuRequest);
      expect(status).toBe(401);
    });

    it("Should return a 401 status code if user is not authorized", async () => {
      const token = await tokenProvider.generate("wrong-user@gmail.com");
      const { status } = await api
        .patch(`/api/menus/${menu.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send(editMenuRequest);
      expect(status).toBe(401);
    });

    it("Should return a 404 status code if menu was not found", async () => {
      const token = await tokenProvider.generate(user.email);
      const { status } = await api
        .patch("/api/menus/invalid-menu-id")
        .set("Authorization", `Bearer ${token}`)
        .send(editMenuRequest);
      expect(status).toBe(404);
    });

    it("Should return a 409 status code if request name was already taken by user", async () => {
      const token = await tokenProvider.generate(user.email);
      const nameAlreadyTakenRequest = {
        id: menu.id,
        name: createMenuRequest.name,
      };
      const { status } = await api
        .patch(`/api/menus/${menu.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send(nameAlreadyTakenRequest);
      expect(status).toBe(409);
    });

    it("Should return a 400 status code if request name is invalid", async () => {
      const token = await tokenProvider.generate(user.email);
      const nameTooShortRequest = {
        id: menu.id,
        name: "Me",
      };
      const { status } = await api
        .patch(`/api/menus/${menu.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send(nameTooShortRequest);
      expect(status).toBe(400);
    });
  });

  describe("DELETE /api/menus/:id", () => {
    it("Should return a 401 status code if authorization token is not given", async () => {
      const { status } = await api.delete(`/api/menus/${menu.id}`);
      expect(status).toBe(401);
    });

    it("Should return a 404 status code if menu was not found", async () => {
      const token = await tokenProvider.generate(user.email);
      const { status } = await api
        .delete("/api/menus/invalid-menu-id")
        .set("Authorization", `Bearer ${token}`);
      expect(status).toBe(404);
    });

    it("Should return a 404 status code if menu doesn't belong to user", async () => {
      const anotherUser = new User({
        name: "Jane Doe",
        email: "jane.doe@gmail.com",
        password: "hashed-password",
      });
      await userRepository.add(anotherUser);
      const token = await tokenProvider.generate(anotherUser.email);
      const { status } = await api.delete(`/api/menus/${menu.id}`).set("Authorization", `Bearer ${token}`);
      expect(status).toBe(404);
    });

    it("Should return a 204 status code if user is authorized to delete", async () => {
      const token = await tokenProvider.generate(user.email);
      const { status } = await api.delete(`/api/menus/${menu.id}`).set("Authorization", `Bearer ${token}`);
      expect(status).toBe(204);
    });
  });
});
