import { app } from "@/app";
import { makeHealth } from "@/factories";
import { HealthRouter } from "@/modules/health";
import supertest from "supertest";

let api: supertest.SuperTest<supertest.Test>;

type SutTypes = {
  sut: HealthRouter;
};

const makeSut = (): SutTypes => {
  const { healthRouter: sut } = makeHealth();
  return { sut };
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
