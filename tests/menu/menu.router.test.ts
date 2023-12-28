import { app } from "@/app";
import { domainErrorHandler } from "@/middleware/domain-error-handler";
import { errorHandler } from "@/middleware/error-handler";
import { Menu } from "@/modules/menu";
import { User } from "@/modules/user";
import { buyTokenProvider } from "@/modules/auth/store";
import { buyMenuRepository, buyMenuRouter } from "@/modules/menu/store";
import { buyUserRepository } from "@/modules/user/store";
import supertest from "supertest";

let api: supertest.SuperTest<supertest.Test>;
const sut = buyMenuRouter();
const userRepository = buyUserRepository();
const menuRepository = buyMenuRepository();
const tokenProvider = buyTokenProvider();

const users = [
  new User({
    name: "John Doe",
    email: "john.doe@gmail.com",
    password: "hashed-password",
  }),
  new User({
    name: "Jane Doe",
    email: "jane.doe@gmail.com",
    password: "hashed-password",
  }),
];

const menus = [
  new Menu({
    name: "Menu 1",
    description: "Menu 1 description",
    userId: users[0].id,
  }),
  new Menu({
    name: "Menu 2",
    description: "Menu 2 description",
    userId: users[0].id,
  }),
  new Menu({
    name: "Menu 3",
    description: "Menu 3 description",
    userId: users[0].id,
  }),
];

const publishedMenus = [
  new Menu({
    name: "Published Menu 1",
    description: "Published Menu 1 description",
    published: true,
    userId: users[0].id,
  }),
  new Menu({
    name: "Published Menu 2",
    description: "Published Menu 2 description",
    published: true,
    userId: users[1].id,
  }),
];

const createMenuRequest = {
  name: "New Menu",
  description: "New Menu description",
};

const editMenuRequest = {
  id: menus[0].id,
  name: "Updated Menu",
  description: "Updated Menu description",
};

