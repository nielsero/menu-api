import { HealthRouter } from "@/modules/health";
import { buyHealthControllers } from "@/store/health";

type Store = HealthRouter;

const healthRouter = new HealthRouter(buyHealthControllers());

export const buyHealthRouter = (): Store => healthRouter;
