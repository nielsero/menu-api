import { HealthController, HealthRouter } from "@/modules/health";

export const makeHealthRouter = (): HealthRouter => {
  const controller = new HealthController();
  return new HealthRouter(controller);
};