describe("MenuRouter", () => {
  beforeAll(async () => {
    sut.setup(app);
    app.use(domainErrorHandler);
    app.use(errorHandler);
    api = supertest(app);
    await userRepository.add(users[0]);
    await userRepository.add(users[1]);
  });

  afterAll(async () => {
    await userRepository.clear();
  });

  afterEach(async () => {
    await menuRepository.clear();
  });

  describe("POST /api/menus", () => {
    it("Should return a 201 status code with created menu if user is authorized", async () => {
      const token = await tokenProvider.generate(users[0].email);
      const { status, body } = await api
        .post("/api/menus")
        .set("Authorization", `Bearer ${token}`)
        .send(createMenuRequest);
      const expectedResponse = {
        id: expect.any(String),
        name: createMenuRequest.name,
        description: createMenuRequest.description,
        published: false,
        userId: users[0].id,
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
      const token = await tokenProvider.generate(users[0].email);
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
      const token = await tokenProvider.generate(users[0].email);
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
        userId: users[0].id,
      });
      await menuRepository.add(newMenu);
      const token = await tokenProvider.generate(users[0].email);
      const { status } = await api
        .post("/api/menus")
        .set("Authorization", `Bearer ${token}`)
        .send(createMenuRequest);
      expect(status).toBe(409);
    });
  });

  describe("PATCH /api/menus/:id", () => {
    beforeEach(async () => {
      await menuRepository.add(menus[0]);
    });

    it("Should return a 200 status code with updated menu if user is authorized", async () => {
      const token = await tokenProvider.generate(users[0].email);
      const { status, body } = await api
        .patch(`/api/menus/${menus[0].id}`)
        .set("Authorization", `Bearer ${token}`)
        .send(editMenuRequest);
      const expectedResponse = {
        id: menus[0].id,
        name: editMenuRequest.name,
        description: editMenuRequest.description,
        published: false,
        userId: users[0].id,
      };
      expect(status).toBe(200);
      expect(body).toEqual(expectedResponse);
    });

    it("Should return a 401 status code if authorization token is not given", async () => {
      const { status } = await api.patch(`/api/menus/${menus[0].id}`).send(editMenuRequest);
      expect(status).toBe(401);
    });

    it("Should return a 401 status code if user is not authorized", async () => {
      const token = await tokenProvider.generate("wrong-user@gmail.com");
      const { status } = await api
        .patch(`/api/menus/${menus[0].id}`)
        .set("Authorization", `Bearer ${token}`)
        .send(editMenuRequest);
      expect(status).toBe(401);
    });

    it("Should return a 404 status code if menu was not found", async () => {
      const token = await tokenProvider.generate(users[0].email);
      const { status } = await api
        .patch("/api/menus/invalid-menu-id")
        .set("Authorization", `Bearer ${token}`)
        .send(editMenuRequest);
      expect(status).toBe(404);
    });

    it("Should return a 400 status code if request name is invalid", async () => {
      const token = await tokenProvider.generate(users[0].email);
      const nameTooShortRequest = {
        id: menus[0].id,
        name: "Me",
        description: "Update Menu description",
      };
      const { status } = await api
        .patch(`/api/menus/${menus[0].id}`)
        .set("Authorization", `Bearer ${token}`)
        .send(nameTooShortRequest);
      expect(status).toBe(400);
    });

    it("Should return a 409 status code if request name was already taken by user", async () => {
      const newMenu = new Menu({
        name: createMenuRequest.name,
        description: createMenuRequest.description,
        userId: users[0].id,
      });
      await menuRepository.add(newMenu);
      const token = await tokenProvider.generate(users[0].email);
      const nameAlreadyTakenRequest = {
        id: menus[0].id,
        name: createMenuRequest.name,
      };
      const { status } = await api
        .patch(`/api/menus/${menus[0].id}`)
        .set("Authorization", `Bearer ${token}`)
        .send(nameAlreadyTakenRequest);
      expect(status).toBe(409);
    });
  });

  describe("DELETE /api/menus/:id", () => {
    beforeEach(async () => {
      await menuRepository.add(menus[0]);
    });

    it("Should return a 204 status code if user is authorized to delete", async () => {
      const token = await tokenProvider.generate(users[0].email);
      const { status } = await api
        .delete(`/api/menus/${menus[0].id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(status).toBe(204);
    });

    it("Should return a 401 status code if authorization token is not given", async () => {
      const { status } = await api.delete(`/api/menus/${menus[0].id}`);
      expect(status).toBe(401);
    });

    it("Should return a 401 status code if user does not exist", async () => {
      const token = await tokenProvider.generate("wrong-email@gmail.com");
      const { status } = await api
        .delete(`/api/menus/${menus[0].id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(status).toBe(401);
    });

    it("Should return a 404 status code if menu was not found", async () => {
      const token = await tokenProvider.generate(users[0].email);
      const { status } = await api
        .delete("/api/menus/invalid-menu-id")
        .set("Authorization", `Bearer ${token}`);
      expect(status).toBe(404);
    });

    it("Should return a 404 status code if if user doesn't own that menu", async () => {
      const token = await tokenProvider.generate(users[1].email);
      const { status } = await api
        .delete(`/api/menus/${menus[0].id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(status).toBe(404);
    });
  });

  describe("GET /api/menus", () => {
    beforeEach(async () => {
      await menuRepository.add(menus[0]);
      await menuRepository.add(menus[1]);
      await menuRepository.add(menus[2]);
    });

    it("Should return a 200 status code with all user menus if user is authorized", async () => {
      const token = await tokenProvider.generate(users[0].email);
      const { status, body } = await api.get("/api/menus").set("Authorization", `Bearer ${token}`);
      expect(status).toBe(200);
      expect(body.length).toBe(3);
    });

    it("Should return a 200 status code with empty list if user doesn't have any menus", async () => {
      const token = await tokenProvider.generate(users[1].email);
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
      await menuRepository.add(menus[0]);
    });

    it("Should return a 200 status code with published menu if user is authorized", async () => {
      const token = await tokenProvider.generate(users[0].email);
      const { status, body } = await api
        .post(`/api/menus/${menus[0].id}/publish`)
        .set("Authorization", `Bearer ${token}`);
      const expectedResponse = {
        id: menus[0].id,
        name: menus[0].name,
        description: menus[0].description,
        published: true,
        userId: users[0].id,
      };
      expect(status).toBe(200);
      expect(body).toEqual(expectedResponse);
    });

    it("Should return a 401 status code if authorization token is not given", async () => {
      const { status } = await api.post(`/api/menus/${menus[0].id}/publish`);
      expect(status).toBe(401);
    });

    it("Should return a 401 status code if user is not authorized", async () => {
      const token = await tokenProvider.generate("wrong-email@gmail.com");
      const { status } = await api
        .post(`/api/menus/${menus[0].id}/publish`)
        .set("Authorization", `Bearer ${token}`);
      expect(status).toBe(401);
    });

    it("Should return a 404 status code if menu was not found", async () => {
      const token = await tokenProvider.generate(users[0].email);
      const { status } = await api
        .post("/api/menus/invalid-menu-id/publish")
        .set("Authorization", `Bearer ${token}`);
      expect(status).toBe(404);
    });

    it("Should return a 404 status code if if user doesn't own that menu", async () => {
      const token = await tokenProvider.generate(users[1].email);
      const { status } = await api
        .post(`/api/menus/${menus[0].id}/publish`)
        .set("Authorization", `Bearer ${token}`);
      expect(status).toBe(404);
    });
  });

  describe("POST /api/menus/:id/unpublish", () => {
    beforeEach(async () => {
      await menuRepository.add(publishedMenus[0]);
    });

    it("Should return a 200 status code with unpublished menu if user is authorized", async () => {
      const token = await tokenProvider.generate(users[0].email);
      const { status, body } = await api
        .post(`/api/menus/${publishedMenus[0].id}/unpublish`)
        .set("Authorization", `Bearer ${token}`);
      const expectedResponse = {
        id: publishedMenus[0].id,
        name: publishedMenus[0].name,
        description: publishedMenus[0].description,
        published: false,
        userId: users[0].id,
      };
      expect(status).toBe(200);
      expect(body).toEqual(expectedResponse);
    });

    it("Should return a 401 status code if authorization token is not given", async () => {
      const { status } = await api.post(`/api/menus/${publishedMenus[0].id}/unpublish`);
      expect(status).toBe(401);
    });

    it("Should return a 401 status code if user is not authorized", async () => {
      const token = await tokenProvider.generate("wrong-email@gmail.com");
      const { status } = await api
        .post(`/api/menus/${publishedMenus[0].id}/unpublish`)
        .set("Authorization", `Bearer ${token}`);
      expect(status).toBe(401);
    });

    it("Should return a 404 status code if menu was not found", async () => {
      const token = await tokenProvider.generate(users[0].email);
      const { status } = await api
        .post("/api/menus/invalid-menu-id/unpublish")
        .set("Authorization", `Bearer ${token}`);
      expect(status).toBe(404);
    });

    it("Should return a 404 status code if if user doesn't own that menu", async () => {
      const token = await tokenProvider.generate(users[1].email);
      const { status } = await api
        .post(`/api/menus/${publishedMenus[0].id}/unpublish`)
        .set("Authorization", `Bearer ${token}`);
      expect(status).toBe(404);
    });
  });

  describe("GET /api/menus/published", () => {
    beforeEach(async () => {
      await menuRepository.add(menus[0]);
      await menuRepository.add(publishedMenus[0]);
      await menuRepository.add(publishedMenus[1]);
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
