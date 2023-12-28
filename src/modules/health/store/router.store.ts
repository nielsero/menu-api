import { HealthRouter } from "@/modules/health";
import { buyHealthControllers } from "@/modules/health/store";

type Store = HealthRouter;

const healthRouter = new HealthRouter(buyHealthControllers());

export const buyHealthRouter = (): Store => healthRouter;
