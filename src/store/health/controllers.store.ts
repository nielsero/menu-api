import { GetHealthController } from "@/modules/health";

type Store = {
  getHealthController: GetHealthController;
};

const getHealthController = new GetHealthController();

export const buyHealthControllers = (): Store => {
  return { getHealthController };
};
