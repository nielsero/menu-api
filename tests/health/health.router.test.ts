import { app } from "@/app";
import { HealthController, HealthRouter } from "@/modules/health";
import supertest from "supertest";

let api: supertest.SuperTest<supertest.Test>;

type SutTypes = {
  sut: HealthRouter;
  controller: HealthController;
};

const makeSut = (): SutTypes => {
  const controller = new HealthController();
  const sut = new HealthRouter(controller);
  return { sut, controller };
};

describe("HealthRouter", () => {
  beforeAll(() => {
    const { sut } = makeSut();
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
