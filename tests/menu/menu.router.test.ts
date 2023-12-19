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

const anotherUser = new User({
  name: "Jane Doe",
  email: "jane.doe@gmail.com",
  password: "hashed-password",
});

const menu = new Menu({
  name: "Old Menu",
  description: "Old Menu description",
  userId: user.id,
});

const publishedMenu = new Menu({
  name: "Published Menu",
  description: "Published Menu description",
  published: true,
  userId: user.id,
});

const publishedMenu2 = new Menu({
  name: "Published Menu 2",
  description: "Published Menu 2 description",
  published: true,
  userId: anotherUser.id,
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
    await userRepository.add(anotherUser);
  });

  afterEach(async () => {
    await menuRepository.clear();
  });

  afterAll(async () => {
    await userRepository.clear();
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

    it("Should return a 401 status code if user does not exist", async () => {
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
      const newMenu = new Menu({
        name: createMenuRequest.name,
        description: createMenuRequest.description,
        userId: user.id,
      });
      await menuRepository.add(newMenu);
      const token = await tokenProvider.generate(user.email);
      const { status } = await api
        .post("/api/menus")
        .set("Authorization", `Bearer ${token}`)
        .send(createMenuRequest);
      expect(status).toBe(409);
    });
  });

  describe("PATCH /api/menus/:id", () => {
    beforeEach(async () => {
      await menuRepository.add(menu);
    });

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

    it("Should return a 400 status code if request name is invalid", async () => {
      const token = await tokenProvider.generate(user.email);
      const nameTooShortRequest = {
        id: menu.id,
        name: "Me",
        description: "Update Menu description",
      };
      const { status } = await api
        .patch(`/api/menus/${menu.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send(nameTooShortRequest);
      expect(status).toBe(400);
    });

    it("Should return a 409 status code if request name was already taken by user", async () => {
      const newMenu = new Menu({
        name: createMenuRequest.name,
        description: createMenuRequest.description,
        userId: user.id,
      });
      await menuRepository.add(newMenu);
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
  });

  describe("DELETE /api/menus/:id", () => {
    beforeEach(async () => {
      await menuRepository.add(menu);
    });

    it("Should return a 204 status code if user is authorized to delete", async () => {
      const token = await tokenProvider.generate(user.email);
      const { status } = await api.delete(`/api/menus/${menu.id}`).set("Authorization", `Bearer ${token}`);
      expect(status).toBe(204);
    });

    it("Should return a 401 status code if authorization token is not given", async () => {
      const { status } = await api.delete(`/api/menus/${menu.id}`);
      expect(status).toBe(401);
    });

    it("Should return a 401 status code if user does not exist", async () => {
      const token = await tokenProvider.generate("wrong-email@gmail.com");
      const { status } = await api.delete(`/api/menus/${menu.id}`).set("Authorization", `Bearer ${token}`);
      expect(status).toBe(401);
    });

    it("Should return a 404 status code if menu was not found", async () => {
      const token = await tokenProvider.generate(user.email);
      const { status } = await api
        .delete("/api/menus/invalid-menu-id")
        .set("Authorization", `Bearer ${token}`);
      expect(status).toBe(404);
    });

    it("Should return a 404 status code if if user doesn't own that menu", async () => {
      const token = await tokenProvider.generate(anotherUser.email);
      const { status } = await api.delete(`/api/menus/${menu.id}`).set("Authorization", `Bearer ${token}`);
      expect(status).toBe(404);
    });
  });

  describe("GET /api/menus", () => {
    beforeEach(async () => {
      const menu2 = new Menu({
        name: "Menu 2",
        description: "Menu 2 description",
        userId: user.id,
      });
      const menu3 = new Menu({
        name: "Menu 3",
        description: "Menu 3 description",
        userId: user.id,
      });
      await menuRepository.add(menu);
      await menuRepository.add(menu2);
      await menuRepository.add(menu3);
    });

    it("Should return a 200 status code with all user menus if user is authorized", async () => {
      const token = await tokenProvider.generate(user.email);
      const { status, body } = await api.get("/api/menus").set("Authorization", `Bearer ${token}`);
      expect(status).toBe(200);
      expect(body.length).toBe(3);
    });

    it("Should return a 200 status code with empty list if user doesn't have any menus", async () => {
      const token = await tokenProvider.generate(anotherUser.email);
      const { status, body } = await api.get("/api/menus").set("Authorization", `Bearer ${token}`);
      expect(status).toBe(200);
      expect(body.length).toBe(0);
    });

    it("Should return a 401 status code if authorization token is not given", async () => {
      const { status } = await api.get("/api/menus");
      expect(status).toBe(401);
    });

    it("Should return a 401 status code if user is not authorized", async () => {
      const token = await tokenProvider.generate("wrong-email@gmail.com");
      const { status } = await api.get("/api/menus").set("Authorization", `Bearer ${token}`);
      expect(status).toBe(401);
    });
  });

  describe("POST /api/menus/:id/publish", () => {
    beforeEach(async () => {
      await menuRepository.add(menu);
    });

    it("Should return a 200 status code with published menu if user is authorized", async () => {
      const token = await tokenProvider.generate(user.email);
      const { status, body } = await api
        .post(`/api/menus/${menu.id}/publish`)
        .set("Authorization", `Bearer ${token}`);
      const expectedResponse = {
        id: menu.id,
        name: menu.name,
        description: menu.description,
        published: true,
        userId: user.id,
      };
      expect(status).toBe(200);
      expect(body).toEqual(expectedResponse);
    });

    it("Should return a 401 status code if authorization token is not given", async () => {
      const { status } = await api.post(`/api/menus/${menu.id}/publish`);
      expect(status).toBe(401);
    });

    it("Should return a 401 status code if user is not authorized", async () => {
      const token = await tokenProvider.generate("wrong-email@gmail.com");
      const { status } = await api
        .post(`/api/menus/${menu.id}/publish`)
        .set("Authorization", `Bearer ${token}`);
      expect(status).toBe(401);
    });

    it("Should return a 404 status code if menu was not found", async () => {
      const token = await tokenProvider.generate(user.email);
      const { status } = await api
        .post("/api/menus/invalid-menu-id/publish")
        .set("Authorization", `Bearer ${token}`);
      expect(status).toBe(404);
    });

    it("Should return a 404 status code if if user doesn't own that menu", async () => {
      const token = await tokenProvider.generate(anotherUser.email);
      const { status } = await api
        .post(`/api/menus/${menu.id}/publish`)
        .set("Authorization", `Bearer ${token}`);
      expect(status).toBe(404);
    });
  });

  describe("POST /api/menus/:id/unpublish", () => {
    beforeEach(async () => {
      await menuRepository.add(publishedMenu);
    });

    it("Should return a 200 status code with unpublished menu if user is authorized", async () => {
      const token = await tokenProvider.generate(user.email);
      const { status, body } = await api
        .post(`/api/menus/${publishedMenu.id}/unpublish`)
        .set("Authorization", `Bearer ${token}`);
      const expectedResponse = {
        id: publishedMenu.id,
        name: publishedMenu.name,
        description: publishedMenu.description,
        published: false,
        userId: user.id,
      };
      expect(status).toBe(200);
      expect(body).toEqual(expectedResponse);
    });

    it("Should return a 401 status code if authorization token is not given", async () => {
      const { status } = await api.post(`/api/menus/${publishedMenu.id}/unpublish`);
      expect(status).toBe(401);
    });

    it("Should return a 401 status code if user is not authorized", async () => {
      const token = await tokenProvider.generate("wrong-email@gmail.com");
      const { status } = await api
        .post(`/api/menus/${publishedMenu.id}/unpublish`)
        .set("Authorization", `Bearer ${token}`);
      expect(status).toBe(401);
    });

    it("Should return a 404 status code if menu was not found", async () => {
      const token = await tokenProvider.generate(user.email);
      const { status } = await api
        .post("/api/menus/invalid-menu-id/unpublish")
        .set("Authorization", `Bearer ${token}`);
      expect(status).toBe(404);
    });

    it("Should return a 404 status code if if user doesn't own that menu", async () => {
      const token = await tokenProvider.generate(anotherUser.email);
      const { status } = await api
        .post(`/api/menus/${publishedMenu.id}/unpublish`)
        .set("Authorization", `Bearer ${token}`);
      expect(status).toBe(404);
    });
  });

  describe("GET /api/menus/published", () => {
    beforeEach(async () => {
      await menuRepository.add(menu);
      await menuRepository.add(publishedMenu);
      await menuRepository.add(publishedMenu2);
    });

    it("Should return a 200 status code with all published menus", async () => {
      const { status, body } = await api.get("/api/menus/published");
      expect(status).toBe(200);
      expect(body.length).toBe(2);
    });

    it("Should return a 200 with empty list if there are no published menus", async () => {
      await menuRepository.clear();
      const { status, body } = await api.get("/api/menus/published");
      expect(status).toBe(200);
      expect(body.length).toBe(0);
    });
  });
});
