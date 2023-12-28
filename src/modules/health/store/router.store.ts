import { HealthRouter } from "@/modules/health";
import { buyGetHealthController } from "@/modules/health/store";

const getHealthController = buyGetHealthController();
const healthRouter = new HealthRouter(getHealthController);

export const buyHealthRouter = () => healthRouter;
