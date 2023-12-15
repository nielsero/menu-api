import { HealthController, HealthRouter } from "@/modules/health";

export type HealthTypes = {
  healthRouter: HealthRouter;
  healthController: HealthController;
};

export const makeHealth = (): HealthTypes => {
  const healthController = new HealthController();
  const healthRouter = new HealthRouter(healthController);
  return { healthRouter, healthController };
};
