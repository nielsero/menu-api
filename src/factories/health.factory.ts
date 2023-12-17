import { GetHealthController, HealthRouter } from "@/modules/health";

export type HealthTypes = {
  healthRouter: HealthRouter;
  getHealthController: GetHealthController;
};

export const makeHealth = (): HealthTypes => {
  const getHealthController = new GetHealthController();
  const healthRouter = new HealthRouter({ getHealthController });
  return { healthRouter, getHealthController };
};
