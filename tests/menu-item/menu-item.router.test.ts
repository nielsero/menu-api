import { app } from "@/app";
import { Menu } from "@/modules/menu";
import { MenuItem } from "@/modules/menu-item";
import { User } from "@/modules/user";
import { buyTokenProvider } from "@/modules/auth/store";
import { buyMenuRepository } from "@/modules/menu/store";
import { buyMenuItemRepository, buyMenuItemRouter } from "@/modules/menu-item/store";
import { buyUserRepository } from "@/modules/user/store";
import supertest from "supertest";
import { domainErrorHandler } from "@/middleware/domain-error-handler";
import { errorHandler } from "@/middleware/error-handler";

let api: supertest.SuperTest<supertest.Test>;
const sut = buyMenuItemRouter();
const userRepository = buyUserRepository();
const menuRepository = buyMenuRepository();
const menuItemRepository = buyMenuItemRepository();
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

const menu = new Menu({
  name: "Old Menu",
  description: "Old Menu description",
  userId: users[0].id,
});

const publishedMenu = new Menu({
  name: "Published Menu",
  description: "Published Menu description",
  published: true,
  userId: users[0].id,
});

const menuItems = [
  new MenuItem({
    name: "Menu Item 1",
    description: "Menu Item 1 description",
    price: 100,
    type: "food",
    menuId: menu.id,
  }),
  new MenuItem({
    name: "Menu Item 2",
    description: "Menu Item 2 description",
    price: 200,
    type: "drink",
    menuId: menu.id,
  }),
];

const publishedMenuItems = [
  new MenuItem({
    name: "Published Menu Item 1",
    description: "Published Menu Item 1 description",
    price: 300,
    type: "drink",
    menuId: publishedMenu.id,
  }),
  new MenuItem({
    name: "Published Menu Item 2",
    description: "Published Menu Item 2 description",
    price: 400,
    type: "food",
    menuId: publishedMenu.id,
  }),
];

const addMenuItemRequest = {
  name: "New Menu Item",
  description: "New Menu Item description",
  price: 300,
  type: "drink",
  menuId: menu.id,
};

const editMenuItemRequest = {
  id: menuItems[0].id,
  name: "Edited Menu Item",
  description: "Edited Menu Item description",
  price: 400,
  type: "drink",
  menuId: menu.id,
};

