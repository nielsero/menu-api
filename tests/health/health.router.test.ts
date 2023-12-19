import { app } from "@/app";
import { buyHealthRouter } from "@/store/health";
import supertest from "supertest";

let api: supertest.SuperTest<supertest.Test>;
const sut = buyHealthRouter();

describe("HealthRouter", () => {
  beforeAll(() => {
    sut.setup(app);
    api = supertest(app);
  });

  describe("GET /health", () => {
    it("Should return a 200 status with a server running message", async () => {
      const response = await api.get("/health");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: expect.any(String) });
    });
  });
});