describe("MenuItemRouter", () => {
  beforeAll(async () => {
    sut.setup(app);
    app.use(domainErrorHandler);
    app.use(errorHandler);
    api = supertest(app);
    await userRepository.add(users[0]);
    await userRepository.add(users[1]);
    await menuRepository.add(menu);
    await menuRepository.add(publishedMenu);
  });

  afterEach(async () => {
    await menuItemRepository.clear();
  });

  afterAll(async () => {
    await menuRepository.clear();
    await userRepository.clear();
  });

  describe("POST /api/menus/:menuId/items", () => {
    it("Should return a 201 status code with created menu item", async () => {
      const token = await tokenProvider.generate(users[0].email);
      const { status, body } = await api
        .post(`/api/menus/${menu.id}/items`)
        .set("Authorization", `Bearer ${token}`)
        .send(addMenuItemRequest);
      const expectedResponse = {
        id: expect.any(String),
        name: addMenuItemRequest.name,
        description: addMenuItemRequest.description,
        price: addMenuItemRequest.price,
        image: expect.any(String),
        type: addMenuItemRequest.type,
        menuId: menu.id,
      };
      expect(status).toBe(201);
      expect(body).toEqual(expectedResponse);
    });

    it("Should return a 401 status code if authorization token is not given", async () => {
      const { status } = await api.post(`/api/menus/${menu.id}/items`).send(addMenuItemRequest);
      expect(status).toBe(401);
    });

    it("Should return a 401 status code if user does not exist", async () => {
      const token = await tokenProvider.generate("wrong-email@gmail.com");
      const { status } = await api
        .post(`/api/menus/${menu.id}/items`)
        .set("Authorization", `Bearer ${token}`)
        .send(addMenuItemRequest);
      expect(status).toBe(401);
    });

    it("Should return a 404 status code if user doesn't own the menu", async () => {
      const token = await tokenProvider.generate(users[1].email);
      const { status } = await api
        .post(`/api/menus/${menu.id}/items`)
        .set("Authorization", `Bearer ${token}`)
        .send(addMenuItemRequest);
      expect(status).toBe(404);
    });

    it("Should return a 400 status code if request is missing name", async () => {
      const token = await tokenProvider.generate(users[0].email);
      const missingNameRequest = {
        description: "New Menu Item description",
        price: 300,
        type: "drink",
        menuId: menu.id,
      };
      const { status } = await api
        .post(`/api/menus/${menu.id}/items`)
        .set("Authorization", `Bearer ${token}`)
        .send(missingNameRequest);
      expect(status).toBe(400);
    });

    it("Should return a 400 status code if request is missing price", async () => {
      const token = await tokenProvider.generate(users[0].email);
      const missingPriceRequest = {
        name: "New Menu Item",
        description: "New Menu Item description",
        type: "drink",
        menuId: menu.id,
      };
      const { status } = await api
        .post(`/api/menus/${menu.id}/items`)
        .set("Authorization", `Bearer ${token}`)
        .send(missingPriceRequest);
      expect(status).toBe(400);
    });

    it("Should return a 400 status code if request is missing type", async () => {
      const token = await tokenProvider.generate(users[0].email);
      const missingTypeRequest = {
        name: "New Menu Item",
        description: "New Menu Item description",
        price: 300,
        menuId: menu.id,
      };
      const { status } = await api
        .post(`/api/menus/${menu.id}/items`)
        .set("Authorization", `Bearer ${token}`)
        .send(missingTypeRequest);
      expect(status).toBe(400);
    });

    it("Should return a 400 status code if request name is invalid", async () => {
      const token = await tokenProvider.generate(users[0].email);
      const nameTooShortRequest = {
        name: "Ne",
        description: "New Menu Item description",
        price: 300,
        type: "drink",
        menuId: menu.id,
      };
      const { status } = await api
        .post(`/api/menus/${menu.id}/items`)
        .set("Authorization", `Bearer ${token}`)
        .send(nameTooShortRequest);
      expect(status).toBe(400);
    });

    it("Should return a 400 status code if request price is invalid", async () => {
      const token = await tokenProvider.generate(users[0].email);
      const negativePriceRequest = {
        name: "New Menu Item",
        description: "New Menu Item description",
        price: -100,
        type: "drink",
        menuId: menu.id,
      };
      const { status } = await api
        .post(`/api/menus/${menu.id}/items`)
        .set("Authorization", `Bearer ${token}`)
        .send(negativePriceRequest);
      expect(status).toBe(400);
    });

    it("Should return a 400 status code if request type is invalid", async () => {
      const token = await tokenProvider.generate(users[0].email);
      const invalidTypeRequest = {
        name: "New Menu Item",
        description: "New Menu Item description",
        price: 300,
        type: "invalid-type",
        menuId: menu.id,
      };
      const { status } = await api
        .post(`/api/menus/${menu.id}/items`)
        .set("Authorization", `Bearer ${token}`)
        .send(invalidTypeRequest);
      expect(status).toBe(400);
    });

    it("Should return a 409 status code if request name was already used in menu", async () => {
      const newMenuItem = new MenuItem({
        name: addMenuItemRequest.name,
        description: "New Menu Item description",
        price: 300,
        type: "drink",
        menuId: menu.id,
      });
      await menuItemRepository.add(newMenuItem);
      const token = await tokenProvider.generate(users[0].email);
      const { status } = await api
        .post(`/api/menus/${menu.id}/items`)
        .set("Authorization", `Bearer ${token}`)
        .send(addMenuItemRequest);
      expect(status).toBe(409);
    });

    it("Should return a 404 status code if menu doesn't exist", async () => {
      const token = await tokenProvider.generate(users[0].email);
      const { status } = await api
        .post(`/api/menus/invalid-menu-id/items`)
        .set("Authorization", `Bearer ${token}`)
        .send(addMenuItemRequest);
      expect(status).toBe(404);
    });
  });

  describe("PATCH /api/menus/:menuId/items/:id", () => {
    beforeEach(async () => {
      await menuItemRepository.add(menuItems[0]);
    });

    it("Should return a 200 status code with edited menu item", async () => {
      const token = await tokenProvider.generate(users[0].email);
      const { status, body } = await api
        .patch(`/api/menus/${menu.id}/items/${menuItems[0].id}`)
        .set("Authorization", `Bearer ${token}`)
        .send(editMenuItemRequest);
      const expectedResponse = {
        id: menuItems[0].id,
        name: editMenuItemRequest.name,
        description: editMenuItemRequest.description,
        price: editMenuItemRequest.price,
        image: expect.any(String),
        type: editMenuItemRequest.type,
        menuId: menu.id,
      };
      expect(status).toBe(200);
      expect(body).toEqual(expectedResponse);
    });

    it("Should return a 401 status code if authorization token is not given", async () => {
      const { status } = await api
        .patch(`/api/menus/${menu.id}/items/${menuItems[0].id}`)
        .send(editMenuItemRequest);
      expect(status).toBe(401);
    });

    it("Should return a 401 status code if user does not exist", async () => {
      const token = await tokenProvider.generate("wrong-email@gmail.com");
      const { status } = await api
        .patch(`/api/menus/${menu.id}/items/${menuItems[0].id}`)
        .set("Authorization", `Bearer ${token}`)
        .send(editMenuItemRequest);
      expect(status).toBe(401);
    });

    it("Should return a 404 status code if user doesn't own the menu", async () => {
      const token = await tokenProvider.generate(users[1].email);
      const { status } = await api
        .patch(`/api/menus/${menu.id}/items/${menuItems[0].id}`)
        .set("Authorization", `Bearer ${token}`)
        .send(editMenuItemRequest);
      expect(status).toBe(404);
    });

    it("Should return a 400 status code if request name is invalid", async () => {
      const token = await tokenProvider.generate(users[0].email);
      const nameTooShortRequest = {
        name: "Me",
        description: "Updated Menu Item description",
        price: 300,
        type: "drink",
        menuId: menu.id,
      };
      const { status } = await api
        .patch(`/api/menus/${menu.id}/items/${menuItems[0].id}`)
        .set("Authorization", `Bearer ${token}`)
        .send(nameTooShortRequest);
      expect(status).toBe(400);
    });

    it("Should return a 400 status code if request price is invalid", async () => {
      const token = await tokenProvider.generate(users[0].email);
      const negativePriceRequest = {
        name: "Updated Menu Item",
        description: "Updated Menu Item description",
        price: -100,
        type: "drink",
        menuId: menu.id,
      };
      const { status } = await api
        .patch(`/api/menus/${menu.id}/items/${menuItems[0].id}`)
        .set("Authorization", `Bearer ${token}`)
        .send(negativePriceRequest);
      expect(status).toBe(400);
    });

    it("Should return a 400 status code if request type is invalid", async () => {
      const token = await tokenProvider.generate(users[0].email);
      const invalidTypeRequest = {
        name: "Updated Menu Item",
        description: "Updated Menu Item description",
        price: 300,
        type: "invalid-type",
        menuId: menu.id,
      };
      const { status } = await api
        .patch(`/api/menus/${menu.id}/items/${menuItems[0].id}`)
        .set("Authorization", `Bearer ${token}`)
        .send(invalidTypeRequest);
      expect(status).toBe(400);
    });

    it("Should return a 409 status code if request name was already used in menu", async () => {
      const newMenuItem = new MenuItem({
        name: editMenuItemRequest.name,
        description: "New Menu Item description",
        price: 300,
        type: "drink",
        menuId: menu.id,
      });
      await menuItemRepository.add(newMenuItem);
      const token = await tokenProvider.generate(users[0].email);
      const { status } = await api
        .patch(`/api/menus/${menu.id}/items/${menuItems[0].id}`)
        .set("Authorization", `Bearer ${token}`)
        .send(editMenuItemRequest);
      expect(status).toBe(409);
    });

    it("Should return a 404 status code if menu doesn't exist", async () => {
      const token = await tokenProvider.generate(users[0].email);
      const { status } = await api
        .patch(`/api/menus/invalid-menu-id/items/${menuItems[0].id}`)
        .set("Authorization", `Bearer ${token}`)
        .send(editMenuItemRequest);
      expect(status).toBe(404);
    });

    it("Should return a 404 status code if menu item doesn't exist", async () => {
      const token = await tokenProvider.generate(users[0].email);
      const { status } = await api
        .patch(`/api/menus/${menu.id}/items/invalid-item-id`)
        .set("Authorization", `Bearer ${token}`)
        .send(editMenuItemRequest);
      expect(status).toBe(404);
    });

    it("Should return a 404 status code if item doesn't belong to menu", async () => {
      await menuItemRepository.add(publishedMenuItems[0]);
      const token = await tokenProvider.generate(users[0].email);
      const { status } = await api
        .patch(`/api/menus/${menu.id}/items/${publishedMenuItems[0].id}`)
        .set("Authorization", `Bearer ${token}`)
        .send(editMenuItemRequest);
      expect(status).toBe(404);
    });
  });

  describe("DELETE /api/menus/:menuId/items/:id", () => {
    beforeEach(async () => {
      await menuItemRepository.add(menuItems[0]);
    });

    it("Should return a 204 status code", async () => {
      const token = await tokenProvider.generate(users[0].email);
      const { status } = await api
        .delete(`/api/menus/${menu.id}/items/${menuItems[0].id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(status).toBe(204);
    });

    it("Should return a 401 status code if authorization token is not given", async () => {
      const { status } = await api.delete(`/api/menus/${menu.id}/items/${menuItems[0].id}`);
      expect(status).toBe(401);
    });

    it("Should return a 401 status code if user does not exist", async () => {
      const token = await tokenProvider.generate("wrong-email@gmail.com");
      const { status } = await api
        .delete(`/api/menus/${menu.id}/items/${menuItems[0].id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(status).toBe(401);
    });

    it("Should return a 404 status code if user doesn't own the menu", async () => {
      const token = await tokenProvider.generate(users[1].email);
      const { status } = await api
        .delete(`/api/menus/${menu.id}/items/${menuItems[0].id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(status).toBe(404);
    });

    it("Should return a 404 status code if menu doesn't exist", async () => {
      const token = await tokenProvider.generate(users[0].email);
      const { status } = await api
        .delete(`/api/menus/invalid-menu-id/items/${menuItems[0].id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(status).toBe(404);
    });

    it("Should return a 404 status code if menu item doesn't exist", async () => {
      const token = await tokenProvider.generate(users[0].email);
      const { status } = await api
        .delete(`/api/menus/${menu.id}/items/invalid-item-id`)
        .set("Authorization", `Bearer ${token}`);
      expect(status).toBe(404);
    });

    it("Should return a 404 status code if item doesn't belong to menu", async () => {
      await menuItemRepository.add(publishedMenuItems[0]);
      const token = await tokenProvider.generate(users[0].email);
      const { status } = await api
        .delete(`/api/menus/${menu.id}/items/${publishedMenuItems[0].id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(status).toBe(404);
    });
  });

  describe("GET /api/menus/:menuId/items", () => {
    beforeEach(async () => {
      await menuItemRepository.add(menuItems[0]);
      await menuItemRepository.add(menuItems[1]);
    });

    it("Should return a 200 status code with all menu items", async () => {
      const token = await tokenProvider.generate(users[0].email);
      const { status, body } = await api
        .get(`/api/menus/${menu.id}/items`)
        .set("Authorization", `Bearer ${token}`);
      expect(status).toBe(200);
      expect(body.length).toBe(2);
    });

    it("Should return a 200 status code with empty list if menu doesn't have any items", async () => {
      menuItemRepository.clear();
      const token = await tokenProvider.generate(users[0].email);
      const { status, body } = await api
        .get(`/api/menus/${menu.id}/items`)
        .set("Authorization", `Bearer ${token}`);
      expect(status).toBe(200);
      expect(body.length).toBe(0);
    });

    it("Should return a 401 status code if authorization token is not given", async () => {
      const { status } = await api.get(`/api/menus/${menu.id}/items`);
      expect(status).toBe(401);
    });

    it("Should return a 401 status code if user does not exist", async () => {
      const token = await tokenProvider.generate("wrong-email@gmail.com");
      const { status } = await api.get(`/api/menus/${menu.id}/items`).set("Authorization", `Bearer ${token}`);
      expect(status).toBe(401);
    });

    it("Should return a 404 status code if user doesn't own the menu", async () => {
      const token = await tokenProvider.generate(users[1].email);
      const { status } = await api.get(`/api/menus/${menu.id}/items`).set("Authorization", `Bearer ${token}`);
      expect(status).toBe(404);
    });

    it("Should return a 404 status code if menu doesn't exist", async () => {
      const token = await tokenProvider.generate(users[0].email);
      const { status } = await api
        .get(`/api/menus/invalid-menu-id/items`)
        .set("Authorization", `Bearer ${token}`);
      expect(status).toBe(404);
    });
  });

  describe("GET /api/menus/:menuId/items/:id", () => {
    beforeEach(async () => {
      await menuItemRepository.add(menuItems[0]);
    });

    it("Should return a 200 status code with menu item", async () => {
      const token = await tokenProvider.generate(users[0].email);
      const { status, body } = await api
        .get(`/api/menus/${menu.id}/items/${menuItems[0].id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(status).toBe(200);
      expect(body).toEqual(menuItems[0]);
    });

    it("Should return a 401 status code if authorization token is not given", async () => {
      const { status } = await api.get(`/api/menus/${menu.id}/items/${menuItems[0].id}`);
      expect(status).toBe(401);
    });

    it("Should return a 401 status code if user does not exist", async () => {
      const token = await tokenProvider.generate("wrong-email@gmail.com");
      const { status } = await api
        .get(`/api/menus/${menu.id}/items/${menuItems[0].id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(status).toBe(401);
    });

    it("Should return a 404 status code if user doesn't own the menu", async () => {
      const token = await tokenProvider.generate(users[1].email);
      const { status } = await api
        .get(`/api/menus/${menu.id}/items/${menuItems[0].id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(status).toBe(404);
    });

    it("Should return a 404 status code if menu doesn't exist", async () => {
      const token = await tokenProvider.generate(users[0].email);
      const { status } = await api
        .get(`/api/menus/invalid-menu-id/items/${menuItems[0].id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(status).toBe(404);
    });

    it("Should return a 404 status code if menu item doesn't exist", async () => {
      const token = await tokenProvider.generate(users[0].email);
      const { status } = await api
        .get(`/api/menus/${menu.id}/items/invalid-item-id`)
        .set("Authorization", `Bearer ${token}`);
      expect(status).toBe(404);
    });

    it("Should return a 404 status code if item doesn't belong to menu", async () => {
      await menuItemRepository.add(publishedMenuItems[0]);
      const token = await tokenProvider.generate(users[0].email);
      const { status } = await api
        .get(`/api/menus/${menu.id}/items/${publishedMenuItems[0].id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(status).toBe(404);
    });
  });

  describe("GET /api/menus/published/:menuId/items", () => {
    beforeEach(async () => {
      await menuItemRepository.add(publishedMenuItems[0]);
      await menuItemRepository.add(publishedMenuItems[1]);
    });

    it("Should return a 200 status code with all published menu items", async () => {
      const { status, body } = await api.get(`/api/menus/published/${publishedMenu.id}/items`);
      expect(status).toBe(200);
      expect(body.length).toBe(2);
    });

    it("Should return a 200 status code with empty list if menu doesn't have any published items", async () => {
      menuItemRepository.clear();
      const { status, body } = await api.get(`/api/menus/published/${publishedMenu.id}/items`);
      expect(status).toBe(200);
      expect(body.length).toBe(0);
    });

    it("Should return a 404 status code if menu doesn't exist", async () => {
      const { status } = await api.get(`/api/menus/published/invalid-menu-id/items`);
      expect(status).toBe(404);
    });

    it("Should return a 404 status code if menu is not published", async () => {
      const { status } = await api.get(`/api/menus/published/${menu.id}/items`);
      expect(status).toBe(404);
    });
  });

  describe("GET /api/menus/published/:menuId/items/:id", () => {
    beforeEach(async () => {
      await menuItemRepository.add(menuItems[0]);
      await menuItemRepository.add(publishedMenuItems[0]);
    });

    it("Should return a 200 status code with published menu item", async () => {
      const { status, body } = await api.get(
        `/api/menus/published/${publishedMenu.id}/items/${publishedMenuItems[0].id}`,
      );
      expect(status).toBe(200);
      expect(body).toEqual(publishedMenuItems[0]);
    });

    it("Should return a 404 status code if menu doesn't exist", async () => {
      const { status } = await api.get(
        `/api/menus/published/invalid-menu-id/items/${publishedMenuItems[0].id}`,
      );
      expect(status).toBe(404);
    });

    it("Should return a 404 status code if menu is not published", async () => {
      const { status } = await api.get(`/api/menus/published/${menu.id}/items/${menuItems[0].id}`);
      expect(status).toBe(404);
    });

    it("Should return a 404 status code if menu item doesn't exist", async () => {
      const { status } = await api.get(`/api/menus/published/${publishedMenu.id}/items/invalid-item-id`);
      expect(status).toBe(404);
    });

    it("Should return a 404 status code if item doesn't belong to menu", async () => {
      await menuItemRepository.add(menuItems[0]);
      const { status } = await api.get(`/api/menus/published/${publishedMenu.id}/items/${menuItems[0].id}`);
      expect(status).toBe(404);
    });
  });
});
